import { Api } from "../../../api";
import { User } from "../types";
import { ValidationResult } from "../../../types";

export function getUsers(): Promise<User[]> {
  return Api().get("/api/users").json();
}

export function createUser(user: User): Promise<User> {
  return Api().post("/api/users", { json: user }).json();
}

export function validateUser(user: User): Promise<ValidationResult> {
  return Api().post("/api/users/validate", { json: user }).json();
}
