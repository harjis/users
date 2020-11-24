import { gql } from "@apollo/client";

import { Errors } from "../../../types";
import { User } from "../types";

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
