import { useQuery } from "@apollo/client";
import { FlatList, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import format from "date-fns/format";
import { GET_LOGGED_USER } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const createDeleteAlert = (deleteReview, reviewID, refetch) => {
  Alert.alert(
    "Delete review",
    "Do you want to delete this review?",
    [
      {
        text: "CANCEL",
        style: "cancel",
      },
      {
        text: "DELETE",
        onPress: async () => {
          await deleteReview(reviewID);
          refetch();
        },
      },
    ],
    {
      cancelable: true,
    }
  );
};

const UserReviewsContainer = ({
  userReviews,
  reviewHeadlineType,
  showButtons,
  onPressViewRepository,
  onPressDeleteReview,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ReviewItem
        review={item}
        headlineType={reviewHeadlineType}
        showButtons={showButtons}
        onPressViewRepository={() => onPressViewRepository(item.repositoryId)}
        onPressDeleteReview={() => onPressDeleteReview(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={userReviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  );
};

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(GET_LOGGED_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!data?.me) {
    return null;
  }

  const onPressViewRepository = (repositoryId) => {
    navigate(`/${repositoryId}`);
  };

  const onPressDeleteReview = (reviewID) => {
    createDeleteAlert(deleteReview, reviewID, refetch);
  };
  const userReviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => {
        return {
          ...edge.node,
          createdAt: format(new Date(edge.node.createdAt), "dd.MM.yyyy"),
        };
      })
    : [];

  return (
    <UserReviewsContainer
      userReviews={userReviews}
      reviewHeadlineType="repositoryId"
      showButtons={true}
      onPressViewRepository={onPressViewRepository}
      onPressDeleteReview={onPressDeleteReview}
    />
  );
};

export default UserReviews;
