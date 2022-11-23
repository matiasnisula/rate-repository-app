import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ style, text, onPress }) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Text fontWeight="bold" color="appBar">
        {text}
      </Text>
    </Pressable>
  );
};
export default AppBarTab;
