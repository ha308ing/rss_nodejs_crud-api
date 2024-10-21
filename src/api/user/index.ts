import "dotenv/config";
import { getUser, getUserId } from "../../users.js";
import type http from "node:http";
import { put } from "./put.js";
import { deleteUser } from "./delete.js";
import { get } from "./get.js";

const { HOST, PORT } = process.env;
const host = `${HOST}:${PORT}/`;
const errorInvalidId = JSON.stringify({ error: "Invalid id, must be uuid" });
const errorUserNotFound = JSON.stringify({ error: "User not found" });
const errorUMethodUnsupported = JSON.stringify({
  error: "Method is not supported",
});

export const handleUserApi = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const { url, method } = req;

  if (url == null || method == null) return;

  const { pathname } = new URL(url, host);
  const userIdInput = pathname.split("/")[3];

  const userId = getUserId(userIdInput);

  if (userId == null) {
    res.statusCode = 400;
    res.end(errorInvalidId);
    return;
  }

  const user = getUser(userId);

  if (user == null) {
    res.statusCode = 404;
    res.end(errorUserNotFound);
    return;
  }

  switch (method) {
    case "GET":
      get(req, res, userId);
      break;
    case "PUT":
      put(req, res, userId);
      break;
    case "DELETE":
      deleteUser(req, res, userId);
      break;
    default:
      res.statusCode = 400;
      res.end(errorUMethodUnsupported);
  }
};
