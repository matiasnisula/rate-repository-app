import { View } from "react-native";
import RepositoryListOrderSelectionMenu from "./RepositoryListOrderSelectionMenu";
import TextInput from "./TextInput";

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  setSearchKeywordDebounced,
}) => {
  const onChangeSearchInput = (event) => {
    setSearchKeywordDebounced(event);
  };
  return (
    <View>
      <TextInput
        placeholder="Search"
        name="serachKeyword"
        onChangeText={onChangeSearchInput}
      ></TextInput>
      <RepositoryListOrderSelectionMenu
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </View>
  );
};

export default RepositoryListHeader;
