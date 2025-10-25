"use client"
import classes from './SavePredictions.module.css';
import { useContext, useEffect } from 'react';
import PredictionsContext from '@/store/PredictionsContext';
import ModalContext from '@/store/ModalContext';
import { ModalType } from '@/app/utils/types-modal';

// we've landed on the fixtures page, set the state for fixtures and current predictions
const SavePredictions = ({ fixtures, originalUserPredictions }: { fixtures: any[], originalUserPredictions: any}) => {
    useEffect(() => {
        console.log('in the useEffect and fixtures is ', fixtures);
        predictionCtx.setFixtures(fixtures);
        predictionCtx.setCookiePredictions(originalUserPredictions);
    }, [])
    const predictionCtx = useContext(PredictionsContext);
    const modalCtx = useContext(ModalContext);

    async function savePredictions() {
        console.log('in the save predictions function');
        // before saving predictions check for holes in the data

        const result = await predictionCtx.savePredictions();
        if (result.message === 'UPDATES MADE') {
            console.log("show the modal!!!");
            predictionCtx.resetPredictions();
            modalCtx.setModal(ModalType.PREDICTION_SAVED);
            modalCtx.showModal();
        } else if (result.message === 'INCOMPLETE PREDICTIONS') {
            console.log("show the modal!!!");
            modalCtx.setModal(ModalType.INVALID_PREDICTIONS);
            modalCtx.showModal();
        }
    }
    
    return <>
          { predictionCtx.allowSaveChanges && <button type="button" className={classes.button} onClick={savePredictions}>SAVE PREDICTIONS</button> }
          { predictionCtx.savingInProgress && <button type="button" className={classes.button}>SAVING IN PROGRESS...</button> }
        </>
}

export default SavePredictions;