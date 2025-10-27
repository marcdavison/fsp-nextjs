"use server";

import { cookies } from 'next/headers';


async function getSessionCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  const userData = cookieStore.get('userData');
  return {
    sessionCookie,
    userData
  };
}

// 2 functions to be ran on the server each of which will call API method that inturn will call cloud function
export async function createSubmit(prevState: StateType, formData: FormData): Promise<StateType> {
  const value = formData.get('create');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // need to pass the sessionCookie as this can't be picked up from API route if called from server
  const cookieValues = await getSessionCookie();
  const sessionCookie = cookieValues.sessionCookie;

  // this is used to get GAMEDISPLAYNAME
  const userDataCookie = cookieValues.userData;

  // uid is gathered in the api route.tsx
  const response = await fetch(`${baseUrl}/api/createNewLeague`, {
    method: 'POST',
    body: JSON.stringify({ sessionCookie, leagueName: value, userDataCookie }),
    headers: {
      'Content-Type': 'application/json',
    },
  });


  const result = await response.json();

  console.log('result in the form action is ...');
  console.log(result);
  // may need to check on the result and if success then update local session cookie with details, 
  return result;
};

type StateType = { message: string, data: any };

export async function joinSubmit(prevState: StateType, formData: FormData): Promise<StateType> {
  const value = formData.get('join');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // need to pass the sessionCookie as this can't be picked up from API route if called from server
  const cookieValues = await getSessionCookie();
  const sessionCookie = cookieValues.sessionCookie;

  // uid is gathered in the api route.tsx
  const response = await fetch(`${baseUrl}/api/joinLeague`, {
    method: 'POST',
    body: JSON.stringify({ sessionCookie, leagueId: value }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log('result is ');
  console.log(result);
  // may need to check on the result and if success then update local session cookie with details, 
  return result;
};