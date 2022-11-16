import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ style }) => {
  const onPress = () => {
    console.log("Pressed");
  }
  return (
    <Pressable style={style} onPress={onPress}>
      <Text color="appBar">Repositories</Text>
    </Pressable>
  );
};
export default AppBarTab;
