"use client"

import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/clientApp';

const SignOut = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                console.log('auth.currentUser before ', auth.currentUser);
                if (sessionStorage.getItem('logoutDone') === 'true') return;
                await signOut(auth);
                await fetch('/api/Logout', { method: 'POST' });
                sessionStorage.setItem('logoutDone', 'true');
                router.push('/auth');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logout();
    });

    return <div>
        <p>You are being signed out, please wait.</p>
    </div>
}

export default SignOut;
