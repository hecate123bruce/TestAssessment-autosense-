import { makeInstance } from "./api.instance";

export const remoteToken = () => {
  localStorage.removeItem("token");
  makeInstance(process.env.REACT_APP_SERVER_API || "");
};

export const mainApiInstance = makeInstance(
  process.env.REACT_APP_SERVER_API || ""
);
