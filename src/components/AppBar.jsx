import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { ScrollView } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    height: 75,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  appBarTab: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          style={styles.appBarTab}
          text="Repository"
          path="/"
        />
        <AppBarTab
          style={styles.appBarTab}
          text="Sign in"
          path="/signin"
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
