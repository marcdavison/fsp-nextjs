"use client"

// context to trigger the global modal on the webapp, controlled
import { createContext, useReducer, useState } from "react";
import { ReactNode } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextType {
  display: boolean;
  type: string;
  showModal: (data?: any) => void;
  hideModal: () => void;
  setModal: (str: string) => void;
}

const ModalContext = createContext<ModalContextType>({
  display: false,
  type: '',
  showModal: (data?: any) => {},
  hideModal: () => {},
  setModal: () => {},
});

export function ModalContextProvider({ children }: ModalProviderProps) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('');


  function showModal(data?: any) {
    console.log('showing the modal 1');
    setModalShow(true);
  }

  function hideModal() {
    console.log('hiding the modal');
    setModalShow(false);
  }

  function setModal(str: string) {
    setModalType(str);
  }

  const modalCtx = {
    display: modalShow,
    type: modalType,
    showModal,
    hideModal,
    setModal,
  };
  return <ModalContext.Provider value={modalCtx}>{ children }</ModalContext.Provider>
}

export default ModalContext;