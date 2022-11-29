import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_BY_ID } from "../graphql/queries";

const useRepository = (repositoryID) => {
  const [repository, setRepository] = useState(null);
  const { data, error, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: { id: repositoryID },
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      console.log("ERROR:", error);
    }
    setRepository(data.repository);
  }, [loading]);

  return { repository, error, loading };
};

export default useRepository;
