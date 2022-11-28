import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from 'expo-linking';
import Text from "./Text";
import theme from "../theme";

const itemStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    flexGrow: 0,
    backgroundColor: theme.colors.repositoryItem,
  },
});

const itemHeaderStyles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: "row",
    flexGrow: 1,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    flexGrow: 0,
    padding: 10,
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 5,
  },
  languageTagContainer: {
    flexGrow: 0,
    maxWidth: 90,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const itemStatisticsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
  },
  statisticContainer: {
    flexDirection: "col",
    justifyContent: "center",
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    flexGrow: 0,
    height: 30,
    margin: 10,
  },
});

const ItemHeader = ({ fullName, description, language, ownerAvatarUrl }) => {
  return (
    <View style={itemHeaderStyles.container}>
      <View style={itemHeaderStyles.avatarContainer}>
        <Image
          style={itemHeaderStyles.avatar}
          source={{ uri: ownerAvatarUrl }}
        />
      </View>
      <View style={itemHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {fullName}
        </Text>
        <Text color="textSecondary">{description}</Text>
        <View style={itemHeaderStyles.languageTagContainer}>
          <Text style={{ color: "white" }}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryStatistics = ({
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  const roundStatistic = (statistic) => {
    if (statistic < 1000) {
      return statistic;
    }
    const modifiedStatistic = Math.round(statistic / 100) / 10;
    return modifiedStatistic;
  };
  const chooseDisplayFormat = (statistic) => {
    if (statistic < 1000) {
      return statistic;
    }
    const newFormat = `${roundStatistic(statistic)}k`;
    return newFormat;
  };
  const statistics = {
    forksCount: chooseDisplayFormat(forksCount),
    stargazersCount: chooseDisplayFormat(stargazersCount),
    ratingAverage: chooseDisplayFormat(ratingAverage),
    reviewCount: chooseDisplayFormat(reviewCount),
  };

  return (
    <View style={itemStatisticsStyles.container}>
      <View style={itemStatisticsStyles.statisticContainer}>
        <Text fontWeight="bold">{statistics.stargazersCount}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={itemStatisticsStyles.statisticContainer}>
        <Text fontWeight="bold">{statistics.forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={itemStatisticsStyles.statisticContainer}>
        <Text fontWeight="bold">{statistics.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={itemStatisticsStyles.statisticContainer}>
        <Text fontWeight="bold">{statistics.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  url,
  showAll,
}) => {
  const openInGitHub = async () => {
    await Linking.openURL(url);
  };

  return (
    <View testID="repositoryItem" style={itemStyles.container}>
      <ItemHeader {...{ fullName, description, language, ownerAvatarUrl }} />
      <RepositoryStatistics
        {...{ forksCount, stargazersCount, ratingAverage, reviewCount }}
      />
      {showAll && (
        <Pressable style={buttonStyles.container} onPress={openInGitHub}>
          <Text fontWeight="bold" style={{ color: "white" }}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
