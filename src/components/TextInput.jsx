import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import { styles } from "./Text";

const stylesInput = StyleSheet.create({
  input: {
    borderRadius: 5,
    height: 30,
    width: 200,
    margin: 5,
    backgroundColor: "white",
  },
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [style || stylesInput.input, styles.text];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
