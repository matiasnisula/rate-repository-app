import * as Yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
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
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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

const SignInForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return <SignInFormContainer onSubmit={onSubmit} />;
};

export default SignInForm;
