"use client"

// used to keep a track on the predictions being made, includes saving them
import { createContext, useReducer, useState } from "react";
import { ReactNode } from "react";

import { updateEntry, savePredictionsAction } from "./PredictionsActions";


interface PredictionsProviderProps {
  children: ReactNode;
}

interface CookiePredictions {
  [key:string]: {
    ["39"]: Predictions
  }
}

interface Predictions {
  [key: string]: {
    home: string;
    away: string;
  }
}

interface PredictionEntry {
  id: string;
  home?: string;
  away?: string;
  score: number;
  date?: string;
}

interface PredictionsContextType {
  predictions: Predictions | null;
  cookiePredictions: CookiePredictions | null;
  fixtures: any[];
  score: number;
  allowSaveChanges: boolean;
  savingInProgress: boolean;
  updatePredictionEntry: (entry: PredictionEntry) => void;
  setFixtures: (fixtures: any[]) => void;
  setCookiePredictions: (predictions: Predictions) => void;
  savePredictions: () => Promise<{ message: string }>;
  setAllowSaveChanges: (value: boolean) => void;
  resetPredictions: () => void;
}

const PredictionsContext = createContext<PredictionsContextType>({
  predictions: null,
  cookiePredictions: null,
  fixtures: [],
  score: 0,
  allowSaveChanges: false,
  savingInProgress: false,
  updatePredictionEntry: (entry: PredictionEntry) => {},
  setFixtures: (fixtures: any[]) => {},
  setCookiePredictions: (predictions: Predictions) => {},
  savePredictions: async () => ({ message: '' }),
  setAllowSaveChanges: (value: boolean) => {},
  resetPredictions: () => {}
});


function predictionsReducer(state: {
  predictions: null;
  cookiePredictions: null;
  fixtures: any[];
  score: number;
  allowSaveChanges: boolean;
  savingInProgress: boolean;
}, action: { type: string; payload: any}) {
  if (action.type === 'UPDATE_ENTRY') {
    return updateEntry(state, action);
  }

  if (action.type === 'SET_FIXTURES') {
    return {  ...state, fixtures: action.payload }
  }

  if (action.type === 'SET_COOKIE_PREDICTIONS') {
    return {  ...state, cookiePredictions: action.payload }
  }

  if (action.type === 'SAVE_PREDICTIONS') {
    // need to update userData from the cookie -- session
    // need to update user predictions in database.
    // return savePredictions(state, action);
  }

  if (action.type === 'SAVING_IN_PROGRESS_START') {
    return { ...state, savingInProgress: true, allowSaveChanges: false }
  }

  if (action.type === 'SAVING_IN_PROGRESS_END') {
    return { ...state, savingInProgress: false }
  }

  if (action.type === 'SET_ALLOW_SAVE_CHANGES') {
    return { ...state, allowSaveChanges: action.payload.allow }
  }

  if (action.type === 'RESET_PREDICTIONS') {
    return { ...state, predictions: null, allowSaveChanges: false }
  }

  return state;
}

const INITIAL_STATE = {
    predictions: null,
    cookiePredictions: null,
    fixtures: [],
    score: 0,
    allowSaveChanges: false,
    savingInProgress: false
};

export function PredictionsContextProvider({ children }: PredictionsProviderProps) {
  const [data, dispatchPredictionsAction] = useReducer(predictionsReducer, INITIAL_STATE);


  function updatePredictionEntry(entry: PredictionEntry) {
    console.log('updatePredictionEntry function in the context');
    // update the payload entry with the original predictions if required.
    dispatchPredictionsAction({ type: 'UPDATE_ENTRY', payload: entry});
  }

  function setFixtures(fixtures: any[]) {
    console.log('about to dispatch an action and fixtures is', fixtures)
    dispatchPredictionsAction({ type: 'SET_FIXTURES', payload: fixtures});
  }

  function setCookiePredictions(predictions: Predictions) {
    dispatchPredictionsAction({ type: 'SET_COOKIE_PREDICTIONS', payload: predictions  });
  }

  async function savePredictions() {
    // check that we can savePredictions, merge predictionCtx.predictions && cookie
    console.log('predictions object');
    console.log(predictionsContext.predictions);
    console.log('predictions object');
    console.log(predictionsContext.cookiePredictions);
/*
    DO THE MERGE TO FILL IN THE GAPS.
    IF USER MAKES 1 CHANGE TO AN EXISTING PREDICTION THEN WE BREAK BECAUSE THEY ARE LEAING AWAY TEAM WITH TEH SAME SCORE.

*/



    dispatchPredictionsAction({ type: 'SAVING_IN_PROGRESS_START', payload: null });
    const result = await savePredictionsAction(predictionsContext.predictions, predictionsContext.fixtures);
    console.log('result is', result);
    dispatchPredictionsAction({ type: 'SAVING_IN_PROGRESS_END', payload: null });
    return result;

    // dispatchPredictionsAction({ type: 'SAVE_PREDICTIONS', payload: null });
  }

  function setAllowSaveChanges(value: boolean) {
    dispatchPredictionsAction({ type: 'SET_ALLOW_SAVE_CHANGES', payload: value });
  }

  function resetPredictions() {
    dispatchPredictionsAction({ type: 'RESET_PREDICTIONS', payload: null });
  }



  const predictionsContext = {
    predictions: data.predictions,
    cookiePredictions: data.cookiePredictions,
    fixtures: data.fixtures,
    score: data.score,
    allowSaveChanges: data.allowSaveChanges,
    savingInProgress: data.savingInProgress,
    setFixtures,
    updatePredictionEntry,
    savePredictions,
    setCookiePredictions,
    setAllowSaveChanges,
    resetPredictions
  };
  return <PredictionsContext.Provider value={predictionsContext}>{ children }</PredictionsContext.Provider>
}

export default PredictionsContext;