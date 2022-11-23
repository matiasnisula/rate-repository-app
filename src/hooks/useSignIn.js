import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await authenticate({
      variables: { credentials: { username, password } },
    });
    const token = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    await client.resetStore();
    return response.data.authenticate;
  };

  return [signIn, result];
};

export default useSignIn;
