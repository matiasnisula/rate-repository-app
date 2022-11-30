import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";
import format from "date-fns/format";
import Text from "./Text";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const itemStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    flexGrow: 0,
    backgroundColor: theme.colors.repositoryItem,
    marginTop: 5,
    padding: 10,
  },
});

const itemHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    flexGrow: 0,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 5,
  },
});

const ItemHeader = ({ username, createdAt, rating }) => {
  return (
    <View style={itemHeaderStyles.container}>
      <View style={itemHeaderStyles.ratingContainer}>
        <Text fontWeight="bold" style={{ color: theme.colors.primary }}>
          {rating}
        </Text>
      </View>
      <View style={itemHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {username}
        </Text>
        <Text color="textSecondary">{createdAt}</Text>
      </View>
    </View>
  );
};

const itemTextStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 10,
  },
});

const ItemBody = ({ text }) => {
  return (
    <View style={itemTextStyle.container}>
      <Text>{text}</Text>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={itemStyles.container}>
      <ItemHeader
        username={review.user.username}
        createdAt={review.createdAt}
        rating={review.rating}
      />
      <ItemBody text={review.text} />
    </View>
  );
};

const SingleRepositoryView = () => {
  const { repositoryID } = useParams();

  const { repository } = useRepository(repositoryID);
  const repositoryReviews = repository
    ? repository.reviews.edges.map((edge) => {
        return {
          ...edge.node,
          createdAt: format(new Date(edge.node.createdAt), "dd.MM.yyyy"),
        };
      })
    : [];

  const renderItem = ({ item }) => {
    return <ReviewItem review={item} />;
  };

  return (
    <FlatList
      data={repositoryReviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem {...repository} showAll={true} />
      )}
    />
  );
};

export default SingleRepositoryView;
