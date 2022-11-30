import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: orderBy || undefined,
      orderDirection: orderDirection || undefined,
      searchKeyword: searchKeyword,
    },
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    setRepositories(data.repositories);
  }, [loading]);

  return { repositories, error, loading };
};

export default useRepositories;
