// app/api/getMarkers/route.ts
import { NextResponse } from 'next/server';
import { getMarkersFromRTDB } from '@/lib/getMarkers';

export const GET = async () => {
  try {
    console.log('try to get marker');
    const markers = await getMarkersFromRTDB();
    console.log(markers);
    return NextResponse.json({ markers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};