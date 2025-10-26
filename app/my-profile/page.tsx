import classes from './layout.module.css';
import classes1 from './MyProfile.module.css'
import NavLink from '../components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import { getAuth } from "firebase/auth";
import { auth } from '@/firebase/clientApp';
import { cookies } from 'next/headers';


const MyProfile = async () => {
    const cookieStore = await cookies();
    const userCookie: any = cookieStore.get('userData')?.value;
    const userDetailsCookie: any = cookieStore.get('pds-userdata')?.value;

    let rtdbUser, authDetails;
    try {
        rtdbUser = JSON.parse(userCookie);
        authDetails = JSON.parse(userDetailsCookie);
    } catch (error) {
        console.error('Failed to parse userData cookie:', error);
        return <div>Error loading user data.</div>;
    }
    return <>

        <div className={classes1.top}>
            <div className={classes.link}><NavLink href="/home" className={classes.link} aniType={AniType.FADE}>DONE</NavLink></div>
            <div className={classes1.welcome}>
                <h2>Hi {rtdbUser.gameDisplayName},
                    <p>Joined: { authDetails.creationTime }</p>
                </h2>
            </div>
        </div>
        <div className={classes1.menuContainer}>
            <ul>
                <li className={classes1.details}><NavLink href="/my-profile/details" className={classes.link} aniType={AniType.FORWARD}>Account details <span>Your profile information</span></NavLink></li>
                <li className={classes1.history}><NavLink href="/my-profile/history" className={classes.link} aniType={AniType.FORWARD}>Game history<span>Your weekly results</span></NavLink></li>
                <li><NavLink href="/my-profile/private-leagues" className={classes.link} aniType={AniType.FORWARD}>Private leagues</NavLink></li>
                <li><NavLink href="/signout" className={classes.link} aniType={AniType.FORWARD}>Logout</NavLink></li>
            </ul>
        </div>
    </>
}

export default MyProfile;