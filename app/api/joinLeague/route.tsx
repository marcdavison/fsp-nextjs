import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';


export async function POST(req: NextRequest) {
  try {
    const { sessionCookie, leagueId } = await req.json();
    if (!leagueId) {
      return NextResponse.json({ message: 'Missing league id' }, { status: 400 });
    }


    let uid = '';
    if (sessionCookie && sessionCookie.value) {
      console.log('cookieStore we have so going to try and verify sessionCookie')
      const decoded = await getAuth().verifySessionCookie(sessionCookie.value, true);
      uid = decoded.uid;
    }

    const firebaseFunctionUrl = 'https://us-central1-footy-score-predictor.cloudfunctions.net/joinPrivateLeague';

    // cloud function will try to add use to list in firestore and then update RTDB user data
    const CF_joinPrivateLeague = await fetch(firebaseFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, leagueId }),
    });

    const result = await CF_joinPrivateLeague.json();

    console.log('about to return from the route and result is ');
    console.log(result);

    return NextResponse.json({ status: result.status, message: result.message || 'Request completed.', data: result.data || null });
  } catch (error) {
    console.error('Error calling Firebase function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


