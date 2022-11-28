import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import useRepository from "../hooks/useRepository";

const SingleRepositoryView = () => {
  const { repositoryID } = useParams();

  const { repository } = useRepository(repositoryID);
  console.log("repository:", repository);
  return <RepositoryItem {...repository} showAll={true} />;
};

export default SingleRepositoryView;
