import { useCallback, useEffect, useRef } from "react";

export default function useCloseModal(handlerFunc) {
  const modalRef = useRef(null);
  const closeOnClick = useCallback(
    function (e) {
      if (modalRef.current && !modalRef.current.contains(e.target.value)) {
        handlerFunc();
      }
    },
    [handlerFunc],
  );

  useEffect(() => {
    document.addEventListener("click", closeOnClick, true);
    return document.removeEventListener("click", closeOnClick);
  }, [closeOnClick]);
  return modalRef;
}
