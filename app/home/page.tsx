// import * as getMarkersFromRTDB from '../api/getMarkers/route';
import { getMarkersFromRTDB } from '@/lib/getMarkers';
import { cookies } from 'next/headers';
import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';
import { getWaitingForWeekToStart, getUserTotal } from './utils';
import EditName from './EditName/EditName';
import Footer from '../components/ui/Footer';

import classes from './home.module.css'
import Card from './Card/Card';
import CountdownCard from './Countdown/CountDown';
import LeagueTable from './League/LeagueTable';


const Home = async () => {
    console.log('enter Home');
    const compId = 39;
    // get the user data from the cookie, if no userData or sessionData then we redirect back to auth via m
    const cookieStore = await cookies();
    const userCookie: any = cookieStore.get('userData')?.value;


    let userData;


    try {
      userData = JSON.parse(userCookie);
    } catch (error) {
      console.log('Failed to parse userData cookie:', error);
      // return <div>Error loading user data.</div>;
      userData = {
        emailVerified: true,
        email: 'lesterdavison77@gmail.com',
        creationTime: 'Sat, 11 Oct 2025 21:57:16 GMT',
        providerId: 'password',
        displayName: null
      }
    }

    // call api to get maerkers.
    const markers = await getMarkersFromRTDB();

    console.log("markers");
    console.log(markers);
    

    const markerData = markers;
    const weeklyNow = markerData[compId].weekly.now;
    const weeklyPrev = markerData[compId].weekly.prev;


    const now = new Date();
    const { inGameWeek, gamesLeftToPlay, newWeekStart, isGamesToday } = getWaitingForWeekToStart(now, weeklyNow);


    let cardContent
    if (!inGameWeek) {
      // card 1 is prev + card 2 countdown
      const thisUserTotal = 20 // getUserTotal(userData.predictions, weeklyPrev);
      cardContent = <>
      <NavLink href={"/results/" + compId + "/" + weeklyPrev.id} aniType={AniType.FORWARD}>
        <Card id={weeklyPrev.id} 
              low={weeklyPrev.id} 
              user={thisUserTotal} 
              high={weeklyPrev.high}
              link={`/results/${compId}/${weeklyPrev.id}`}
              type="prev"
              ></Card>
      </NavLink>
      <CountdownCard id={weeklyNow.id} expiry={newWeekStart}></CountdownCard>
      
      <NavLink href={"/fixtures/" + compId + "/" + weeklyNow.id} className={classes.button} aniType={AniType.FORWARD}>MAKE PREDICTIONS</NavLink>
      </>;
    } else {
      // card 1 is now + card 2 is nothing, could be wildcards
      // get userscore for this week.

      
      // THIS WORKS BUT ONLY SHOWS TOTALS FROM THE PREVIOUS DAYS ... NOT THE INGAME ONES.
      const thisUserTotal = getUserTotal(userData.predictions, weeklyNow);
      cardContent = <>
        <Card id={weeklyNow.id} 
          low={weeklyNow.low} 
          user={thisUserTotal} 
          high={weeklyNow.high}
          type="now"></Card>
          <div className={classes.viewPredButtonContainer}>
            <NavLink href={"/fixtures/" + compId + "/" + weeklyNow.id} className={classes.button} aniType={AniType.FORWARD}>VIEW PREDICTIONS</NavLink>
          </div>
      </>
    }

    return <>
        <header className={classes.header}>
          <div className={classes.top}>
            <div className={classes.hiTxt}>Hi <EditName name={userData.gameDisplayName}/></div>
            <div>
              <NavLink href="/my-profile" className={classes.myProfileLink}  aniType={AniType.FADE}>My Profile</NavLink>
            </div>
          </div>
          <div className={classes.bottom}>
            <img src="/premier-league.png" />
          </div>
        </header>
        <main className={classes.main}>
        {
          cardContent
        }
          <LeagueTable data={userData.private} weekId={weeklyPrev.id}></LeagueTable>
        </main>
        <Footer></Footer>
    </>
}

export default Home;