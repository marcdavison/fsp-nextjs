import { Tilt_Warp } from 'next/font/google';
import { getMarkersFromRTDB } from '@/lib/getMarkers';
import { PredictionsContextProvider } from '@/store/PredictionsContext';
import { cookies } from 'next/headers';
import FixtureGroup from '@/app/components/fixture/FixtureGroup';
import RealtimeFixtureGroup from '@/app/components/fixture/RealtimeFixtureGroup';
import { getWaitingForWeekToStart } from '@/app/home/utils';
import classes from './fixtures.module.css';
import NavLink from '@/app/components/ui/NavLink';
import { AniType, FixtureData } from '@/app/utils/types';
import SavePredictions from '@/app/components/fixture/SavePredictions';

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  weight: "variable"
});

const Fixtures = async () => {

    const compId = 39;
    // get the user data from the cookie, if no userData or sessionData then we redirect back to auth via m
    const cookieStore = await cookies();
    const userCookie: any = cookieStore.get('userData')?.value;

    // check fixtures area of DB ... decide of need realtime fixtures.


    let userData;
    try {
        userData = JSON.parse(userCookie);
    } catch (error) {
        console.error('Failed to parse userData cookie:', error);
        return <div>Error loading user data.</div>;
    }

    console.log('userData is on the fixtures page...');
    console.log(userData);
    // const userPredictions = userData.predictions;
    const userPredictions = {
        '2025-10-25': {
            39: {
                1379052: {
                    away: 3,
                    home: 1
                },
                1379053: {
                    away: 1,
                    home: 1
                }
            }
        }
    }
    console.log('userPredictions is', userPredictions);

    // call api to get maerkers.
    const markers = await getMarkersFromRTDB();

    const now = new Date();
    const TODAY_STRING = now.toISOString().split('T')[0];
    const markerData = markers;
    console.log('markerData');
    console.log(markerData);
    const weeklyNow = markerData[compId].weekly.now;
    const { inGameWeek, gamesLeftToPlay, newWeekStart, isGamesToday } = getWaitingForWeekToStart(now, weeklyNow);
    console.log('in the FIXTURE PAGE');
    console.log(weeklyNow.fixtures);
    console.log(Object.entries(weeklyNow.fixtures).length);
    const ALL_ENTRIES = Object.entries(weeklyNow.fixtures);
    // check for today

    console.log('ALL_ENTRIES before');
    console.log(ALL_ENTRIES);
    let todayIndex = -1;
    if (isGamesToday) {
        const DATE_KEYS = Object.keys(weeklyNow.fixtures);
        todayIndex = DATE_KEYS.indexOf(TODAY_STRING);
    }

    return <PredictionsContextProvider>
                <SavePredictions fixtures={ALL_ENTRIES} originalUserPredictions={userPredictions}></SavePredictions>
                <div className={classes.pageContent}>
                    <div className={classes.header}>
                        <div className={classes.link}><NavLink href="/home" className={classes.backLink} aniType={AniType.BACK}>&lt;</NavLink></div>
                        <h2 className={tiltWarp.className}>FIXTURES</h2>
                        <div className={classes.link}></div>
                    </div>
                    <div className={classes.fixturesContainer}>
                        {
                            ALL_ENTRIES.map(([key, value], index) => {
                                if (index === todayIndex) {
                                    return <RealtimeFixtureGroup key={key} date={key} games={value as { [key:string]: FixtureData}} allowPredictions={true} userPredictions={userPredictions[key] && userPredictions[key]['39'] ? userPredictions[key]['39'] : {}} isResultsPage={false}></RealtimeFixtureGroup>
                                } else {
                                    return <FixtureGroup key={key} date={key} games={value as { [key:string]: FixtureData}} allowPredictions={true} userPredictions={userPredictions[key] && userPredictions[key]['39'] ? userPredictions[key]['39'] : {}} isResultsPage={false}></FixtureGroup>
                                }
                            })
                        }
                    </div>
                </div>
        </PredictionsContextProvider>
}

export default Fixtures;