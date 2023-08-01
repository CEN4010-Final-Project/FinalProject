import { useState } from "react";
import Modal from "../UI/Modal";
import localFont from "next/font/local";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const recipeHeaderFont = localFont({
  src: "../../assets/fonts/RecipeHeader.otf",
});

const ViewRecipeModalContent = ({ recipe, onHide }) => {
  const tabs = ["Summary", "Recipe", "Ingredients", "Nutrients", "Comments"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <Modal onHide={onHide}>
      <div className="absolute -top-1 left-0 right-0 h-52 bg-zinc-200" />
      <div className="flex items-center w-full max-w-full h-48 rounded-md overflow-hidden">
        <img
          src={recipe.image}
          style={{ minWidth: "130%", minHeight: "130%", margin: "-80px" }}
          className="blur-sm rounded-md brightness-50 h-48 object-cover"
        ></img>
        <h1
          className={`absolute pl-6 pr-9 z-10 text-white text-5xl md:text-6xl line-clamp-3 ${recipeHeaderFont.className}`}
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
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 font-semibold rounded-md brightness-95 hover:bg-white focus:bg-zinc-300 ${
              selectedTab == tab ? "bg-zinc-300" : ""
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ViewRecipeModalContent;
