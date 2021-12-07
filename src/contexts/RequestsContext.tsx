import { createContext, useContext, useState } from "react";

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

interface DownloadInterface {
  name: string;
  thumbnail_url: string;
  url: string;
  id: string;
  created_at: string;
}

export enum RequestState {
  error = "error",
  pending = "pending",
  done = "done",
  in_progress = "in progress",
}

export interface RequestInterface {
  id: number;
  download: DownloadInterface;
  extension: string;
  state: RequestState;
  type: string;
  url: string;
}

interface RequestContextInterface {
  requests: RequestInterface[];
  setRequests: React.Dispatch<React.SetStateAction<any>>;
}

export const [useRequestContext, RequestContextProvider] =
  createCtx<RequestContextInterface>();

const RequestContext = (props: React.PropsWithChildren<{}>) => {
  const [requests, setRequests] = useState([]);

  return (
    <RequestContextProvider value={{ requests, setRequests }}>
      {props.children}
    </RequestContextProvider>
  );
};

export default RequestContext;