"use client"

import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import classes from './Login.module.css';
import LoginButton from './LoginButton';
import { useRef, useState, useContext } from 'react';
import ModalContext from '@/store/ModalContext';
import { ModalType } from '@/app/utils/types-modal';
import { useRouter } from 'next/navigation';
import { completeSignIn } from '@/app/utils/shared';
import { firebaseApp } from '@/firebase/clientApp';

const initialErrorState: string = ''

export default function SignIn() {
    const inputRef = useRef(null);
    const router = useRouter();
    const [formView, setFormView] = useState('login');
    const [errorState, setErrorState] = useState(initialErrorState);
    const [pending, setPending] = useState(false);
    const modalCtx = useContext(ModalContext);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setPending(true);
            const auth = getAuth(firebaseApp);
            const formData = new FormData(e.currentTarget);
            if (formData) {
                // wait for login tokens
                const USERNAME = formData.get('username') as string;
                const PASSWORD = formData.get('password') as string;
                if (USERNAME && PASSWORD) {
                    const result = await signInWithEmailAndPassword(auth, USERNAME, PASSWORD);
                    console.log('result is ');
                    console.log(result);
                    console.log('result.user.emailVerified is');
                    console.log(result.user.emailVerified);
                    if (result.user.emailVerified === false) {
                        // show modal
                        modalCtx.setModal(ModalType.USER_NOT_VERIFIED);
                        modalCtx.showModal();
                    } else {
                        const token = await result.user.getIdToken();
                        console.log('calling completeSignIn ..result ', result);
                        console.log('calling completeSignIn ..token ', token);
                        console.log('calling completeSignIn ..router ', router);
                        completeSignIn(result, token, router);
                    }
                }
            }

        } catch(error: any) {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            switch (errorCode) {
                case 'auth/invalid-email':
                setErrorState('Invalid email format.');
                break;
                case 'auth/user-not-found':
                setErrorState('No account found under that email address.');
                break;
                case 'auth/wrong-password':
                setErrorState('Incorrect password.');
                break;
                default:
                setErrorState('Something went wrong. Please try again.');
            }
        } finally {
            setPending(false);
        }

    };


    async function forgottenPassword() {
        console.log('forgotten password');
        const EL = inputRef.current as unknown as HTMLInputElement;
        const VALUE = EL.value;
        let forgottenSuccess = true;
        setPending(true);
        try {

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(VALUE)) {
                console.log("send a forgotten password link");
                const auth = getAuth(firebaseApp);
                await sendPasswordResetEmail(auth, VALUE);
            } else {
                throw Error('invalid email address');
            }
        } catch (error: any) {
            forgottenSuccess = false;
            if (error.message.indexOf('auth/user-not-found') > -1) {
                setErrorState('The email address entered is not recognised.');
            } else {
                setErrorState('You have entered an invalid email address.');
            }
        } finally {
            if (forgottenSuccess) {
                modalCtx.setModal(ModalType.FORGOTTEN_PASSWORD);
                modalCtx.showModal();
            }
            setPending(false);
        }
    }

    return  <form className={classes.form} onSubmit={handleSubmit}>
        <p>
            <label htmlFor="username">Email address</label>
            <input ref={inputRef} type="text" id="username" name="username" placeholder="Email address" required />
        </p>
        <p>
            <label htmlFor="email">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required />
            {
                formView === 'login' && <label className={classes.checkbox}>
                <input type='checkbox' id="remember" name="remember" className={classes.checkbox}/>
                <span>Remember me</span>
            </label>
            }
        </p>
        {   errorState && <p className={classes.errorMessage}>{errorState}</p>   }
        <p><input type="submit" value={pending ? "Please wait..." : "Sign in"} className={classes.btn}/></p>
        <p className={classes.forgottenPassword}><span onClick={forgottenPassword}>Forgotten your Password</span></p>

        <div className={classes.authContainer}>
            <span>or</span>
            <LoginButton type="google"></LoginButton>
            <LoginButton type="msn"></LoginButton>
        </div>
    </form>
}