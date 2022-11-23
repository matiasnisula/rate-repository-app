import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";

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

const AppBar = ({ loggedUser, setLoggedUser }) => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    setLoggedUser(null);
    navigate("/");
  };
  const signInTab = (
    <AppBarTab
      style={styles.appBarTab}
      text="Sign in"
      onPress={() => navigate("/signin")}
    />
  );
  const signOutTab = (
    <AppBarTab style={styles.appBarTab} text="Sign out" onPress={signOut} />
  );
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          style={styles.appBarTab}
          text="Repository"
          onPress={() => navigate("/")}
        />
        {loggedUser ? signOutTab : signInTab}
      </ScrollView>
    </View>
  );
};

export default AppBar;
