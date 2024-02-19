import React, { useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientsChange = (event, idx) => {
    const { value } = event.target;
    setRecipe((prevState) => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients[idx] = value;
      return { ...prevState, ingredients: updatedIngredients };
    });
  };

  const addIngredients = () => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, ""],
    }));
  };

  const onSumit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://recipe-website-grt4.vercel.app/recipe",
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      enqueueSnackbar("Successfully Created the recipe", {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!cookies.access_token) {
    return (
      <div className="create-recipe">
        <h2 className="invalid-title">Create Recipe</h2>
        <p className="invalid-description">Please log in to create a recipe.</p>
      </div>
    );
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSumit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredients, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(event) => handleIngredientsChange(event, idx)}
          />
        ))}
        <button onClick={addIngredients} type="button" className="add_btn">
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imgUrl">image URL</label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
