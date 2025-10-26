import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import classes from '../layout.module.css';

const PrivateLeagues = () => {
    return <>
        <div className={classes.header}>
            <div className={classes.link}>
                <NavLink href="/my-profile" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink>
            </div>
            <h2>Private Leagues</h2>
            <div className={classes.link}></div>
        </div>
        <div className={classes.middle}>
            <p>No private league information</p>
        </div>
    </>
}

export default PrivateLeagues;