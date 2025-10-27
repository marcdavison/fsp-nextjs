import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { getAuth } from 'firebase-admin/auth';

export async function POST(req: NextRequest) {
  try {
    const { sessionCookie, leagueName, userDataCookie } = await req.json();
    const uniqueGameId = uuidv4().split('-')[0];
    if (!leagueName) {
      return NextResponse.json({ message: 'Missing league name' }, { status: 400 });
    }

    //  need to generated ID for the game id

    let ownerName = 'Owner';
    let ownerId = '';
    if (sessionCookie && sessionCookie.value) {
      console.log('cookieStore we have so going to try and verify sessionCookie')
      const decoded = await getAuth().verifySessionCookie(sessionCookie.value, true);
      ownerId = decoded.uid;
    }

    if (userDataCookie) {
      ownerName = JSON.parse(userDataCookie.value).gameDisplayName;
    }

    const firebaseFunctionUrl = 'https://us-central1-footy-score-predictor.cloudfunctions.net/createPrivateLeague';

    // cloud function will try to add use to list in firestore and then update RTDB user data
    const CF_createPrivateLeague = await fetch(firebaseFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ownerId, leagueName, ownerName, uniqueGameId }),
    });

    const result = await CF_createPrivateLeague.json();

    console.log('Result of create new league is ');
    console.log(result);

    console.log('uniqueGameId is ');
    console.log(uniqueGameId);

    return NextResponse.json({ status: 200, message: `${result.message}-${uniqueGameId}` || 'Request completed.' });
  } catch (error) {
    console.error('Error calling Firebase function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}