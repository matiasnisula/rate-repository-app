import { gql } from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    ownerName
    name
    ratingAverage
    reviewCount
    stargazersCount
    ownerAvatarUrl
    language
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment PageInfoFields on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
