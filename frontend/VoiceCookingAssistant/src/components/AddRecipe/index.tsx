import { useFormik } from "formik";

export const AddRecipe = () => {
  const initialValues = {
    title: "",
    ingredients: [],
    instructions: [],
    difficulty: "",
    servings: "",
    cookingTime: "",
    prepTime: "",
    imageUrl: "",
  };

  const addRecipeForm = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return <>AddRecipe</>;
};

export default AddRecipe;
