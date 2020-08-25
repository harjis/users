import { User } from "../types";
import { ValidationResult } from "../../../types";
import { gql } from "@apollo/client";

export type GetUsersData = {
  users: User[];
};
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      age
      name
      email
    }
  }
`;

export function createUser(user: User): Promise<User> {
  return Promise.resolve(user);
}

export function validateUser(user: User): Promise<ValidationResult> {
  return Promise.resolve({ isValid: true, errors: {} });
}
