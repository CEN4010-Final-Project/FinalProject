import { useRef } from "react";
import RecipeBadges from "./RecipeBadges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const Recipe = ({ recipe, onToggleFavorite, page }) => {
  const heading = useRef(null);


  return (
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
          <RecipeBadges className="pb-12 md:pb-0" recipe={recipe} />
        </div>

        <button
          className={`${
            recipe.favorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-sm font-semibold py-2 px-3 rounded absolute bottom-0 max-md:right-0 md:left-0`}
          disabled={recipe.loading ? "disabled" : ""}
          onClick={() => onToggleFavorite(recipe)}
        >
          {recipe.favorite ? <>Remove favorite<FontAwesomeIcon icon={faXmark} className="pl-1 translate-y-px" /></> : <>Add favorite<FontAwesomeIcon icon={faPlus} className="pl-1 " /></>}
        </button>
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
  );
};

export default Recipe;
