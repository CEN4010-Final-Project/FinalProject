import { useEffect, useRef, useState } from "react";

const Recipe = ({ recipe, onToggleFavorite, page }) => {
  const heading = useRef(null);
  const [headingOneLine, setHeadingOneLine] = useState(false);
  useEffect(() => {
    if (heading.current) {
      setHeadingOneLine(heading.current.clientHeight <= 28);
      console.log(heading.current.clientHeight);
    }
  }, [heading]);

  return (
    <div
      key={recipe.id}
      className="flex gap-x-6 mt-3 p-4 bg-slate-100 rounded-lg"
    >
      <div className="flex-grow">
        <div ref={heading}>
          <h2 className="text-lg font-semibold" ref={heading}>
            {recipe.title}
          </h2>
          {recipe.vegetarian && (
            <span className="bg-green-200 text-green-900 tracking-tight font-medium mb-5 text-sm px-2.5 py-0.5 rounded">
              Vegetarian
            </span>
          )}
        </div>
        <hr className="h-px my-2 bg-slate-300"></hr>
        <p className="text-sm">
          Preparation time:{" "}
          {recipe.preparationMinutes != -1
            ? `${recipe.preparationMinutes} minute${
                recipe.preparationMinutes > 1 ? "s" : ""
              }`
            : "Unlisted"}
        </p>
        <button
          className={`${headingOneLine ? "mt-7" : "mt-3"} ${
            recipe.favorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-sm text-font-bold py-2 px-3 rounded`}
          disabled={recipe.loading ? "disabled" : ""}
          onClick={() => onToggleFavorite(recipe)}
        >
          {recipe.favorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
      <div className="flex-grow-0">
        {recipe.image ? (
          <img
            className="h-36 w-52 rounded-md object-cover drop-shadow-lg"
            src={recipe.image}
          ></img>
        ) : (
          <div className="h-36 w-52 rounded-md bg-slate-200 flex flex-col justify-center text-center text-xs">
            No image available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
