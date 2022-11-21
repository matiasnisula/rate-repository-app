import { View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ style, text, path }) => {
  return (
    <View style={style}>
      <Link to={path}>
        <Text fontWeight="bold" color="appBar">
          {text}
        </Text>
      </Link>
    </View>
  );
};
export default AppBarTab;
