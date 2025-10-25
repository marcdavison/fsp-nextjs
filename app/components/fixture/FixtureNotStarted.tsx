"use client"

import Team from "./Team";
import TeamEdit from "./TeamEdit";
import classes from './Fixture.module.css'
import { FixtureData, UserPredictions } from '@/app/utils/types';
import { useContext, useRef } from "react";
import PredictionsContext from "@/store/PredictionsContext";
import ModalContext from "@/store/ModalContext";
type FixtureProps = {
  fixture: FixtureData;
  kickoffTime: string;
  isResult: boolean;
  hasKickedOff: boolean;
  enablePredictions: boolean;
  userPredictions: UserPredictions;
  pred: any;
  id?: string;
};


function formatTimeTo12Hr(datetimeString: string) {
  const date = new Date(datetimeString);

  let hours = date.getHours(); // Use getHours() if you want local time
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${paddedMinutes} ${ampm}`;
}

const FixtureNotStarted = ({ fixture, kickoffTime, isResult, hasKickedOff, enablePredictions, userPredictions, pred, id }: FixtureProps) => {
  const predictionsCtx = useContext(PredictionsContext);
  const modalCtx = useContext(ModalContext);
  const dateString = fixture.kickoff.split('T')[0];
  // console.log(predictionsCtx);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('in handleChange and userPredictions is ');
    console.log(userPredictions);
    console.log(predictionsCtx.predictions)
    console.log(event);
    const { name, value } = event.currentTarget;
    // do not update prediction with "" value, wait for actual
    if (name && value) {
      if (name === 'homescore') {
        predictionsCtx.updatePredictionEntry({  id: `${fixture.id}`,  home: value, score: 0, date: dateString })
      } else {
        predictionsCtx.updatePredictionEntry({  id: `${fixture.id}`,  away: value, score: 0, date: dateString })
      }
      console.log('in the handle chang 2', fixture.id);
    }

    // DO THIS HERE AS EMPTY VALUE IS NOT SENT.
    if (value === "") {
      if (predictionsCtx.predictions && Object.keys(predictionsCtx.predictions).length === 1) {
        // set the SAVE PREDICTIONS button to be hidden.. PIN is 2011
        predictionsCtx.setAllowSaveChanges(false);
      }
    }
  }


  /*
    if the value is "" then we cannot save that prediction, need to show an error.


  */


  function checkForAValidSavedPrediction(name: string, value: any) {
    const GAME_EXISTS_IN_STATE = !!(predictionsCtx.predictions && predictionsCtx.predictions[fixture.id]);
    const DATE_STRING = fixture.kickoff.split('T')[0]
    const GAME_EXISTS_IN_COOKIES = !!(predictionsCtx.cookiePredictions && 
    predictionsCtx.cookiePredictions[DATE_STRING] && 
    predictionsCtx.cookiePredictions[DATE_STRING]["39"] &&
    predictionsCtx.cookiePredictions[DATE_STRING]["39"][DATE_STRING]);

    if (!GAME_EXISTS_IN_COOKIES && !GAME_EXISTS_IN_STATE) {
      // first time a value has been entered so no state to consider
      return false;
    }

    // if we are sad
    if (predictionsCtx.allowSaveChanges === false) {
      if (GAME_EXISTS_IN_COOKIES && GAME_EXISTS_IN_STATE) {
        // we are editing a current saved prediction
        return value.length > 0;
      }
    }

    // check to see if we have a value for this game in either cookie or predictionCtx.predictions, may need to update the cookie when saving.



          // check the cookie predictions from our state along with values in cookie predictions to see whether we are showing the save predictions button.


      // if user is deleting but we have new values in predictions then we are showing the button.
      // if there is only 1 game being updated and we deleting a value then we dont show

      // we always want to updatePredictionEntry but its about whether we are allowing savePRedictionsButton

  }

  return <div className={classes.fixtureContainer}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hr(kickoffTime)}</div>
        <div className={classes.teamsRow}>
        { fixture.home && (!userPredictions || !userPredictions[`${fixture.id}`]) && <TeamEdit home={true} teamData={fixture.home} enablePredictions={enablePredictions} isResult={false} inputChange={handleChange}></TeamEdit>}
        { fixture.home && userPredictions && userPredictions[`${fixture.id}`] && <TeamEdit home={true} teamData={fixture.home} enablePredictions={enablePredictions} prediction={userPredictions[`${fixture.id}`]} isResult={false} inputChange={handleChange}></TeamEdit>}
        <div className={classes.predictNotice + '' + classes.notStarted}></div>
        { fixture.away && (!userPredictions || !userPredictions[`${fixture.id}`]) && <TeamEdit home={false} teamData={fixture.away} enablePredictions={enablePredictions}  isResult={false}  inputChange={handleChange}></TeamEdit>}
        { fixture.away && userPredictions && userPredictions[`${fixture.id}`] && <TeamEdit home={false} teamData={fixture.away} enablePredictions={enablePredictions}  prediction={userPredictions[`${fixture.id}`]}  isResult={false} inputChange={handleChange}></TeamEdit>}
      </div>
    </div>
};

export default FixtureNotStarted;