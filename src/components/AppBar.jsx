import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    height: 75,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  flexItem: {
    marginBottom: 10,
    marginLeft: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.flexItem} />
    </View>
  );
};

export default AppBar;
