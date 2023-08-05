import { useEffect, useState } from "react";
import { CommentContextProvider } from "@/context/commentContext";
import Modal from "../../UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ColorExtractor } from "react-color-extractor";

import ViewSummary from "./ViewSummary";
import ViewRecipe from "./ViewRecipe";
import ViewIngredients from "./ViewIngredients";
import ViewNutrients from "./nutrients/ViewNutrients";
import ViewComments from "./comments/ViewComments";

import localFont from "next/font/local";
const recipeHeaderFont = localFont({
  src: "../../../assets/fonts/RecipeHeader.otf",
});

const ViewModal = ({ recipe, onHide }) => {
  const tabs = ["Summary", "Recipe", "Ingredients", "Nutrients", "Comments"];
  const [selectedTab, setSelectedTab] = useState(0);
  const [transition, setTransition] = useState(false);
  const [colors, setColors] = useState(null);
  const changeTabHandler = (index) => {
    setTransition(true);
    setTimeout(() => setSelectedTab(index), 150);
    setTimeout(
      () => setTransition(false),
      selectedTab == 0 || index == 0 ? 500 : 150
    );
  };

  useEffect(() => {
    if (recipe && !recipe.image) {
      setColors(Array(["#F00", "#0F0", "#00F", "#FF0", "#F0F", "#0FF"]));
    }
  }, []);
  return (
    <Modal
      onHide={onHide}
      className="flex flex-col max-h-full overflow-y-hidden"
    >
      <div
        className="relative w-full p-3 transition-transform duration-500"
        style={{ transform: selectedTab != 0 ? "translate(0, -12.75rem)" : "" }}
      >
        <div className="absolute -top-1 left-0 right-0 h-52 bg-zinc-200" />
        <div
          className={
            "flex items-center w-full max-w-full h-48 rounded-md overflow-hidden"
          }
        >
          {recipe.image && (
            <ColorExtractor getColors={(colors) => setColors(colors)}>
              <img
                src={recipe.image}
                style={{ minWidth: "130%", minHeight: "130%", margin: "-80px" }}
                className="blur-sm rounded-md brightness-50 h-48 object-cover"
              ></img>
            </ColorExtractor>
          )}

          <h1
            className={`absolute pl-6 pr-9 z-10 text-5xl md:text-6xl line-clamp-3 ${
              recipe.image ? "text-white" : ""
            } ${recipeHeaderFont.className}`}
          >
            {recipe.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 bg-zinc-200 p-3 -m-3 mt-0">
          <button
            className="px-3 py-1 font-semibold rounded-md brightness-95 hover:bg-white"
            onClick={() => document.getElementById("modal-bg").click()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-3 py-1 font-semibold rounded-md brightness-95 hover:bg-white focus:bg-zinc-300 ${
                selectedTab == index ? "bg-zinc-300" : ""
              }`}
              onClick={() => changeTabHandler(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`${transition ? "opacity-0 " : "opacity-100 "}${
          selectedTab != 0 ? "-mt-52 " : " "
        }px-4 md:px-16 py-4 md:py-8 flex-grow overflow-x-auto transition-opacity duration-200 overflow-y-auto`}
      >
        {colors && (
          <>
            {selectedTab == 0 && (
              <ViewSummary recipe={recipe} colors={colors} />
            )}
            {selectedTab == 1 && <ViewRecipe recipe={recipe} colors={colors} />}
            {selectedTab == 2 && (
              <ViewIngredients recipe={recipe} colors={colors} />
            )}
            {selectedTab == 3 && (
              <ViewNutrients recipe={recipe} colors={colors} />
            )}
            {selectedTab == 4 && (
              <CommentContextProvider colors={colors} recipe={recipe} >
                <ViewComments />
              </CommentContextProvider>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewModal;
