import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebouncedCallback } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <RepositoryListHeader
        selectedOrder={this.props.selectedOrder}
        setSelectedOrder={this.props.setSelectedOrder}
        setSearchKeywordDebounced={this.props.setSearchKeywordDebounced}
      />
    );
  };

  renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => this.props.navigate(`/${item.id}`)}>
        <RepositoryItem {...item} showAll={false} />
      </Pressable>
    );
  };
  itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  getRepositoryNodes = () => {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];
    return repositoryNodes;
  };

  onEndReach = () => {
    this.props.fetchMore();
  };

  render() {
    return (
      <FlatList
        data={this.getRepositoryNodes()}
        ItemSeparatorComponent={this.itemSeparator}
        renderItem={this.renderItem}
        onEndReached={this.onEndReach}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

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
  const [selectedOrder, setSelectedOrder] = React.useState();
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const setSearchKeywordDebounced = useDebouncedCallback((value) => {
    setSearchKeyword(value);
  }, 500);
  const useRepositoryArgs = parseUseRepositoriesArgs(selectedOrder);

  const { repositories, fetchMore } = useRepositories(
    useRepositoryArgs.orderBy,
    useRepositoryArgs.orderDirection,
    searchKeyword
  );
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      setSearchKeywordDebounced={setSearchKeywordDebounced}
      fetchMore={fetchMore}
    />
  );
};

export default RepositoryList;
