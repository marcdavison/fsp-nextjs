"use client"

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css';
import { useState, useContext } from 'react';
import ModalContext from '@/store/ModalContext';
import { ModalType } from '@/app/utils/types-modal';
import { firebaseApp } from '@/firebase/clientApp';

const initialErrorState: string = ''


export default function CreateUser() {
    const [formView, setFormView] = useState('login');
    const [errorState, setErrorState] = useState(initialErrorState);
    const [pending, setPending] = useState(false);
    const modalCtx = useContext(ModalContext);

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setPending(true);
            const auth = getAuth(firebaseApp);
            const formData = new FormData(e.currentTarget);
            if (formData) {
                // wait for login tokens
                const EMAIL_ADDRESS = formData.get('username') as string;
                const PASSWORD = formData.get('password') as string;
                if (EMAIL_ADDRESS && PASSWORD) {
                    const result = await createUserWithEmailAndPassword(auth, EMAIL_ADDRESS, PASSWORD)
                    console.log('result is ');
                    console.log(result);
                    if (result && result.user) {

                      const UID = result.user.uid;

                      // need to make the user object.
                      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                      const response = await fetch(`${baseUrl}/api/addNewUser`, {
                          method: 'POST',
                          body: JSON.stringify({UID, EMAIL_ADDRESS }),
                          headers: {
                              'Content-Type': 'application/json',
                          },
                      });

                      const userObResult = await response.json();
                      console.log(userObResult);
                      modalCtx.setModal(ModalType.NEW_ACCOUNT);
                      modalCtx.showModal();

                    }
                }
                // const token = await result.user.getIdToken();
                //  completeSignIn(result, token, router);
            }

        } catch(error: any) {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            switch (errorCode) {
                case 'auth/invalid-email':
                setErrorState('Invalid email format.');
                break;
                case 'auth/email-already-in-use':
                setErrorState('Email address is already in use.');
                break;
                default:
                setErrorState('Something went wrong. Please try again.');
            }
        } finally {
            setPending(false);
        }

    };


    return <form className={classes.form} onSubmit={handleCreateSubmit}>
        <p>
            <label htmlFor="username">Email address</label>
            <input type="text" id="username" name="username" placeholder="Email address" required />
        </p>
        <p>
            <label htmlFor="email">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required />
        </p>
        {   errorState && <p className={classes.errorMessage}>{errorState}</p>   }
        <p><input type="submit" value={pending ? "Please wait..." : "Create Account"} className={classes.btn}/></p>
    </form>
}