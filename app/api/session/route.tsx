import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getFirebaseAdmin } from '../../../firebase/admin';

export async function POST(request: NextRequest) {
  try {
    console.log("in the session api...")
    const { token, sessionData } = await request.json();

    console.log("checking on environment values");
    console.log("FIREBASE_ADMIN_ENV:", process.env.FIREBASE_ADMIN_ENV);

    console.log("So ADMIN_CLIENT_EMAIL is going to be :", (process.env.FIREBASE_ADMIN_ENV as any).ADMIN_CLIENT_EMAIL);

    console.log("PARSING So ADMIN_CLIENT_EMAIL is going to be :", JSON.parse(process.env.FIREBASE_ADMIN_ENV as any).ADMIN_CLIENT_EMAIL);

    // check values have been recieved in api
    console.log('in the api and token is ', token);
    console.log('in the api and sessionData is ', sessionData);

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
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5,
    });

    response.cookies.set('userData', JSON.stringify(sessionData), {
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
