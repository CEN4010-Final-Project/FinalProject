import Modal from "@/components/UI/Modal";

const SelectIngredients = ({ onHide, ingredients, setIngredients }) => {

  return (
  <Modal
    className="flex flex-col max-h-[30rem] max-w-xl overflow-y-hidden p-4"
    onHide={onHide}
  >
    <h1 className="font-semibold text-2xl tracking-tight">Select Ingredients</h1>
  </Modal>
  );
  
};

export default SelectIngredients;
