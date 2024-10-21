import type http from "node:http";
import { getUser, updateUser } from "../../users.js";

const errorUserNotFound = JSON.stringify({ error: "User not found" });
const errorInvalidInput = JSON.stringify({
  error: "Failed to update user. Check fields username, age, hobbies",
});

export const put = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string,
) => {
  const user = getUser(userId);

  if (user == null) {
    res.statusCode = 404;
    res.end(errorUserNotFound);
    return;
  }

  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    let user = null;
    try {
      const userInput = JSON.parse(requestBody);
      user = updateUser(userId, userInput);
    } catch (error) {
      res.statusCode = 400;
      res.end(errorInvalidInput);
      return;
    }

    if (user == null) {
      res.statusCode = 400;
      res.end(errorInvalidInput);
      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(user));
  });
};
