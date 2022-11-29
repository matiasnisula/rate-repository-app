import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      createdAt
      id
      rating
      repositoryId
      text
      userId
      user {
        username
        id
      }
      repository {
        fullName
        name
        id
      }
    }
  }
`;
