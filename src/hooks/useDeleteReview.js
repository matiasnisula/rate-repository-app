import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = async (reviewID) => {
    const response = await deleteReview({
      variables: { id: reviewID },
    });
    return response?.deleteReview;
  };

  return [handleDeleteReview, result];
};

export default useDeleteReview;
