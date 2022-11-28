import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS, PAGE_INFO_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO_FIELDS}
  query getRepositories {
    repositories {
      edges {
        cursor
        node {
          ...RepositoryFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
      totalCount
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query getLogggedUser {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  ${REPOSITORY_FIELDS}
  query getRepositoryById($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields
    }
  }
`;
