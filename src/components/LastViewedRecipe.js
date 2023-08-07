import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import Recipe from "@/components/Recipe";

const LastViewedRecipe = () => {
  const ctx = useContext(authContext);
  const [lastViewedRecipe, setLastViewedRecipe] = useState(null);
  useEffect(() => {
    const getLastViewed = async () => {
      let lastViewedRecipeID = null;
      //get last viewed id
      if (!ctx.loading) {
        try {
          const response = await axios.get("../api/lastViewed", {
            headers: {
              Authorization: ctx.user.uid,
            },
          });
          if (response.status === 200) {
            lastViewedRecipeID = response.data[0].recipe_id;
          }
        } catch (err) {
          if (err?.response?.status !== 404) console.log(err);
        }
        if (lastViewedRecipeID) {
          try {
            const result = await axios.get(
              `../api/recipesbyid?s=${lastViewedRecipeID}`,
              {
                headers: {
                  Authorization: ctx.user.uid,
                },
              }
            );
            setLastViewedRecipe(result.data[0]);
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    if (!ctx.loading) getLastViewed();
  }, [ctx.loading]);

  return lastViewedRecipe ? (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Last Viewed Recipe
      </h2>
      <Recipe recipe={lastViewedRecipe} />
    </div>
  ) : (
    ""
  );
};

export default LastViewedRecipe;
