import { useEffect, useState } from "react";
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const isRecipeSaved = (id) => savedRecipe.includes(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost3002/recipe");
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost3002/recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipe(response.data.savedRecipes);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost3002/recipe",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipe(response.data.savedRecipes);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div></div>
      <div className="home_info">
        <h1 className="recipe">Recipes</h1>
        <ul>
          {recipe.map((recipe) => (
            <li key={recipe._id}>
              {/* {savedRecipe.includes(recipe._id) && <h1>Already Save</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)}> Save </button>
            </div> */}
              <div>
                <h2 className="recipe-name">{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>

              <div className="instruction">
                <p className="recipe-text">{recipe.instructions}</p>
              </div>
              <img src={recipe.imgUrl} alt={recipe.name} />
              <p className="recipe-text">
                Cooking Time: {recipe.cookingTime} (minues)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
