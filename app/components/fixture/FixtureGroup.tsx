import { Tilt_Warp } from 'next/font/google';
import { headers } from "next/headers";
import classes from './Fixture.module.css';
import { Fixtures, FixtureData, UserPredictions, FixtureDataMin, FixturesMin } from '@/app/utils/types';
import PointsCalculation from "@/lib/pointsCalculations";

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  weight: "variable"
});

import Fixture from "./Fixture";
import FixtureNotStarted from './FixtureNotStarted';
import FixtureComplete from './FixtureComplete';

function convertDate(dateString: string) {
    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;

}

function sortGamesByDate(games: Fixtures | FixturesMin, hostname: string, protocol: string) {
  const VALUES = Object.values(games);
  const ENTRIES = Object.entries(games);

  // check for the format of the games
  const FIRST_GAME = VALUES[0];
  const CONVERT_FROM_MIN = !!FIRST_GAME.a;

  for (let g = 0; g < ENTRIES.length; g++) {
    if (CONVERT_FROM_MIN) {
      const NEW_VALUE = {
        id: Number(ENTRIES[g][0]),
        home: {
          name: VALUES[g].h.n,
          logo: `/team-logos/${VALUES[g].h.l.split('/teams/')[1]}`,
          goals: VALUES[g].h.g
        },
        away: {
          name: VALUES[g].a.n,
          logo: `/team-logos/${VALUES[g].a.l.split('/teams/')[1]}`,
          goals: VALUES[g].a.g
        },
        kickoff: VALUES[g].k
      };
      VALUES[g] = NEW_VALUE;
    }

    VALUES[g].id = Number(ENTRIES[g][0]);
    const HOME_TEAM_LOGO = VALUES[g].home.logo;
    const AWAY_TEAM_LOGO = VALUES[g].away.logo;
    if (HOME_TEAM_LOGO.indexOf('.io/football/teams/') > -1) {
      VALUES[g].home.logo = `/team-logos/${HOME_TEAM_LOGO.split('/teams/')[1]}`;
      VALUES[g].away.logo = `/team-logos/${AWAY_TEAM_LOGO.split('/teams/')[1]}`;
    }
  }

  VALUES.sort((a: FixtureData, b: FixtureData) => {
    const dateA = new Date(a.kickoff);
    const dateB = new Date(b.kickoff);
    return dateA.getTime() - dateB.getTime();
  });
  console.log("ABOUT TO RETURN THE VALUES");
  console.log(VALUES);
  return VALUES;
}

const FixtureGroup = async ({ date, games, allowPredictions, userPredictions, isResultsPage }: { date: string;  games: {  [key: string]: FixtureData}; allowPredictions: boolean; userPredictions: UserPredictions; isResultsPage: boolean}) => {
  const headerList = await headers();
  const hostname = headerList.get("x-current-host");
  const protocol = headerList.get("x-current-protocol");
  const calculator = new PointsCalculation();
  console.log('Fixture Group...');
  console.log(games);

  // check for format and convert if require.

  const THESE_PREDICTIONS = userPredictions || {};
  let fixtureJsx;
  // console.log('fixture group and games is ');
  // console.log(games);
  // check to see if today is less that fixture group date.
  const now = new Date();
  const fixtureDate = new Date(date);
  const futureFixtures = now.getTime() < fixtureDate.getTime();

  // sort the fixtures by kickoff
  const SORTED_GAMES = sortGamesByDate(games, hostname as string, protocol as string);

  if (isResultsPage) {
    return  <div className={classes.fixtureGroup}>
      <h3 className={tiltWarp.className}>{convertDate(date)}</h3>
        {
                    SORTED_GAMES.map((fixture) => (

            <div key={fixture.id + "-container"}>
              <Fixture
          key={fixture.id}
          id={fixture.id}
          fixture={fixture}
          kickoffTime={fixture.kickoff}
          hasKickedOff={true}
          isResult={true}
          enablePredictions={false}
          userPredictions={userPredictions}
          />
            </div>
          ))
        }
      </div>
  } else {
    fixtureJsx = <div className={classes.fixtureGroup}>
        <h3 className={tiltWarp.className}>{convertDate(date)}</h3>
            {SORTED_GAMES.map((fixture) => (

              <div key={fixture.id}>
                {
                  futureFixtures && <FixtureNotStarted
            key={fixture.id}
            id={fixture.id}
            fixture={fixture}
            kickoffTime={fixture.kickoff}
            hasKickedOff={false}
            isResult={false}
            enablePredictions={futureFixtures}
            userPredictions={userPredictions}
            pred={THESE_PREDICTIONS[fixture.id]}
            />
                }


                {

                  !futureFixtures && <FixtureComplete
            key={fixture.id}
            fixture={fixture}
            kickoffTime={fixture.kickoff}
            calc={calculator}
            pred={THESE_PREDICTIONS[fixture.id]}
            />
                }

              </div>            
            

        ))}
        </div>
  }

  return fixtureJsx
}



export default FixtureGroup;