import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import classes from '../layout.module.css';

const About = () => {
    return <>
        <div className={classes.header}>
            <div className={classes.link}>
                <NavLink href="/more" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink>
            </div>
            <h2>About</h2>
            <div className={classes.link}></div>
        </div>
        <div className={classes.middle}>
            <p>If you and your friends love nothing more than predicting the results of the weeks fixtures then PredictTheScore is just the right place to find our who really knows the score!</p>
            <p>Play against your friends or just see how you fair each week against all other players, PredictTheScore will show your live points total as the goals fly in for each game.</p>
            <p>We hope you enjoy the game and thank you for playing!</p>
        </div>
    </>
}

export default About;