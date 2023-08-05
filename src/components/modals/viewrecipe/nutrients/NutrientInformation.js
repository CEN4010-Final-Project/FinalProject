import { formattedColor } from "@/helpers/RGBtoHSL";

const NutrientInformation = ({
  nutrient,
  index,
  barGraphWidths,
  toggleBarGraphs,
  setToggleBarGraphs,
}) => {
  const toggleBarGraphHandler = (index) => {
    setToggleBarGraphs((prevToggle) => {
      let newToggle = prevToggle.slice();
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  };

  const getWidths = (nutrient) =>
    barGraphWidths.find((barGraph) => barGraph.nutrient.name == nutrient.name)
      .widths;

  return (
    <>
      <tr
        className={`border-t-2 hover:bg-slate-50 ${
          toggleBarGraphs[index] && getWidths(nutrient).length
            ? "bg-slate-50"
            : ""
        }`}
        onClick={() => toggleBarGraphHandler(index)}
      >
        <td className="py-2 px-4 font-semibold">{nutrient.name}</td>
        <td className="py-2 px-4">
          {nutrient.amount} {nutrient.unit}
        </td>
        <td className="py-2 px-4">{nutrient.percentOfDailyNeeds}%</td>
      </tr>
      {barGraphWidths &&
      toggleBarGraphs[index] &&
      getWidths(nutrient).length ? (
        <tr>
          <td colSpan="3" className="bg-slate-50">
            <div className="flex gap-0.5 py-2">
              {barGraphWidths
                .find((barGraph) => barGraph.nutrient.name == nutrient.name)
                .widths.map((width, index) => {
                  return (
                    <div
                      key={index}
                      className={`h-8 text-center flex flex-col text-xs justify-center text-white ${
                        index ? " " : "flex-grow rounded-l-lg "
                      }${
                        index == getWidths(nutrient).length - 1
                          ? "rounded-r-lg"
                          : ""
                      }`}
                      title={width.amount > 15 ? "" : width.name}
                      style={{
                        width: index ? width.amount.toString() + "%" : "",
                        backgroundColor: formattedColor(width.color, 45),
                      }}
                    >
                      {width.amount > 15 ? (
                        width.name
                      ) : (
                        <span className="text-xl">&bull;</span>
                      )}
                    </div>
                  );
                })}
            </div>
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
};

export default NutrientInformation;
