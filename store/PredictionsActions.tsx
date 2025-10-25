
interface PredictionEntry {
  id: string;
  home?: number;
  away?: number;
  score: number;
  dateString: string;
}

interface Action {
    type: string;
    payload: any;
}

/*

.. mapping solution
const actionHandlers = {
  LOGIN: actions.handleLogin,
  LOGOUT: actions.handleLogout,
};

export const reducer = (state, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

*/

export const updateEntry = (state, action: Action) => {
    const LOCATION = Object.keys(action.payload).includes('home') ? 'home' : 'away';
    const ID = action.payload.id;
    console.log('reducer hit');
    // get existing entry if there.
    const cookiePredictionsForThisDate = state.cookiePredictions[action.payload.date];
    if (!state.predictions) {
      // create the prediction object
      let updateValue = false;
      // check state.cookiePredictions to see if we can set updateValue to true;
      if (cookiePredictionsForThisDate && cookiePredictionsForThisDate["39"][ID]) {
        // we have a prediction in cookies for this entry so its an update
        updateValue = true;
      }
      // NOTE THIS DOES NOT RESOLVE THE ISSUE OF ONLY ENTEREING 1 VALUE AND THEN CLICKING SAVE AS THE PREDICTION WILL ONLY CONTAIN THE NEW VALUE
      // WHICH COULD BE HOME AND THEN MEANS AWAY ISNT TAKEN INTO ACCOUNT.
      if (LOCATION === 'home') {
        return {  ...state, predictions: {  [ID]: {  home: action.payload.home, dateString: action.payload.dateString }}, allowSaveChanges: updateValue }
      } else {
        return {  ...state, predictions: {  [ID]: {  away: action.payload.away, dateString: action.payload.dateString }}, allowSaveChanges: updateValue }
      }
    } else {
      // update the prediction object
      const ALL_PREDICTIONS = JSON.parse(JSON.stringify(state.predictions));
      const prediction = state.predictions[`${ID}`] ? state.predictions[`${ID}`] as PredictionEntry : null;
      const cloned = prediction ? { ...prediction } : null;
      // check for this prediction
      if (!cloned) {
        // new
        ALL_PREDICTIONS[ID] = {
          [LOCATION]: action.payload[LOCATION]
        }
      } else {
        // update
        ALL_PREDICTIONS[ID][LOCATION] = action.payload[LOCATION];
      }
      return {  ...state, predictions: ALL_PREDICTIONS, allowSaveChanges: true }
    }
}

export const setFixtures = (state, action: Action) => {
    return {  ...state, fixtures: action.payload }
}


export const savePredictionsAction = async (predictions, fixtures) => {
  console.log("console.log savePredictionsAction");

  const response = await fetch('/api/updatePredictions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ predictions, fixtures }),
  });

  const r = await response.json();
  return r;
};

/*
savePredictionsAction

*/