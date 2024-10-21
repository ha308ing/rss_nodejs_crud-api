# How to start

- `npm i` - install dependencies

- `npm run start:dev` - to start dev mode with auto-reload
- `npm run start:prod` - to build the bundled script (in dist/server.cjs) and start the server

_default port is 4000, set in .env file_

## How to test

- `npm run test`

# Basic CRUD API

The data is stored in-memory as array of user objects.

User object properties:

- id - uuid generated on server (without dashes, for request, with dashes is acceptable)
- username - string
- age - number
- hobbies - array of strings

# Operations

| method | endpoint               | data                                             | description   |
| ------ | ---------------------- | ------------------------------------------------ | ------------- |
| GET    | `/api/users`           |                                                  | Get all users |
| POST   | `/api/users`           | `{"username":"John","age":27,"hobbies":[]}`      | Add user      |
| GET    | `/api/users/<user-id>` |                                                  | Get user      |
| PUT    | `/api/users/<user-id>` | `{"username":"Jane","age":25,"hobbies":["ski"]}` | Replace user  |
| DELETE | `/api/users/<user-id>` |                                                  | Remove user   |

# curl examples

<details>
<summary>GET /api/users</summary>
<pre>curl http://localhost:4000/api/users</pre>
</details>

<details>
<summary>POST /api/users</summary>
<pre>curl http://localhost:4000/api/users -H 'Content-Type: application/json' -d '{"username":"John","age": 27,"hobbies": []}'</pre>
</details>
<details>

<summary>GET /api/users/user-id</summary>
<pre>curl http://localhost:4000/api/users/56820d7127ac43e2943b2edd385a7725</pre>
or
<pre>curl http://localhost:4000/api/users/56820d71-27ac-43e2-943b-2edd385a7725</pre>
</details>

<details>
<summary>PUT /api/users/user-id</summary>
<pre>curl http://localhost:4000/api/users/56820d7127ac43e2943b2edd385a7725 -X PUT -H 'Content-Type: application/json' -d '{"username":"Jane","age": 25,"hobbies": ["ski"]}'</pre>
</details>

<details>
<summary>DELETE /api/users/user-id</summary>
<pre>curl http://localhost:4000/api/users/56820d7127ac43e2943b2edd385a7725 -X DELETE</pre>
</details>
