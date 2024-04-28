import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [open, setOpen] = useState(false);
  const ModalContextValue = {
    open,
    setOpen,
  };
  return (
    <ModalContext.Provider value={ModalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }) {
  const { open, setOpen } = useContext(ModalContext);
  console.log(open);
  return (
    <button
      onClick={() => setOpen((open) => !open)}
      className={`mx-auto mt-4 w-full  rounded-full bg-red-500 p-4 text-center text-xl  uppercase text-white  hover:bg-red-600 active:bg-red-800`}
    >
      {children}
    </button>
  );
}

Modal.Open = Open;

Modal.propTypes = {
  children: PropTypes.any,
};
Open.propTypes = {
  children: PropTypes.any,
};
