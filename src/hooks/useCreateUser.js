import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutationCreateUser, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const response = await mutationCreateUser({
      variables: { user: { username, password } },
    });
    return response.data.createUser;
  };

  return [createUser, result];
};

export default useCreateUser;
