import { DocumentNode, gql } from "@apollo/client";

import { User } from "../types";
import { Errors, ValidationResult } from "../../../types";

export type GetUsersData = {
  users: User[];
};
// I would have thought TS to complain about implicit any but noo..
export const GET_USERS: DocumentNode = gql`
  query GetUsers {
    users {
      id
      age
      name
      email
    }
  }
`;

export type CreateUserInput = {
  input: User;
};
export type CreateUserData = {
  createUser: { user: User | null; errors: Errors };
};
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        name
        age
        email
      }
      errors
    }
  }
`;

export function validateUser(user: User): Promise<ValidationResult> {
  return Promise.resolve({ isValid: true, errors: {} });
}
