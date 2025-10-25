"use client"

import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "@/firebase/clientApp";
import { firebaseApp } from '@/firebase/clientApp';
import { useEffect, useState } from "react";
import { Tilt_Warp } from 'next/font/google';
import PointsCalculation from "@/lib/pointsCalculations";

import classes from './Fixture.module.css';
import { Fixtures, FixtureData, UserPredictions } from '@/app/utils/types';

const tiltWarp = Tilt_Warp({
  subsets: ["latin"],
  weight: "variable"
});

import Fixture from "./Fixture";
import FixtureNotStarted from './FixtureNotStarted';
import FixtureInGame from "./FixtureInGame";
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

function sortGamesByDate(games: Fixtures, hostname: string, protocol: string) {
  const VALUES = Object.values(games);
  const ENTRIES = Object.entries(games);
  
  for (let g = 0; g < ENTRIES.length; g++) {
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
  return VALUES;
}

function sortLiveGamesByDate(games: Fixtures, hostname: string, protocol: string) {
  console.log('SORT LIVE GAMES');
  console.log(games);
  console.log('WAS GAMES');
  const VALUES = Object.values(games);
  const ENTRIES = Object.entries(games);
  
  for (let g = 0; g < ENTRIES.length; g++) {
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
  return VALUES;
}



const ResultsFixtureGroup = ({ date, games, enablePredictions, userPredictions, isResultsPage }: { date: string;  games: {  [key: string]: FixtureData}; enablePredictions: boolean; userPredictions: undefined | UserPredictions; isResultsPage: boolean}) => {
  // declare calculator
  const calculator = new PointsCalculation();
  const [liveScores, setLiveScores] = useState(null);

  useEffect(() => {
    // const db = getDatabase();
    console.log('in the useEffect and data')
    const dataRef = ref(db, 'fixtures');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      console.log('setData .. ', value);
      setLiveScores(value);
    });

    // Optional cleanup
    return () => unsubscribe();
  }, []);

  const THESE_PREDICTIONS = userPredictions || {};
  let fixtureJsx;
  // console.log('fixture group and games is ');
  // console.log(games);
  // check to see if today is less that fixture group date.
  const now = new Date();
  const fixtureDate = new Date(date);
  const futureFixtures = now.getTime() < fixtureDate.getTime();
  // console.log('in the realtime fixture group');
  // console.log(liveScores);
  let sortedGames = [];
  if (liveScores) {
    sortedGames = sortLiveGamesByDate(liveScores['39'], 'localhost:3000', 'http');
  } else {
    sortedGames = sortGamesByDate(games, 'localhost:3000', 'http');
  }

  console.log('sortedGames');
  console.log(sortedGames);
  console.log('DONE');
  console.log(sortedGames[0])
  {
  fixtureJsx = <div className={classes.fixtureGroup}>
      <h3 className={tiltWarp.className}>{convertDate(date)}</h3>
          {sortedGames.map((fixture) => (

            <div key={fixture.id}>
              {
                fixture.status === 'FT' && <FixtureComplete
          key={fixture.id}
          fixture={fixture}
          kickoffTime={fixture.kickoff}
          pred={THESE_PREDICTIONS[fixture.id]}
          calc={calculator}
          />

              }


              {
               fixture.status && fixture.status !== 'FT' &&  
                <FixtureInGame
          key={fixture.id}
          fixture={fixture}
          kickoffTime={fixture.kickoff}
          calc={calculator}
          pred={THESE_PREDICTIONS[fixture.id]}
          />
              }

              {
               liveScores && !fixture.status &&  
                <FixtureNotStarted
          key={fixture.id}
          fixture={fixture}
          kickoffTime={fixture.kickoff}
          enablePredictions={true}
          isResult={false}
          hasKickedOff={false}
          userPredictions={THESE_PREDICTIONS}
          pred={THESE_PREDICTIONS[fixture.id]}
          />
              }              
            </div>
      ))}
      </div>
  }

  return fixtureJsx; 
}



export default ResultsFixtureGroup;