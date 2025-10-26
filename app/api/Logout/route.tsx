import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });

  response.headers.set(
    'Set-Cookie',
    [
      'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict',
      'userData=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict'
    ].join(', ')
  );

  console.log('in the logout api and should have removed the session');
  return response;
}