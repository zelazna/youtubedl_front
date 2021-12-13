import { useState } from "react";
import createCtx from "./createContext";

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
  extension: "mp3" | "mp4";
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
