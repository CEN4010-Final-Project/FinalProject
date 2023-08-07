import { useEffect, useState } from "react";
import MultiSelect from "../UI/MultiSelect";
import defaultFilters from "../../assets/recipeNameFilterOptions.json";
import { capitalize } from "@/helpers/capitalize";

const GeneralFilter = ({ filterName, onApplyFilters }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(
      defaultFilters[filterName].map((filter) => ({
        name: filter,
        selected: false,
      }))
    );
  }, []);

  const selectHandler = (name) => {
    setFilter((prevFilter) => {
      let newFilter = prevFilter.slice();
      let optionToChange = newFilter.find(
        (option) => option.name == name
      );
      optionToChange.selected = !optionToChange.selected;
      return newFilter;
    });
  };

  const applyFilters = () =>
    onApplyFilters(filter.filter((o) => o.selected).map((o) => o.name));

  return (
    <MultiSelect
      key={filter}
      title={capitalize(filterName)}
      options={filter}
      onChange={selectHandler}
      onClose={applyFilters}
    />
  );
};

export default GeneralFilter;
