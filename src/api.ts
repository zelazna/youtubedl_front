import axios from "axios";
import { User } from "./contexts/AuthContext";
import { Request } from "./contexts/RequestsContext";

const headers = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const api = {
  async getUser(token: string) {
    const res = await axios.get<User>("/api/users/me", headers(token));
    return res.data;
  },
  async sigIn(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);
    const res = await axios.post<User>("/api/users/login", params);
    return res.data;
  },
  async deleteRequest(token: string, id: number) {
    await axios.delete(`/api/requests/${id}`, headers(token));
  },
  async getRequests(
    token: string,
    skip: number = 0,
    order_by: string = "id%20desc"
  ) {
    const result = await axios.get<Request[]>(
      `/api/requests/?skip=${skip}&orderby=${order_by}`,
      headers(token)
    );
    return result.data;
  },
  async createRequest(token: string, url: string, extension: string) {
    await axios.post(
      "/api/requests/",
      {
        url,
        type: "video",
        extension,
      },
      headers(token)
    );
  },
};
