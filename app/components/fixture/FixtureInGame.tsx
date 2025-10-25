import Team from "./Team";
import classes from './Fixture.module.css'
import { FixtureData, UserPrediction } from '@/app/utils/types';
import PointsCalculation from "@/lib/pointsCalculations";
type FixtureProps = {
  fixture: FixtureData;
  kickoffTime: string;
  pred: UserPrediction;
  calc: PointsCalculation;
};


function formatTimeTo12Hr(datetimeString: string) {
  const date = new Date(datetimeString);

  let hours = date.getHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${paddedMinutes} ${ampm}`;
}

const FixtureInGame = ({ fixture, kickoffTime, pred, calc }: FixtureProps) => {
  let thisPoints = 0;
  if (pred) {
    thisPoints = calc.calcGameScore(fixture, pred);
  }


  return <div className={classes.fixtureContainer + ` ${fixture.elapsed && fixture.elapsed > 0 ? classes.lock : classes.open}`}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hr(kickoffTime)} in game</div>
        <div className={classes.teamsRow}>
        { fixture.home && <Team home={true} teamData={fixture.home} isResult={false} prediction={pred} enablePredictions={false} inPlay={true}></Team>}
        <div className={classes.predictNotice}>
          {
            !pred &&  <div><div>NP</div></div>
          }
          {
            pred &&  
          <div className={classes.prediction}>
            <div className={classes.goals}>
              <span>{ pred.home }</span>
              <span>{ pred.away }</span>
            </div>
            <div className={classes.points}>{thisPoints} pts</div>
          </div>
          }
        </div>
        { fixture.away && <Team home={false} teamData={fixture.away} isResult={false} prediction={pred} enablePredictions={false} inPlay={true} elapsed={fixture.elapsed}></Team>}
      </div>
    </div>
};

export default FixtureInGame;