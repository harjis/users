import ky from "ky";

import { User } from "../types";

export function getUsers(): Promise<User[]> {
  return ky.get('/api/users').json();
}
