"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom"

interface DialogProps {
    children: ReactNode;
    open: boolean;
    className: string;
    onClose?: () => void;
    data?: any;
}

export function Dialog({ children   , open, className = '', onClose, data }: DialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  // use effect will run each time the value of open changes.
  useEffect(() => {
    console.log('component mounted: ', document.getElementById('modal'));
    setModalRoot(document.getElementById('modal'));
  }, []);

  useEffect(() => {
    console.log('open has changed');
    const modal = dialog.current;
    if (open && modal) {
      console.log('calling showModal .. no data tho');
      modal.showModal();
    }

    return () => {
        if (modal?.open) modal.close();   
    }
  }, [open]);

    if (!modalRoot) return null;
    return createPortal(<dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
        {children}
    </dialog>,
    modalRoot
    );
}