import http from "node:http";
import "dotenv/config";
import { handleUsersApi, handleUserApi } from "./api/index.js";

const { HOST, PORT, SLUG_USERS } = process.env;
const host = `${HOST}:${PORT}`;

const regUsers = new RegExp(`^${SLUG_USERS}/?$`, "i");
const regUser = new RegExp(`^${SLUG_USERS}\\/.+`, "i");

const errorNotFound = JSON.stringify({ error: "Not found" });
const errorInternal = JSON.stringify({ error: "Internal server error" });

export const server = http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  try {
    const url = new URL(req.url!, host);
    const { pathname } = url;

    if (regUsers.test(pathname)) {
      handleUsersApi(req, res);
    } else if (regUser.test(pathname)) {
      handleUserApi(req, res);
    } else {
      res.statusCode = 404;
      res.end(errorNotFound);
      return;
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(errorInternal);
  }
});

const listener = () => {
  console.log(`Server is listening ${PORT} port`);
};

server.listen(PORT, listener);

server.on("error", (error) => {
  if ((error as NodeJS.ErrnoException).code === "EADDRINUSE") {
    console.error(`Please, try another port (not ${PORT}, in .env)`);
    server.close();
    process.exit(1);
  }
});
