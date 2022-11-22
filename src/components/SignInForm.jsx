import * as Yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../theme";

const stylesForm = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "col",
    padding: 10,
    alignContent: "space-around",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 30,
    width: 200,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required("Username is required"),
  password: Yup
    .string()
    .required("Password is required"),
});

const SignInForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log("FormValues:", values)}
    >
      {({ handleSubmit }) => {
        return (
          <View style={stylesForm.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry={true}
            />
            <Pressable style={stylesForm.button} onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Sign in</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignInForm;