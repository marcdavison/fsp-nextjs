export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server';
import { Auth, getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
// import { firebaseDB, firebaseAdminApp } from '../../../firebase/admin';
import { getFirebaseAdmin } from '../../../firebase/admin';
import { Database } from 'firebase-admin/database';

interface PredictionEntry { [key: string]: { id:string; dateString: string; home: string; away: string  }}

/*
interface PredictionEntry {
  id: string;
  home?: string;
  away?: string;
  score: number;
  kickoff?: string;
}
*/
function getDatesPredictedOn(predictions: {
  [key: string]: {
    home: number;
    away: number;
    dateString?: string;
  }
}, fixtures: string[][]) {
  const predKeys = Object.keys(predictions);
  console.log('predKeys are ', predKeys);
  const cloned = { ...predictions };
  const ARR: string[] = [];
  console.log('start');
  for (let id of predKeys) {
    console.log('checking this prediction id', id);
    const fixturesOfDate = fixtures.filter((values) => {
      const dateString = values[0];
      console.log('checking this dateString ', dateString);
      const gameIdsFromDate = Object.keys(values[1]);
      if (gameIdsFromDate.indexOf(id) > -1) {
        console.log("game found")
        return true;
      }
      console.log("game not found")
      return false;
    });
    if (fixturesOfDate.length > 0) {
      console.log(fixturesOfDate, ' fixtuersOfDate');
      const thisDate = fixturesOfDate[0][0];
      console.log("thisDate is ", thisDate);
      cloned[id].dateString = thisDate;
      if (thisDate && predKeys.indexOf(thisDate) === -1 && ARR.indexOf(thisDate) === -1) {
        ARR.push(thisDate);
      }
    }
  }
  console.log('finished // may not need the dates');
  console.log('ARR IS ');
  console.log(ARR);

  console.log('clonedPredictions IS ');
  console.log(cloned);
  return {
    thisPredictionDates: ARR,
    clonedPredictions: cloned,
  }
}

// Function to return an object of the predictions only for a given date
function getPredictionsForGivenDate(dateString: any, predictionsWithDate: PredictionEntry, realtimePredictions: any) {
  let mergedPredictions;
  // console.log('realtimePRedictions are ...');
  // console.log(realtimePredictions);
  // console.log(dateString, ' is dateString');
  for (let p of Object.entries(predictionsWithDate)) {
    // console.log('in the loop .... ');
    console.log('p[1] is ');
    console.log(p[1]);
    // does the date match with what we are looking for
    if (p[1].dateString === dateString) {
      // check and assign if we have a realtime database value for this game
      let rtHome, rtAway;
      if (realtimePredictions && realtimePredictions[dateString] && realtimePredictions[dateString]["39"] && realtimePredictions[dateString]["39"][p[0]]) {
        console.log('YES WE HAVE THIS GAME IN REALTIME TO MERGE')
        rtHome = realtimePredictions[dateString]["39"][p[0]].home || null;
        rtAway = realtimePredictions[dateString]["39"][p[0]].away || null;
      }

      if (!mergedPredictions) {
        mergedPredictions = {
          [p[0]]: {
            home: !!p[1].home ? Number(p[1].home) : rtHome,
            away: !!p[1].away ? Number(p[1].away) : rtAway,
          }
        };
      } else {
        mergedPredictions[p[0]] = {
          home: !!p[1].home ? Number(p[1].home) : rtHome,
          away: !!p[1].away ? Number(p[1].away) : rtAway
        };
      }
    }
  }
  // console.log('mergedPredictions is ...');
  // console.log(mergedPredictions);

  return mergedPredictions;
}

async function getRealtimePredictions(sessionCookieValue: string, fb: Database, auth: Auth) {
      const decoded = await auth.verifySessionCookie(sessionCookieValue, true);
      const uid = decoded.uid;
      const PREDICTION_PATH = `/users/${uid}/predictions`;
      const snapshot = await fb.ref(PREDICTION_PATH).once('value');
      return {
        uid,
        rtPredictionData: snapshot.val()
      };
}

async function updateRealtime(path: string, data: any, fb: Database) {
      // using update so will not set all of the information within the path
      console.log('IN THE UPDATEREALTIME .... ');
      const result = await fb.ref(path).update(data);
      return result;
}



export async function POST(req: NextRequest) {
  const { predictions, fixtures } = await req.json();
  const { firebaseAuth, firebaseDB } = getFirebaseAdmin();
  // nned to make sure we are updating the cookie and data in the RTDB

  try {
    const cookieStore = await cookies();
    const userDataCookie = cookieStore.get('userData');
    const sessionCookie = cookieStore.get('session');
    console.log("cookieStore is ");
    console.log(cookieStore);
    console.log("sessionCookie is ...")
    console.log(sessionCookie);

    if (userDataCookie && sessionCookie) {
      // rtdb data
      const { uid, rtPredictionData } = await getRealtimePredictions(sessionCookie.value, firebaseDB, firebaseAuth);
      let newRtPredictionData;


      // prep date for consumption and fill in games if necessary from RTDB
      const { thisPredictionDates, clonedPredictions } = getDatesPredictedOn(predictions, fixtures);

      // cookie data
      const USER_DATA_JSON = JSON.parse(userDataCookie.value);
      let cookiePredictions = USER_DATA_JSON.predictions;
      if (!cookiePredictions && !rtPredictionData) {
        // no predictions before
        const CURRENT_PRED_DATES: string[] = [];
        cookiePredictions = {};
        for (let d of thisPredictionDates) {
          const thesePredictions = getPredictionsForGivenDate(d, predictions, rtPredictionData);

          console.log("thesePredictions are ", thesePredictions);
          if (CURRENT_PRED_DATES.indexOf(d) === -1) {
            // we have not made prediction on this date so create
            cookiePredictions[d] = {
              ['39']: { ...thesePredictions }
            }

            // add to rt data
            if (newRtPredictionData === undefined) {
              newRtPredictionData = {
                [d]: {
                  ['39']: { ...thesePredictions }
                }
              }
            } else {
              newRtPredictionData[d] = {
                ['39']: { ...thesePredictions }
              }
            }
          } else {
            // we have predictions on this date so just append
            cookiePredictions[d]["39"] = { ...cookiePredictions[d]["39"], ...thesePredictions};


            // add to rt data
            if (newRtPredictionData === undefined) {
              newRtPredictionData = {
                [d]: {
                  ['39']: { ...rtPredictionData[d]["39"], ...thesePredictions }
                }
              }
            } else {
              newRtPredictionData[d] = {
                ["39"]: { ...rtPredictionData[d]["39"], ...thesePredictions}
              }
            }
          }
        }


        /// copied from below could be moved to its own function maybe

        USER_DATA_JSON.predictions = cookiePredictions;
        // check for invalid entries.
        let valid = true;
        if (newRtPredictionData) {
          const DATES_OF_PREDICTIONS = Object.values(newRtPredictionData);
          for (let d of DATES_OF_PREDICTIONS) {
            const THESE_GAMES: {
              home?: number;
              away?: number;x
            }[] = Object.values((d as any)["39"]);
            for (let g of THESE_GAMES) {
              if (g.home === undefined || g.away === undefined) {
                valid = false;
              }
            }
          }
        }

        if (!valid) {
          const response = {
            success: false,
            message: 'INCOMPLETE PREDICTIONS',
          };
          return NextResponse.json(response, {
            status: 200
          })
        }



        cookieStore.set('userData', JSON.stringify(USER_DATA_JSON), {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });

        const PREDICTION_PATH = `/users/${uid}/predictions`;
        console.log("PREDICTION_PATH IS", PREDICTION_PATH);
        console.log(newRtPredictionData);
        await updateRealtime(PREDICTION_PATH, newRtPredictionData, firebaseDB);
        
      } else {
        // treat RTDB as master
        const CURRENT_PRED_DATES = Object.keys(cookiePredictions);
        // loop over the dates we have just predicted on.
        for (let d of thisPredictionDates) {
          const thesePredictions = getPredictionsForGivenDate(d, predictions, rtPredictionData);
          if (CURRENT_PRED_DATES.indexOf(d) === -1) {
            // we have not made prediction on this date so create
            cookiePredictions[d] = {
              ['39']: { ...thesePredictions }
            }

            // add to rt data
            if (newRtPredictionData === undefined) {
              newRtPredictionData = {
                [d]: {
                  ['39']: { ...thesePredictions }
                }
              }
            } else {
              newRtPredictionData[d] = {
                ['39']: { ...thesePredictions }
              }
            }
          } else {
            // we have predictions on this date so just append
            cookiePredictions[d]["39"] = { ...cookiePredictions[d]["39"], ...thesePredictions};


            // add to rt data
            if (newRtPredictionData === undefined) {
              newRtPredictionData = {
                [d]: {
                  ['39']: { ...rtPredictionData[d]["39"], ...thesePredictions }
                }
              }
            } else {
              newRtPredictionData[d] = {
                ["39"]: { ...rtPredictionData[d]["39"], ...thesePredictions}
              }
            }
          }
        }

        USER_DATA_JSON.predictions = cookiePredictions;
        // check for invalid entries.
        let valid = true;
        if (newRtPredictionData) {
          const DATES_OF_PREDICTIONS = Object.values(newRtPredictionData);
          for (let d of DATES_OF_PREDICTIONS) {
            const THESE_GAMES: {
              home?: number;
              away?: number;
            }[] = Object.values((d as any)["39"]);
            for (let g of THESE_GAMES) {
              if (g.home === undefined || g.away === undefined) {
                valid = false;
              }
            }
          }
        }

        if (!valid) {
          const response = {
            success: false,
            message: 'INCOMPLETE PREDICTIONS',
          };
          return NextResponse.json(response, {
            status: 200
          })
        }



        cookieStore.set('userData', JSON.stringify(USER_DATA_JSON), {
          httpOnly: true,
          secure: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });

        const PREDICTION_PATH = `/users/${uid}/predictions`;
        console.log("PREDICTION_PATH IS", PREDICTION_PATH);
        console.log(newRtPredictionData);
        await updateRealtime(PREDICTION_PATH, newRtPredictionData, firebaseDB);

        // WHEN STATE HAS BEEN SAVED WE SHOULD RESET WHAT THE COOKIES IS BUT ALSO CLEAR THE STATE SO WE KNOW IF TO SHOW THE BUTTON CORRECTLY
        
      }
    }

  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ error: 'ERROR SAVING PREDICTIONS' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'UPDATES MADE' });
  return response;
}


