import type http from "node:http";
import { deleteUser as delUser } from "../../users.js";

const error = JSON.stringify({ error: "Failed to delete user" });

export const deleteUser = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  usedId: string,
) => {
  const isUserDeleted = delUser(usedId);

  if (isUserDeleted == false) {
    res.statusCode = 400;
    res.end(error);
    return;
  }

  res.statusCode = 204;
  res.end();
};
