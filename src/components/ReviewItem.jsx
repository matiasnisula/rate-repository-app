import { StyleSheet, View, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const itemStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexWrap: "wrap",
    flexGrow: 1,
    backgroundColor: theme.colors.repositoryItem,
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
  },
});

const itemHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 0,
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
    flexGrow: 0,
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

const buttonProperties = {
  borderRadius: 5,
  flexGrow: 0,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  marginRight: 5,
};

const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  viewRepositoryButton: {
    ...buttonProperties,
    backgroundColor: theme.colors.primary,
  },
  deleteReviewButton: {
    ...buttonProperties,
    backgroundColor: "red",
  },
});

const ItemButtons = ({ onPressViewRepository, onPressDeleteReview }) => {
  return (
    <View style={buttonStyles.container}>
      <Pressable
        style={buttonStyles.viewRepositoryButton}
        onPress={onPressViewRepository}
      >
        <Text fontWeight="bold" style={{ color: "white" }}>
          View repository
        </Text>
      </Pressable>
      <Pressable
        style={buttonStyles.deleteReviewButton}
        onPress={onPressDeleteReview}
      >
        <Text fontWeight="bold" style={{ color: "white" }}>
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

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

const ReviewItem = ({
  review,
  headlineType,
  showButtons,
  onPressViewRepository,
  onPressDeleteReview,
}) => {
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
      {showButtons && (
        <ItemButtons
          onPressViewRepository={onPressViewRepository}
          onPressDeleteReview={onPressDeleteReview}
        />
      )}
    </View>
  );
};

export default ReviewItem;
