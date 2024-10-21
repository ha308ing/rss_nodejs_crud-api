import { getUser } from "../../users.js";
import type http from "node:http";

const error = JSON.stringify({ error: "User not found" });

export const get = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string,
) => {
  const user = getUser(userId);

  if (user == null) {
    res.statusCode = 404;
    res.end(error);
    return;
  }

  res.statusCode = 200;
  res.end(JSON.stringify(user));
};
