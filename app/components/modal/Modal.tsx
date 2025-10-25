"use client"

import { useContext } from "react";
import ModalContext from "@/store/ModalContext";
import { Dialog } from './Dialog';
import { Button } from "./Button";
import classes from './Modal.module.css';
import EditNameContent from "./content/EditNameContent";
import PredictionsConfirmation from "./content/PredictionsSaved";
import InvalidPredictions from "./content/InvalidPredictions";
import WildcardCreate from "./content/WildcardCreate";
import JoinPrivateLeague from "./content/JoinedPrivateLeague";
import ForgottenPassword from "./content/ForgottenPassword";
import CreateUser from "./content/CreateUser";
import VerifyUser from "./content/VerifyUser";
import { ModalType } from "@/app/utils/types-modal";


export default function Modal({ data }: { data?: any }) {


  const modalCtx = useContext(ModalContext);

  function handleClose()  {
    modalCtx.hideModal();
  }

  let content = <></>;

  if (modalCtx.type === ModalType.EDIT_NAME) {
    content = <EditNameContent close={handleClose}></EditNameContent>
  } else if (modalCtx.type === ModalType.PREDICTION_SAVED) {
    content = <PredictionsConfirmation close={handleClose}></PredictionsConfirmation>
  } else if (modalCtx.type === ModalType.WILDCARD_CREATE) {
    content = <WildcardCreate close={handleClose}></WildcardCreate>
  } else if (modalCtx.type === ModalType.INVALID_PREDICTIONS) {
    console.log('setting to invalid')
    content = <InvalidPredictions close={handleClose}></InvalidPredictions>
  } else if (modalCtx.type === ModalType.JOINED_PRIVATE_LEAGUE) {
    content = <JoinPrivateLeague close={handleClose} data={data}></JoinPrivateLeague>
  } else if (modalCtx.type === ModalType.FORGOTTEN_PASSWORD) {
    content = <ForgottenPassword close={handleClose}></ForgottenPassword>
  } else if (modalCtx.type === ModalType.NEW_ACCOUNT) {
    content =  <CreateUser close={handleClose}></CreateUser>
  } else if (modalCtx.type === ModalType.USER_NOT_VERIFIED) {
    content =  <VerifyUser close={handleClose}></VerifyUser>
  }

  if (content === <></>) {
    return;
  }

  return <Dialog className={classes.modal} open={modalCtx.display === true} onClose={handleClose}>
    <>
      { content }
    </>
  </Dialog>
}