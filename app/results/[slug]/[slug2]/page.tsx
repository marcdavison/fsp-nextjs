import { getMarkersFromRTDB } from '@/lib/getMarkers';
import NavLink from '@/app/components/ui/NavLink';
import classes from './results.module.css';
import { cookies } from 'next/headers';
import FixtureGroup from '@/app/components/fixture/FixtureGroup';
import { AniType } from '@/app/utils/types';


function getLogoImage(logo: string) {
    const SPLIT = logo.split('/');
    return `http://localhost:3000/team-logos/${SPLIT[SPLIT.length - 1]}`;
}

const Results = async () => {
    const compId = 39;
    // get the user data from the cookie, if no userData or sessionData then we redirect back to auth via m
    const cookieStore = await cookies();
    const userCookie: any = cookieStore.get('userData')?.value;
    

    let userData;
    try {
        userData = JSON.parse(userCookie);
    } catch (error) {
        console.error('Failed to parse userData cookie:', error);
        return <div>Error loading user data.</div>;
    }

    const userPredictions = userData.predictions;

    // call api to get maerkers.
    const markers = await getMarkersFromRTDB();
    

    const markerData = markers;
    const weeklyPrev = markerData[compId].weekly.prev;

    // now convert to expected format.
    console.log("weeklyPrev is");
    console.log(weeklyPrev);
    const newWeeklyPrev = JSON.parse(JSON.stringify(weeklyPrev));
    const weeklyDates = Object.keys(weeklyPrev.fixtures);
    console.log(weeklyDates);
    for (let d = 0; d < weeklyDates.length; d++) {
        const THIS_DATE = weeklyDates[d];
        const GAME_KEYS = Object.keys(newWeeklyPrev.fixtures[THIS_DATE]);
        console.log("GAME_KEYS is", GAME_KEYS);
        for (let g = 0; g < GAME_KEYS.length; g++) {
            const THIS_GAME = weeklyPrev.fixtures[THIS_DATE][GAME_KEYS[g]];
            console.log('THIS_GAME is ... ');
            console.log(THIS_GAME);
            if (THIS_GAME.a) {
                newWeeklyPrev.fixtures[THIS_DATE][GAME_KEYS[g]] = {
                    away: {
                        name: THIS_GAME.a.n,
                        logo: getLogoImage(THIS_GAME.a.l),
                        goals: THIS_GAME.a.g
                    },
                    home: {
                        name: THIS_GAME.h.n,
                        logo: getLogoImage(THIS_GAME.h.l),
                        goals: THIS_GAME.h.g
                    },
                    kickoff: THIS_GAME.k
                }
            }
        }
    }




    console.log("newWeeklyPrev is");
    console.log(newWeeklyPrev);


    return <div className={classes.pageContent}>
        <div className={classes.header}>
            <div className={classes.link}><NavLink href="/home" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink></div>
            <h2>RESULTS</h2>
            <div className={classes.link}></div>
        </div>
        <div className={classes.resultsContainer}>
            {
                    Object.entries(newWeeklyPrev.fixtures).map(([key, value]) => (
                        <FixtureGroup key={key} 
                        date={key} 
                        games={newWeeklyPrev.fixtures[key]}
                        allowPredictions={false}
                        isResultsPage={true}
                        userPredictions={userPredictions[key] && userPredictions[key]['39'] ? userPredictions[key]['39'] : undefined}></FixtureGroup>
                ))

            }
        </div>
    </div>
}

export default Results;