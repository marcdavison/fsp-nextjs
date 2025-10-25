interface Team {
    g: number;
    l: string;
    n: string;
}

interface MarkerGame {
  k: string;
  a: Team;
  h: Team;
}

interface NowMarkerGame {
  kickoff: string;
  a: Team;
  h: Team;
  k: string;
}

interface FixtureHolder {
    id: number;
    end: string;
    start: string;
    high: number;
    low: number;
    fixtures: {
        [key: string]: {
            [key: string]: MarkerGame | NowMarkerGame
        }
    }
}

interface Weekly {
    end: string;
    lastDay: boolean;
    now: FixtureHolder;
    prev: FixtureHolder;
}

interface UserPrediction {
  away: number;
  home: number;
  points?: number;
}


interface PredictionHolder {
  [key: string]: {
    [key: string]: {
      [key: string]: UserPrediction
    }
  }
}

const compId = 39;

export function getWaitingForWeekToStart(now: Date, weeklyData: FixtureHolder): {  inGameWeek: boolean; gamesLeftToPlay: boolean; newWeekStart: Date; isGamesToday: boolean; } {
  let earliestGameKickoff = new Date('1970-01-01');
  const fixturesByDay = Object.values(weeklyData.fixtures);
  const fixtureDates = Object.keys(weeklyData.fixtures);
  // declare initial values
  let gamesLeftToPlay = false;
  let inGameWeek = false;
  const TODAY_ISO = now.toISOString().split('T')[0];
  const isGamesToday = fixtureDates.indexOf(TODAY_ISO) > -1;

  for (let n = 0; n < fixturesByDay.length; n++) {
    // get the days fixtures
    const daysGames: any = fixturesByDay[n];
    const games: NowMarkerGame[] = Object.values(daysGames);
    // loop over kickoffs
    for (let g = 0; g < games.length; g++) {
      const game = games[g];
      let kickoff = new Date(game.kickoff);
      if (game.k) {
        kickoff = new Date(game.k);
      }
      if (earliestGameKickoff.getFullYear() === 1970) {
        earliestGameKickoff = new Date(kickoff);
      } else if (kickoff.getTime() < earliestGameKickoff.getTime()) {
          earliestGameKickoff = new Date(kickoff);
      }
      if (kickoff.getTime() > now.getTime()) {
        gamesLeftToPlay = true;
      } else if (now.getTime() > kickoff.getTime()) {
        inGameWeek = true;
      }
    }
  }

  return {
    inGameWeek,
    gamesLeftToPlay,
    newWeekStart: earliestGameKickoff,
    isGamesToday
  };
}

export function getUserTotal(predictions: PredictionHolder, weeklyNowOrPrev: FixtureHolder): number {
    return 20;
    let totalScore = 0;
    // loop over fixture dates for this week
    for (const d of Object.keys(weeklyNowOrPrev.fixtures)) {
      let dayTotal = 0;
      // has user predicted on this day
      if (predictions[d] && predictions[d][compId]) {
        const dayPredictions = predictions[d][compId];
        console.log('dayPredictions is ');
        console.log(dayPredictions);
        // reduce out the points
        dayTotal = Object.values(dayPredictions).reduce((accumulator, currentValue) => {
            return currentValue.points ? accumulator + currentValue.points : accumulator;
        }, 0);
      }
      totalScore += dayTotal;
    }
    return totalScore;
}