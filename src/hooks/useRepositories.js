import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState();
  const variables = {
    orderBy: orderBy || undefined,
    orderDirection: orderDirection || undefined,
    searchKeyword: searchKeyword,
    first: 4,
  };
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: { ...variables },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.log("ERROR:", error);
    }
    setRepositories(data.repositories);
  }, [data?.repositories]);

  return { repositories, error, loading, fetchMore: handleFetchMore, result };
};

export default useRepositories;
