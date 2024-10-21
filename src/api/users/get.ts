import { getUsersString } from "../../users.js";
import type http from "node:http";

export const get = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end(getUsersString());
};
