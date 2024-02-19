import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";

const SavedRecipe = () => {
  const [savedRecipe, setSavedRecipe] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipe-website-nu83hag2a-zeros-projects-0a3b826b.vercel.app/recipe/savedRecipes/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h1> Saved Recipes</h1>
      <ul>
        {savedRecipe.map((recipe) => (
          <li key={recipe._id}>
            <div className="instruction">
              <p className="instruction-description">{recipe.instructions}</p>
            </div>
            <img src={recipe.imgUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minues)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipe;
