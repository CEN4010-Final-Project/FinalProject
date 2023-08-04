import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const MultiSelect = ({ title, options, onChange }) => {
  const [opened, setOpened] = useState(false);
  const multiSelectRef = useRef(null);
  const buttonRef = useRef(null);

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

  const getNumSelected = () => {
    const num = options.filter((o) => o.selected).length;
    return num ? `(${num})` : "";
  };

  useEffect(() => {
    document.addEventListener("click", focusHandler);
    return () => {
      document.removeEventListener("click", focusHandler);
    };
  }, []);

  return (
    <div
      ref={multiSelectRef}
      className="text-sm tracking-tight relative w-full"
    >
      <button
        ref={buttonRef}
        className="relative z-20 bg-slate-100 rounded-md w-full p-2"
      >
        <div className="flex justify-between">
          <span>
            {title} <span className="text-slate-500">{getNumSelected()}</span>
          </span>
          <FontAwesomeIcon
            icon={opened ? faCaretUp : faCaretDown}
            className="pt-0.5"
          />
        </div>
      </button>
      <div className="absolute z-10 w-full max-h-40 overflow-y-hidden bg-white shadow-lg -translate-y-1 pt-1 rounded-b-lg">
        <div className="max-h-40 overflow-y-scroll">
          {opened &&
            options &&
            options.map((option) => (
              <div
                key={option.name}
                onClick={() => onChange(title, option.name)}
                className="flex justify-between px-3 py-1 hover:bg-slate-50"
              >
                <label>{option.name}</label>
                <input
                  className={option.selected ? "" : "hidden"}
                  type="checkbox"
                  readOnly
                  checked={option.selected ? "checked" : ""}
                  id={`ms-${title}-${option.name}`}
                  name={option.name}
                />
              </div>
            ))}
        </div>    
      </div>
    </div>
  );
};

export default MultiSelect;
