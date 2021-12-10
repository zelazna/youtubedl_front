import axios from "axios";
import { User } from "./contexts/AuthContext";
import { RequestInterface } from "./contexts/RequestsContext";

const headers = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const api = {
  async getUser(token: string) {
    const res = await axios.get<User>("/users/me", headers(token));
    return res.data;
  },
  async sigIn(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);
    const res = await axios.post<User>("/users/login", params);
    return res.data;
  },
  async deleteRequest(token: string, id: number) {
    await axios.delete(`/requests/${id}`, headers(token));
  },
  async getRequests(
    token: string,
    skip: number = 0,
    order_by: string = "id%20desc"
  ) {
    const result = await axios.get<RequestInterface[]>(
      `/requests/?skip=${skip}&orderby=${order_by}`,
      headers(token)
    );
    return result.data;
  },
  async createRequest(token: string, url: string, extension: string) {
    await axios.post(
      "/requests/",
      {
        url,
        type: "video",
        extension,
      },
      headers(token)
    );
  },
};
