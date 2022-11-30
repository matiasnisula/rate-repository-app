import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import theme from "../theme";

const styleSelectionMenu = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "col",
    height: 150,
    backgroundColor: theme.colors.backgroundMain,
  },
});

const RepositoryListOrderSelectionMenu = ({
  selectedOrder,
  setSelectedOrder,
}) => {
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

export default RepositoryListOrderSelectionMenu;
