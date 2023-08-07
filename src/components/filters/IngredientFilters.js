import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faPlus,
  faMinus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const IngredientFilters = ({ onApplyFilters }) => {
  const [opened, setOpened] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const buttonRef = useRef(null);
  const multiSelectRef = useRef(null);

  const focusHandler = (e) => {
    setOpened((opened) => {
      if (opened) {
        return (
          !(buttonRef && buttonRef.current.contains(e.target)) &&
          multiSelectRef &&
          multiSelectRef.current.contains(e.target)
        );
      } else {
        return multiSelectRef && multiSelectRef.current.contains(e.target);
      }
    });
  };

  const addIngredientHandler = () => {
    if (currentIngredient.length) {
      setIngredients((prevIngredients) => {
        let newIngredients = prevIngredients.slice();
        newIngredients.push(currentIngredient);
        return newIngredients;
      });
      setCurrentIngredient("");
    }
  };

  const removeIngredientHandler = (ingredientToDelete) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.filter((i) => i != ingredientToDelete);
    });
  };

  useEffect(() => {
    document.addEventListener("click", focusHandler, { capture: true });
    return () => {
      document.removeEventListener("click", focusHandler);
    };
  }, []);

  useEffect(() => {
    if (!opened) onApplyFilters(ingredients);
  }, [opened]);
  return (
    <div ref={multiSelectRef} className="relative w-full">
      <button
        ref={buttonRef}
        className={`relative bg-white hover:bg-slate-50 ${
          opened ? "rounded-t-md" : "rounded-md"
        } w-full p-2`}
      >
        <div className="flex justify-between">
          <span>
            Ingredients{" "}
            <span className="text-slate-500">
              {ingredients.length ? `(${ingredients.length})` : ""}
            </span>
          </span>
          <FontAwesomeIcon
            icon={opened ? faCaretUp : faCaretDown}
            className="pt-0.5"
          />
        </div>
      </button>
      {opened && (
        <div className="absolute z-10 w-full max-h-40 overflow-hidden bg-white shadow-lg rounded-b-lg">
          <div className="h-40 overflow-y-scroll">
            <div className="flex flex-nowrap p-2 gap-3 hover:bg-slate-50">
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mt-1.5" />
              </span>
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                className="flex-grow outline-b-2 border-b-2 focus:border-none focus:outline-slate-200 min-w-0 px-1"
              ></input>
              <button onClick={() => addIngredientHandler("t")}>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="bg-green-600 p-1 -mb-1 rounded-md text-white"
                />
              </button>
            </div>
            <div>
              {ingredients.map((ingredient) => (
                <div
                  className="py-1 px-2 hover:bg-slate-50 flex justify-between flex-nowrap"
                  key={ingredient}
                >
                  <span>{ingredient}</span>
                  {/* <button onClick={() => removeIngredientHandler(ingredient)}>
                    <FontAwesomeIcon icon={faPlus} className="bg-red-500 p-1 -mb-1 rounded-md text-white" />
                  </button> */}
                  <button onClick={() => removeIngredientHandler(ingredient)}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="bg-red-600 p-1 -mb-1 rounded-md text-white"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientFilters;
