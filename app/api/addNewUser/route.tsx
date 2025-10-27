import { NextRequest, NextResponse } from 'next/server';

const NEW_USER = {
  entries: {
    39: true,
    4: true,
  },
  gameDisplayName: '',
  predictions: false,
  tournaments: false,
  wildcards: false,
  results: false,
  perms: {
    fixtures: true,
    promos: false,
  },
  comms: false,
};

export async function POST(req: NextRequest) {
  try {
    const { UID, EMAIL_ADDRESS } = await req.json();


    const firebaseFunctionUrl = 'https://us-central1-footy-score-predictor.cloudfunctions.net/createNewUser';

    // cloud function will try to add use to list in firestore and then update RTDB user data
    const CF_createNewUser = await fetch(firebaseFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UID, EMAIL_ADDRESS }),
    });

    const result = await CF_createNewUser.json();

    return NextResponse.json({ status: 200, message: result.message || 'Request completed.' });
  } catch (error) {
    console.error('Error calling Firebase function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
