import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

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

const itemTextStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    paddingVertical: 10,
  },
});

const ItemHeader = ({ headline, createdAt, rating }) => {
  return (
    <View style={itemHeaderStyles.container}>
      <View style={itemHeaderStyles.ratingContainer}>
        <Text fontWeight="bold" style={{ color: theme.colors.primary }}>
          {rating}
        </Text>
      </View>
      <View style={itemHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {headline}
        </Text>
        <Text color="textSecondary">{createdAt}</Text>
      </View>
    </View>
  );
};

const ItemBody = ({ text }) => {
  return (
    <View style={itemTextStyle.container}>
      <Text>{text}</Text>
    </View>
  );
};

const ReviewItem = ({ review, headlineType }) => {
  return (
    <View style={itemStyles.container}>
      <ItemHeader
        headline={
          headlineType === "username"
            ? review.user.username
            : review.repositoryId
        }
        createdAt={review.createdAt}
        rating={review.rating}
      />
      <ItemBody text={review.text} />
    </View>
  );
};

export default ReviewItem;
