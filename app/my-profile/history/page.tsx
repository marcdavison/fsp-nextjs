import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import classes from '../layout.module.css';

const History = () => {
    return <>
        <div className={classes.header}>
            <div className={classes.link}>
                <NavLink href="/my-profile" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink>
            </div>
            <h2>Game History</h2>
            <div className={classes.link}></div>
        </div>
        <div className={classes.middle}>
            <p>No game history found</p>
        </div>
    </>
}

export default History;