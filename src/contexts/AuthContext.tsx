import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { authProvider } from "../auth";
import { getLocalToken, removeLocalToken, saveLocalToken } from "../utils";
import createCtx from "./createContext";

export interface User {
  access_token: string;
  token_type: string;
}

interface AuthContextType {
  user: User | null;
  signin: (email: string, password: string, remember: string | null) => void;
  signout: () => void;
}

export const [useAuthContext, AuthContextProvider] =
  createCtx<AuthContextType>();

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [user, setUser] = useState<User | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  let signin = async (
    email: string,
    password: string,
    remember: string | null
  ) => {
    return await authProvider.signin(
      email,
      password,
      (response: any, error: Error) => {
        if (error instanceof Error) {
          return enqueueSnackbar(response.detail || error.message, {
            variant: "error",
          });
        }
        if (remember) {
          saveLocalToken(response.access_token);
        }
        setUser(response);
      }
    );
  };

  let checkUser = async (token: string) => {
    return await authProvider.checkUser(
      token,
      (response: any, error: Error) => {
        if (response && !error) {
          setUser({ ...response, access_token: token });
        }
      }
    );
  };

  let signout = () => {
    return authProvider.signout(() => {
      setUser(null);
      removeLocalToken();
    });
  };

  useEffect(() => {
    const token = getLocalToken();
    if (token) {
      (async () => await checkUser(token))();
    }
  }, []);

  let value = { user, signin, signout };

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}
