import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import { styles } from "./Text";
import theme from "../theme";

const stylesInput = StyleSheet.create({
  input: {
    borderRadius: 5,
    height: 30,
    width: 200,
    margin: 5,
    backgroundColor: "white",
  },
  inputError: {
    borderWidth: 2,
    borderColor: theme.colors.errorTextColor,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style || stylesInput.input,
    styles.text,
    error && stylesInput.inputError,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
