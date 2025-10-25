// use only for displaying Fixtures with results and no changeable values

import Team from "./Team";
import TeamEdit from "./TeamEdit";
import { FixtureData, UserPredictions } from '@/app/utils/types';

import classes from './Fixture.module.css'
type FixtureProps = {
  id: number;
  fixture: FixtureData;
  kickoffTime: string;
  isResult: boolean;
  hasKickedOff: boolean;
  enablePredictions: boolean;
  userPredictions: UserPredictions;
  inputChange?: () => void;
};

function formatTimeTo12Hr(datetimeString: string) {
  const date = new Date(datetimeString);

  let hours = date.getUTCHours(); // Use getHours() if you want local time
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${paddedMinutes} ${ampm}`;
}


const Fixture = ({ id, fixture, kickoffTime, isResult, hasKickedOff, enablePredictions, userPredictions }: FixtureProps) => {

  // assume we can edit firstly
  let fixtureJsx =     <div className={classes.fixtureContainer}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hr(kickoffTime)} A</div>
        <div className={classes.teamsRow}>





      </div>
    </div>

  if (isResult) {
      fixtureJsx = <div className={classes.fixtureContainer}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hr(kickoffTime)} B</div>
        <div className={classes.teamsRow}>
        { fixture.home && <Team home={true} teamData={fixture.home} isResult={isResult}></Team>}
        
        {
          // add prediction with points
          userPredictions && userPredictions[id] && <div className={classes.predictNotice}>
          <div className={classes.prediction}>
            <div className={classes.goals}>
              <span>{ userPredictions[id].home }</span>
              <span>{ userPredictions[id].away }</span>
            </div>
            <div className={classes.points}>{userPredictions[id].points} pts</div>
          </div>
        </div>
        }

        {
          // add NP if no prediction made
          !userPredictions || !userPredictions[id] && <div className={classes.predictNotice}>
          <div className={classes.prediction}>
            <div className={classes.points}>NP</div>
          </div>
        </div>
        }

        { fixture.away && <Team home={false} teamData={fixture.away} isResult={isResult}></Team>}
      </div>
    </div>
  }
  return fixtureJsx;
};

export default Fixture;