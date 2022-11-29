import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";
import RepositoryList from "./RepositoryList";
import SingleRepositoryView from "./SingleRepositoryView";
import AppBar from "./AppBar";
import SignInForm from "./SignInForm";
import CreateReviewForm from "./CreateReviewForm";
import SignUpForm from "./SignUpForm";
import theme from "../theme";
import { GET_LOGGED_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backgroundMain,
  },
});

const Main = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { data, error, loading } = useQuery(GET_LOGGED_USER);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.log(error);
      return;
    }
    setLoggedUser(data.me);
  });

  return (
    <View style={styles.container}>
      <AppBar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/:repositoryID" element={<SingleRepositoryView />} />
        <Route path="/createreview" element={<CreateReviewForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
};

export default Main;
