import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { firebaseApp } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classes from './Login.module.css';
import { completeSignIn } from '../../../utils/shared';

export default function LoginButton({ type }: { type:  string}) {
  const router = useRouter();
  const handleLogin = async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);
      
      // wait for login tokens
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      completeSignIn(result, token, router);
  };

  return <>
    {type === 'google' && <input type="button" onClick={handleLogin} className={classes.google} value="Sign in with Google"/>}
    {type === 'msn' && <input type="button" onClick={handleLogin} className={classes.msn} value="Sign in with MSN"/>}
  </>
}
