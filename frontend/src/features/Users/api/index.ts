import ky from "ky";

import { User } from "../types";

export function getUsers(): Promise<User[]> {
  return ky.get("/api/users").json();
}

export function createUser(user: User): Promise<User> {
  return ky.post("/api/users", { json: user }).json();
}
