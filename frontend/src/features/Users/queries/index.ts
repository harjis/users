import { DocumentNode, gql } from "@apollo/client";

// These queries are only used to generate types and implementation for frontend

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

export const VALIDATE_USER: DocumentNode = gql`
  query ValidateUser($name: String!, $age: Int!, $email: String!) {
    validateUser(name: $name, age: $age, email: $email) {
      errors
      isValid
    }
  }
`;
