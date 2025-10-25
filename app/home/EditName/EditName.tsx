"use client"
import { useContext } from "react";
// import ModalContext from "@/store/ModalContext";
import { ModalType } from "@/app/utils/types-modal";


const EditName = ({ name }: { name: string}) => {
    // const modalCtx = useContext(ModalContext);
    function editClick() {
        console.log('edit click ..');
        /*
        modalCtx.setModal(ModalType.EDIT_NAME);
        modalCtx.showModal();
        */
    }

    return  <span onClick={editClick}>{ name }</span>
}

export default EditName;