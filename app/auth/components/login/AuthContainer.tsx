"use client"

import classes from './Login.module.css';
import { useState } from 'react';
import CreateUser from './CreateUser';
import SignIn from './SignIn';


const initialErrorState: string = ''

export default function AuthContainer() {
    const [formView, setFormView] = useState('login');
    const [errorState, setErrorState] = useState(initialErrorState);
    


    function changeView() {
        setFormView(formView === 'create'? 'login' : 'create');
        setErrorState('')
    }

    return <>
        {   formView === 'login' && <><SignIn></SignIn>
        <p className={classes.noAccount}>Do not have an account?<br></br><span onClick={changeView}>Create one here</span></p>
        </>   }
        {   formView === 'create' && <><CreateUser></CreateUser>
        <p className={classes.noAccount}>Already a member?<br></br><span onClick={changeView}>Sign in</span></p>
        </>  }
    </>;
}