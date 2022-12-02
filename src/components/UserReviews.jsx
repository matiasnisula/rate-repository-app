import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import format from "date-fns/format";
import { GET_LOGGED_USER } from "../graphql/queries";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const renderItem = ({ item }) => {
  return <ReviewItem review={item} headlineType="repositoryId" />;
};

const UserReviews = () => {
  const { data, loading } = useQuery(GET_LOGGED_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!data?.me) {
    return null;
  }
  const userReviews = data.me.reviews
  ? data.me.reviews.edges.map((edge) => {
      return {
          ...edge.node,
          createdAt: format(new Date(edge.node.createdAt), "dd.MM.yyyy"),
        };
    })
    : [];
  console.log("userReviews:", userReviews);
    
  return (
    <FlatList
      data={userReviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  );
};

export default UserReviews;
