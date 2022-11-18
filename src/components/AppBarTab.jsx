import { Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ style, text, path }) => {
  return (
    <Pressable style={style}>
      <Link to={path}>
        <Text color="appBar">{text}</Text>
      </Link>
    </Pressable>
  );
};
export default AppBarTab;
