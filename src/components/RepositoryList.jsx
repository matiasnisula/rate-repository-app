import { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const styleSelectionMenu = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "col",
    height: 150,
    backgroundColor: theme.colors.backgroundMain,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListOrderSelection = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <Picker
      style={styleSelectionMenu.container}
      selectedValue={selectedOrder}
      onValueChange={(itemValues) => {
        setSelectedOrder(itemValues);
      }}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT" />
      <Picker.Item
        label="Highest rated repositories"
        value="RATING_AVERAGE_DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="RATING_AVERAGE_ASC"
      />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  navigate,
  selectedOrder,
  setSelectedOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItem {...item} showAll={false} />
      </Pressable>
    );
  };
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <RepositoryListOrderSelection
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}
    />
  );
};

const parseUseRepositoriesArgs = (selectedOrder) => {
  switch (selectedOrder) {
    case "RATING_AVERAGE_DESC":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
    case "RATING_AVERAGE_ASC":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };
    default:
      return {
        orderBy: "CREATED_AT",
        orderDirection: null,
      };
  }
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState();
  console.log("Selected order:", selectedOrder);
  const useRepositoryArgs = parseUseRepositoriesArgs(selectedOrder);
  console.log("args:", useRepositoryArgs);

  const { repositories } = useRepositories(
    useRepositoryArgs.orderBy,
    useRepositoryArgs.orderDirection
  );
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
