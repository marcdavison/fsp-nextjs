import classes from './page.module.css'
import NavLink from './components/ui/NavLink';
import { AniType } from './utils/types';

const Welcome = () => {
    // check for user .. if yes tehn redirect to the home
    return <div>
        <img src="/logo.svg" className={classes.homeLogo}/>
        <div className={classes.buttonContainer }>
            <p>Welcome to Predict The Score where you can pit your wits at predicting the unpredictable results of this seasons EPL.</p>
            <p>Join your friends in your own private league or play solo and try to finish in on top!</p>
            <NavLink href={"/auth"} className={classes.button} aniType={AniType.FADE}>JOIN NOW!</NavLink>
        </div>
    </div>
}

export default Welcome;