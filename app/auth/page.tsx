import classes from './page.module.css';
import AuthContainer from './components/login/AuthContainer';


export default function AuthPage() {    
    return <>
    <div>
        <div className={classes.logo}></div>
        <div className={classes.buttonContainer}>
            <AuthContainer></AuthContainer>
        </div>
    </div>
    </>
}