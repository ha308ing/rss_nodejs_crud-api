import { get } from "./get.js";
import { post } from "./post.js";
import type http from "node:http";

const errorMethodUnsupported = JSON.stringify({
  error: "Method is not supported",
});

export const handleUsersApi = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const { method } = req;
  if (method == null) return;

  switch (method) {
    case "GET":
      get(req, res);
      break;
    case "POST":
      post(req, res);
      break;
    default:
      res.statusCode = 400;
      res.end(errorMethodUnsupported);
  }
};
