import { User } from "../types";
import { ValidationResult } from "../../../types";
import { DocumentNode, gql } from "@apollo/client";

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

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
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
