import { useContext, useRef, useState } from "react";
import authContext from "@/context/authContext";
import RecipeBadges from "./RecipeBadges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import ViewRecipeModalContent from "./modals/viewrecipe/ViewModal";

const Recipe = ({ recipe, onToggleFavorite }) => {
  const ctx = useContext(authContext);
  const heading = useRef(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  return (
    <>
      {showRecipeModal && (
        <ViewRecipeModalContent
          recipe={recipe}
          onHide={() => setShowRecipeModal((s) => !s)}
        />
      )}
      <div
        key={recipe.id}
        className="max-w-full flex flex-col-reverse md:flex-row gap-x-6 p-4 bg-slate-100 rounded-lg"
      >
        <div className="overflow-auto flex-grow relative">
          <div className="pt-3 md:pt-0" ref={heading}>
            <h2
              className="block text-ellipsis whitespace-nowrap overflow-hidden text-lg font-semibold"
              ref={heading}
            >
              {recipe.title}
            </h2>
            <RecipeBadges className="pb-3" recipe={recipe} />
          </div>
          <div className="flex flex-wrap gap-3 relative md:absolute bottom-0 left-0 right-0">
            {onToggleFavorite && (
              <button
                className={`${
                  recipe.loading || !ctx.user
                    ? "bg-zinc-600 hover:bg-zinc-700"
                    : recipe.favorite
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } flex-grow text-white text-sm font-semibold py-2 px-3 rounded disabled:brightness-90 `}
                disabled={recipe.loading ? "disabled" : ""}
                onClick={() => onToggleFavorite(recipe)}
              >
                {!ctx.user ? (
                  "Sign in to favorite"
                ) : recipe.favorite ? (
                  <>
                    Remove favorite
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="pl-1 translate-y-px"
                    />
                  </>
                ) : (
                  <>
                    Add favorite
                    <FontAwesomeIcon icon={faPlus} className="pl-1 " />
                  </>
                )}
              </button>
            )}
            <button
              className="bg-green-600 hover:bg-green-700 flex-grow text-white text-sm font-semibold py-2 px-3 rounded"
              onClick={() => setShowRecipeModal((s) => !s)}
            >
              View Recipe
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="pl-1.5 text-xs mb-px"
              />
            </button>
          </div>
        </div>

        {recipe.image ? (
          <div className="h-48 w-full md:h-36 md:w-52 rounded-md drop-shadow-lg flex-shrink-0">
            <img
              className="w-full h-full object-cover rounded-md"
              src={recipe.image}
            ></img>
          </div>
        ) : (
          <div className="h-48 w-full md:h-36 md:w-52 rounded-md bg-slate-200 flex flex-col justify-center text-center text-xs">
            No image available.
          </div>
        )}
      </div>
    </>
  );
};

export default Recipe;
