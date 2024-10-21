import { randomUUID } from "node:crypto";

interface IUser {
  id: string; // — unique identifier (string, uuid) generated on server side
  username: string; // — user's name (string, required)
  age: number; // — user's age (number, required)
  hobbies: string[]; // — user's hobbies (array of strings or empty array, required)
}

export const users: IUser[] = [];

export const getUsersString = () => JSON.stringify(users);

const regUsername = /^[a-zа-я][a-zа-я\- ]*$/i;
const regId =
  /^(?<uuid>(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})|(?:[0-9a-f]{32}))$/i;

interface IUserInput {
  username?: unknown;
  age?: unknown;
  hobbies?: unknown;
}

export const getUserId = (idInput: string) => {
  const match = idInput.match(regId);

  if (match == null || match[0] == null) return null;

  return match[0];
};

export const validateUserInput = (data: IUserInput): data is IUser => {
  const { username, age, hobbies } = data;

  if (username == null || age == null || hobbies == null) return false;

  if (regUsername.test(username as string) == false) return false;

  const ageInt = parseInt(age as string);
  if (parseFloat(age as string) != ageInt || isNaN(ageInt) || ageInt < 1)
    return false;

  if (Array.isArray(hobbies) == false) return false;

  return true;
};

export const addUser = (user: IUserInput): IUser | null => {
  if (!validateUserInput(user)) return null;
  const uuid = randomUUID();
  const id = uuid.replaceAll("-", "");
  const userRecord = { ...user, id };
  users.push(userRecord);
  return userRecord;
};

export const getUser = (userId: string): IUser | null => {
  userId = userId.replaceAll("-", "");
  return users.find((user) => user.id === userId) ?? null;
};

export const updateUser = (
  userId: string,
  userInput: IUserInput,
): IUser | null => {
  const isUserInputValid = validateUserInput(userInput);

  if (isUserInputValid == false) return null;

  const user = getUser(userId);
  if (user == null) return null;
  const { id, ...userData } = userInput;

  Object.assign(user, userData);

  return user;
};

export const deleteUser = (userId: string) => {
  const index = users.findIndex((user) => user.id === userId);
  if (index == -1) return false;
  users.splice(index, 1);
  return true;
};
