import request from "supertest";
import { server } from "./index";

// const host = "http://localhost:4000";

describe("Test Users CRUD API", () => {
  let userId = "";
  const userData = {
    username: "Roman",
    age: 24,
    hobbies: ["football", "hockey"],
  };

  const newData = {
    username: "Tiana",
    age: 22,
    hobbies: ["dancing"],
  };

  afterAll((done) => {
    server.close(done);
  });

  describe("test valid inputs", () => {
    it("should send empty array of users on start", async () => {
      const res = await request(server).get("/api/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });

    it("should create user", async () => {
      const res = await request(server).post(`/api/users`).send(userData);

      userId = res.body.id;

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(userData);
      expect(res.body.id).toHaveLength(32);
    });

    it("should send user data by id", async () => {
      const res = await request(server).get("/api/users/" + userId);

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(userData);
    });

    it("should update user data", async () => {
      const res = await request(server)
        .put("/api/users/" + userId)
        .send(newData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(newData);
    });

    it("should delete user", async () => {
      const res = await request(server).delete("/api/users/" + userId);

      expect(res.statusCode).toBe(204);
    });

    it("should not find deteled user", async () => {
      const res = await request(server).get("/api/users/" + userId);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("User not found");
    });
    /*
    it("should get all books", async () => {
    const res = await request(server).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get a single book by ID", async () => {
    const res = await request(server).get(`/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Test Book");
    expect(res.body.author).toEqual("Test Author");
    expect(res.body.genre).toEqual("Test Genre");
  });

  it("should update a book", async () => {
    const res = await request(server).put(`/books/${bookId}`).send({
      title: "Updated Book",
      author: "Updated Author",
      genre: "Updated Genre",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Updated Book");
    expect(res.body.author).toEqual("Updated Author");
    expect(res.body.genre).toEqual("Updated Genre");
  });

  it("should delete a book", async () => {
    const res = await request(server).delete(`/books/${bookId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Updated Book");
    expect(res.body.author).toEqual("Updated Author");
    expect(res.body.genre).toEqual("Updated Genre");
  }); */
  });

  describe("test invalid inputs", () => {
    it("should not create user without props and return status 400", async () => {
      const res = await request(server).post("/api/users").send();

      expect(res.statusCode).toBe(400);
    });

    it("should not create user with missing props and return status 400", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ username: "Jane" });

      expect(res.statusCode).toBe(400);
    });

    it("should not delete invalid id", async () => {
      const res = await request(server).delete("/api/users/invalid-id");

      expect(res.statusCode).toBe(400);
    });

    it("should not update missing id", async () => {
      const res = await request(server).put(
        "/api/users/97c528df-e5d9-449d-9310-cb9d2b425d7c",
      );

      expect(res.statusCode).toBe(404);
    });

    it("should not update with invalid data, but right id", async () => {
      const initial = await request(server).post("/api/users").send(userData);
      const userId = initial.body.id;

      const res = await request(server).put("/api/users/" + userId);

      expect(res.body.error).toBe(
        "Failed to update user. Check fields username, age, hobbies",
      );
    });
  });

  describe("test invalid endpoints and methods", () => {
    it("should return 404 on invalid endpoint", async () => {
      const res = await request(server).get("/api/invalid-endpoint");

      expect(res.statusCode).toBe(404);
    });

    it("should return 400 on invalid method", async () => {
      const res = await request(server).patch("/api/users");

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Method is not supported");
    });
  });
});
