import { DocumentNode, gql } from "@apollo/client";

import { User } from "../types";
import { Errors } from "../../../types";

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

export type ValidateUserInput = {
  name: string;
  age: number;
  email: string;
};
export type ValidateUserData = {
  validateUser: {
    errors: Errors;
    isValid: boolean;
  };
};
export const VALIDATE_USER: DocumentNode = gql`
  query ValidateUser($name: String!, $age: Int!, $email: String!) {
    validateUser(name: $name, age: $age, email: $email) {
      errors
      isValid
    }
  }
`;
