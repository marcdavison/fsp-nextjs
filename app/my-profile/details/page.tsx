import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import classes from '../layout.module.css';
import pageClasses from './details.module.css';
import { cookies } from 'next/headers';

const Details = async () => {
    const cookieStore = await cookies();
    const userCookie: any = cookieStore.get('userData')?.value;
    const userDetailsCookie: any = cookieStore.get('pds-userdata')?.value;
    const rtdbUser = JSON.parse(userCookie);
    const authDetails = JSON.parse(userDetailsCookie);

    return <>
        <div className={classes.header}>
            <div className={classes.link}>
                <NavLink href="/my-profile" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink>
            </div>
            <h2>My Details</h2>
            <div className={classes.link}></div>
        </div>
        <div className={pageClasses.middle}>
            <ul>
                <li>
                    <p>Registered email<span>{ authDetails.email }</span></p>
                    <p>
                        {
                            authDetails.emailVerified && <span>Verified</span>
                        }
                        {
                            !authDetails.emailVerified && <span>Not Verified</span>
                        }
                    </p>
                </li>
                <li>
                    <p>Email provider<span>{ authDetails.providerId }</span></p>
                </li>
                <li><p>User name<span>{ authDetails.displayName }</span></p>
                </li>
                <li>
                    <p>Display name<span>{ rtdbUser.gameDisplayName }</span></p>
                </li>
            </ul>
        </div>
    </>
}

export default Details;