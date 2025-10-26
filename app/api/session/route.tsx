import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getFirebaseAdmin } from '../../../firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const { token, sessionData } = await request.json();
    const { firebaseAuth, firebaseDB } = getFirebaseAdmin();
    // verify token with firebase admin
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    if (!uid) return NextResponse.json({ error: 'Invalid UID' }, { status: 401 });


    // set session cookies



    const sessionCookie = await firebaseAuth.createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 1000,
    });

    console.log('sessionCookie is ', sessionCookie);


    const response = NextResponse.json({ success: true });



    response.cookies.set('pds-userdata', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 5,
    });


    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5,
    });



    // get user data from Realtime Database
    const snapshot = await firebaseDB.ref(`/users/${uid}`).once('value');
    const userData = snapshot.val();

    // check on predictions.
    if (userData.predictions) {
      // update predictions in the cookie, only for those within the last week.
      const LAST_WEEK = new Date();
      LAST_WEEK.setDate(LAST_WEEK.getDate() - 7);
      const clonedPredictions = { ...userData.predictions };
      console.log('BEFORE CLONED[REDICTIONS IS ');
      console.log(clonedPredictions);
      const numberPredictedDates = Object.keys(userData.predictions);
      console.log('KEYS LENGTH BEFORE');
      console.log(Object.keys(userData.predictions).length);
      for (let dateString of numberPredictedDates) {
        console.log('dateString', dateString);
        const date = new Date(dateString);
        if (date < LAST_WEEK) {
          delete clonedPredictions[dateString];
        }
      }
      console.log('AFTER CLONED[REDICTIONS IS ');
      console.log(clonedPredictions);
      userData.predictions = clonedPredictions;
      console.log('KEYS LENGTH AFTER');
      console.log(Object.keys(userData.predictions).length);
    }

    response.cookies.set('userData', JSON.stringify(userData), {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5,
    });

    return response;
  } catch (err) {
    console.log('Session error:', err);
    return NextResponse.json({ error: 'Session creation failed' }, { status: 500 });
  }
}
