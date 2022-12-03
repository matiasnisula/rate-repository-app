import * as Yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateUser from "../hooks/useCreateUser";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

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
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username length must be more than 1")
    .max(30, "Username length must be less than 30"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password length must be more than 5")
    .max(50, "Password length must be less than 50"),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Password confirmation doesnt match with given password"
    )
    .required("Password confirmation is required"),
});

const SignUpForm = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: "",
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
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              secureTextEntry={true}
            />
            <Pressable style={stylesForm.button} onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Sign up</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
