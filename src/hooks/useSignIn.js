import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  console.log("result (hook.js):", result);

  const signIn = async ({ username, password }) => {
    const response = await authenticate({
      variables: { credentials: { username, password } },
    });
    return response.data.authenticate;
  };

  return [signIn, result];
};

export default useSignIn;
