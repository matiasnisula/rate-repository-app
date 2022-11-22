import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

const apollo_uri = Constants.manifest.extra.apollo_uri;
const httpLink = createHttpLink({
  uri: apollo_uri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
