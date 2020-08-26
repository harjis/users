import { DocumentNode, gql } from "@apollo/client";

import { User } from "../types";
import { ValidationResult } from "../../../types";

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

export function validateUser(user: User): Promise<ValidationResult> {
  return Promise.resolve({ isValid: true, errors: {} });
}
