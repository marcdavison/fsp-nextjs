import NavLink from '@/app/components/ui/NavLink';
import classes from '../layout.module.css';
import { AniType } from '@/app/utils/types';

const Cookie = () => {
    return <>
        <div className={classes.header}>
            <div className={classes.link}><NavLink href="/more" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink></div>
            <h2>Cookie Policy</h2>
            <div className={classes.link}></div>
        </div>
        <div className={classes.middle}>

            <p>This Cookie Policy explains how PredictTheScore uses cookies and similar technologies to recognize you when you use the app or visit website at https://www.predictthescore.co.uk. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

            <h3>What are cookies?</h3>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

            <p>Cookies set by the website owner (in this case, PredictTheScore) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</p>

            <h3>What is LocalStorage</h3>
            <p>LocalStorage is an area on your browser to store meaningful data in JSON format. LocalStorage has no expiry but can be deleted manually by the user or by PredictTheScore itself. PredictTheScore will occasionally store game relevant user data such as upcoming fixtures into the LocalStorage to aid in performance of the app / website.</p>

            <h3>Cookie and LocalStorage usage</h3>
            <p>The following localstorage objects will be placed on the users browser:</p>

            <ul>
            <li>firebase:authUser:XXXX...Current user details including username, email address and if the email address has been verified. No password stored.</li>
                <li>pts_markersDetails of this weeks fixtures available for predictions. Initially retrieved from the Firebase database, stored in LocalStorage to aid with speed and performance.</li>
            </ul>
            <p>The following cookies will be placed on the users browser:</p>

            <ul>
                <li>predict-auth-check Used to ensure that returning users who have chosen for a persistent login are still the expected users.</li>
            </ul>

        </div>
</>
}

export default Cookie;