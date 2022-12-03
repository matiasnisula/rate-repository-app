import * as Yup from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";
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
  ownerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be greater than 0")
    .max(100, "Rating must be less than 100"),
});

const CreateReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const responseReview = await createReview(values);
      navigate(`/${responseReview.repositoryId}`);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View style={stylesForm.container}>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput
              name="text"
              placeholder="Review"
              multiline={true}
            />
            <Pressable style={stylesForm.button} onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Create review</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateReviewForm;
