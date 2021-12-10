import axios from "axios";
import { User } from "./contexts/AuthContext";

const authProvider = {
  isAuthenticated: false,
  async signin(email: string, password: string, callback: Function) {
    try {
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      const response = await axios.post<User>("/users/login", params);
      authProvider.isAuthenticated = true;
      callback(response.data, null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        callback(error.response.data, error);
      }
    }
  },
  signout(callback: VoidFunction) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
  async checkUser(token: string, callback: Function) {
    try {
      const response = await axios.get<User>("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      authProvider.isAuthenticated = true;
      callback(response.data, null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        callback(error.response.data, error);
      }
    }
  },
};

export { authProvider };
