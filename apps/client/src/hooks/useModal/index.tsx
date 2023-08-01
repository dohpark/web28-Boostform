import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalPortalProps from "./type";

const useModal = (option?: { setBackgroundClickClose: boolean }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [windowOffsetY, setWindowOffsetY] = useState(0);

  useEffect(() => {
    if (modalOpen) document.body.setAttribute("style", `position: fixed; top: ${windowOffsetY}px; left: 0; right: 0;`);
    else {
      document.body.setAttribute("style", "");
      window.scrollTo(0, -windowOffsetY);
    }
  }, [windowOffsetY, modalOpen]);

  const openModal = () => {
    setModalOpen(true);
    setWindowOffsetY(-window.scrollY);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickBackgroundCloseModal = () => {
    if (option && !option.setBackgroundClickClose) setModalOpen(false);
    if (!option) setModalOpen(false);
  };

  function ModalPortal({ children }: ModalPortalProps) {
    if (modalOpen)
      return createPortal(
        <div className="w-full h-full fixed top-0 left-0 z-10 m-0">
          {children}
          <div className="absolute w-full h-full bg-black bg-opacity-75" onClick={onClickBackgroundCloseModal} />
        </div>,
        document.getElementById("modal-root") as HTMLElement
      );
    return null;
  }

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
