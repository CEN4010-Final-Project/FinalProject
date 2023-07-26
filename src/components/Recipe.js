import { useEffect, useRef, useState } from 'react';

const Recipe = ({ recipe, onToggleFavorite, page}) => {
  const heading = useRef(null);
  const [headingOneLine, setHeadingOneLine] = useState(false)
  useEffect(() => {
    if (heading.current) {
      setHeadingOneLine(heading.current.clientHeight <= 28);
      console.log(heading.current.clientHeight <= 28)
    }
 
  }, [heading]);

  return (
    <div
      key={recipe.id}
      className="flex gap-x-6 mt-3 p-4 bg-slate-100 rounded-lg"
    >
      <div className="flex-grow">
        <h2 className="text-lg" ref={heading}>
          {recipe.title}
          {recipe.vegetarian && (
            <>
              &nbsp;
              <span className="bg-green-100 text-gre en-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                Vegetarian
              </span>
            </>
          )}
        </h2>
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
          className={`${headingOneLine ?  "mt-5" : "mt-2"} ${
            recipe.favorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-sm text-font-bold py-2 px-3 rounded`}
          disabled={recipe.loading ? "disabled" : ""}
          onClick={() => onToggleFavorite(recipe)}
        >
          {recipe.favorite
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>
      </div>
      <div className="flex-grow-0">
        {recipe.image ? (
          <img
            className="h-32 w-48 rounded-md object-cover drop-shadow-lg"
            src={recipe.image}
          ></img>
        ) : (
          <div className="h-32 w-48 rounded-md bg-slate-200 flex flex-col justify-center text-center text-xs">
            No image available.
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipe;