import { useContext, useEffect, useState } from "react";
import authContext from "@/context/authContext";
import axios from "axios";
import Recipe from "@/components/Recipe";

const RecipeOfTheDay = () => {
  const ctx = useContext(authContext);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState(null);
  useEffect(() => {
    const getRecipeOfTheDay = async () => {
      let dailyRecipeID = 685734;
      //get recipe of the day id
      if (!ctx.loading) {
        //   try {
        //     const response = await axios.get("../api/lastViewed", {
        //       headers: {
        //         Authorization: ctx.user.uid,
        //       },
        //     });
        //     if (response.status === 200) {
        //       dailyRecipeID = response.data[0].recipe_id;
        //     }
        //   } catch (err) {
        //     if (err?.response?.status !== 404) console.log(err);
        //   }
        if (dailyRecipeID) {
          try {
            const result = await axios.get(
              `../api/recipesbyid?s=${dailyRecipeID}`,
              {
                headers: {
                  Authorization: ctx.user.uid,
                },
              }
            );
            setRecipeOfTheDay(result.data[0]);
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    if (!ctx.loading) getRecipeOfTheDay();
  }, [ctx.loading]);

  return recipeOfTheDay ? (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        Recipe Of The Day
      </h2>
      <Recipe recipe={recipeOfTheDay} />
    </div>
  ) : (
    ""
  );
};

export default RecipeOfTheDay;
