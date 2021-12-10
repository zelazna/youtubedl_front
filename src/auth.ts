import axios from "axios";
import { api } from "./api";

const authProvider = {
  isAuthenticated: false,
  async signin(email: string, password: string, callback: Function) {
    try {
      const data = await api.sigIn(email, password);
      authProvider.isAuthenticated = true;
      callback(data, null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        callback(error.response.data, error);
      }
    }
  },
  signout(callback: Function) {
    authProvider.isAuthenticated = false;
    callback();
  },
  async checkUser(token: string, callback: Function) {
    try {
      const data = await api.getUser(token);
      authProvider.isAuthenticated = true;
      callback(data, null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        callback(error.response.data, error);
      }
    }
  },
};

export { authProvider };
