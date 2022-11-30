import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_ID } from "../graphql/queries";

const useRepository = (repositoryID) => {
  const [repository, setRepository] = useState(null);
  const variables = {
    id: repositoryID,
    first: 4,
  };
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_BY_ID,
    {
      fetchPolicy: "cache-and-network",
      variables: { ...variables },
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
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
    setRepository(data.repository);
    console.log("data.reviews:", data.repository.reviews);
  }, [data?.repository]);

  return { repository, error, loading, fetchMore: handleFetchMore, result };
};

export default useRepository;
