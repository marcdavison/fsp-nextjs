export enum AniType {
  BACK = 'back',
  FORWARD = 'forward',
  FADE = 'fadeOut'
}

// FIXTURE PROPS
export type Team = {
  name: string;
  logo: string;
  goals: number;
};

export type FixtureData = {
  away: Team;
  home: Team;
  id: any;
  kickoff: string;
  elapsed?: number;
  status?: string;
};

export type Fixtures = {
  [key: string]: FixtureData
}

export type UserPrediction = {
  away: number;
  home: number;
  points?: number;
}

export type UserPredictions = {
  [key: string]: UserPrediction
}


/* remove these when cloud functions are updated not to store in other interface*/

export type FixturesMin = {
  [key: string]: FixtureDataMin
}

export type FixtureDataMin = {
  a: Team;
  h: Team;
  id: any;
  k: string;
};

export type TeamMin = {
  n: string;
  l: string;
  g: number;
};



