import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];
  
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem {...item} showAll={false} />
      </Pressable>
    )
  };
  return (
    <FlatList
    data={repositoryNodes}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={renderItem}
    />
    );
  };
  
  const RepositoryList = () => {
    const { repositories } = useRepositories();
    const navigate = useNavigate();
  
  return <RepositoryListContainer repositories={repositories} navigate={navigate} />;
};

export default RepositoryList;
