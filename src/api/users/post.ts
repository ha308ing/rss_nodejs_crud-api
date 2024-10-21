import { addUser } from "../../users.js";
import type http from "node:http";

const errorMissingProps = JSON.stringify({
  error: "Failed to add user. Check fields username, age, hobbies",
});

export const post = (req: http.IncomingMessage, res: http.ServerResponse) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    let user = null;
    try {
      const userInput = JSON.parse(requestBody);
      user = addUser(userInput);
    } catch (error) {
      res.statusCode = 400;
      res.end(errorMissingProps);
      return;
    }

    if (user == null) {
      res.statusCode = 400;
      res.end(errorMissingProps);
      return;
    }

    res.statusCode = 201;
    res.end(JSON.stringify(user));
  });
};
