import { useState } from "react";

export const useUtil = () => {

  const [show, setShow] = useState<boolean>(false);

  const showActive = () => {
    setShow(true);
  }

  const showInactive = () => {
    setShow(false);
  }

  return {
    show,
    showActive,
    showInactive
  };
};