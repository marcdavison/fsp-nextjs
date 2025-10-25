'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientComponent() {
  const router = useRouter();


  function sendCorrect() {
    const value = 'correct-value';
    fetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({ value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log('cookie stored .. ');
          router.push('/dashboard'); // ✅ This triggers a GET request
        } else {
          console.error('Failed to store cookie');
        }
      })
      .catch((err) => {
        console.error('Error posting to API:', err);
      });


  }

  function sendIncorrect() {
    const value = 'incorrect-value';
    fetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({ value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log('cookie stored .. ');
          router.push('/dashboard'); // ✅ This triggers a GET request
        } else {
          console.error('Failed to store cookie');
        }
      })
      .catch((err) => {
        console.error('Error posting to API:', err);
      });

  }


  async function getMarkers() {
    // call api to get markers.
    const markers  = await fetch('/api/getMarkers');
    const markerData = await markers.json();
    console.log(markerData);
  }

  return <div>
    <p>Click a value to send to the api</p>
    <p><input type="button" onClick={sendCorrect} value="Correct" /></p>
    <p><input type="button" onClick={sendIncorrect}  value="Incorrect" /></p>

    <p><input type="button" onClick={getMarkers}  value="Get the Markers" /></p>
  </div>;
}
