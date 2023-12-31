import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onHide, children, className }) => {
  const [transitionClass, setTransitionClass] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style["overflow-y"] = "hidden";
    setTransitionClass(true);
    return () => {
      document.body.style["overflow-y"] = "auto";
    };
  }, []);

  const hideHandler = (e) => {
    if (!e || overlayRef.current.contains(e.target)) {
      setTransitionClass(false);
      setTimeout(onHide, 300);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`flex justify-center absolute left-0 w-screen h-screen max-w-full z-40 transition-opacity duration-300 ${
        transitionClass ? "opacity-100" : "opacity-0"
      }`}
      style={{ top: `${window.scrollY}px` }}
      onClick={hideHandler}
    >
      <div
        ref={overlayRef}
        id="modal-bg"
        className="absolute top-0 left-0 w-full h-full bg-black opacity-75"
      ></div>
      <div
        className={`mx-6 w-full max-w-4xl bg-white drop-shadow-2xl rounded-xl mt-10 overflow-y-auto transition-all duration-300 ${
          transitionClass ? "translate-y-0" : "-translate-y-10"
        } ${className}`}
        style={{ height: "calc(100vh - 5rem)" }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
