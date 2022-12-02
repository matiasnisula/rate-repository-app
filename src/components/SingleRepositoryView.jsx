import { useParams } from "react-router-native";
import { FlatList } from "react-native";
import useRepository from "../hooks/useRepository";
import format from "date-fns/format";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

const renderItem = ({ item }) => {
  return <ReviewItem review={item} headlineType="username" />;
};

const SingleRepositoryView = () => {
  const { repositoryID } = useParams();

  const { repository, fetchMore } = useRepository(repositoryID);
  const repositoryReviews = repository
    ? repository.reviews.edges.map((edge) => {
        return {
          ...edge.node,
          createdAt: format(new Date(edge.node.createdAt), "dd.MM.yyyy"),
        };
      })
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={repositoryReviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      ListHeaderComponent={() => (
        <RepositoryItem {...repository} showAll={true} />
      )}
    />
  );
};

export default SingleRepositoryView;
