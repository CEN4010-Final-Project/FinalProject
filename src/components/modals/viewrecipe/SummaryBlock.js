import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formattedColor } from "@/helpers/RGBtoHSL";

const SummaryBlock = ({ icon, children, color }) => {
  return (
    <div
      className="rounded-xl p-5 border-2 flex items-stretch"
      style={{
        backgroundColor: formattedColor(color, 90),
        borderColor: formattedColor(color, 80),
      }}
    >
      {icon && (
        <div className="flex flex-col justify-center" style={{color: formattedColor(color, 20)}}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className="flex-grow flex flex-col gap-3 justify-center text-center">{children}</div>
    </div>
  );
};

export default SummaryBlock;
