import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutationCreateReview, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutationCreateReview({
      variables: {
        review: { ownerName, repositoryName, rating: Number(rating), text },
      },
    });
    return response.data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
