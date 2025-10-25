// use only for displaying Fixtures with results and no changeable values

import Team from "./Team";
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
        { fixture.home && (!userPredictions || !userPredictions[`${fixture.id}`]) && <Team home={true} teamData={fixture.home} enablePredictions={enablePredictions} isResult={isResult}></Team>}
        { fixture.home && userPredictions && userPredictions[`${fixture.id}`] && <Team home={true} teamData={fixture.home} enablePredictions={enablePredictions} prediction={userPredictions[`${fixture.id}`]} isResult={isResult}></Team>}
        <div className={classes.predictNotice}></div>
        { fixture.away && (!userPredictions || !userPredictions[`${fixture.id}`]) && <Team home={false} teamData={fixture.away} enablePredictions={enablePredictions} isResult={isResult}></Team>}
        { fixture.away && userPredictions && userPredictions[`${fixture.id}`] && <Team home={false} teamData={fixture.away} enablePredictions={enablePredictions}  prediction={userPredictions[`${fixture.id}`]} isResult={isResult}></Team>}
      </div>
    </div>

  if (isResult) {
      fixtureJsx = <div className={classes.fixtureContainer}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hr(kickoffTime)} B</div>
        <div className={classes.teamsRow}>
        { fixture.home && <Team home={true} teamData={fixture.home} enablePredictions={false} isResult={isResult}></Team>}
        
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

        { fixture.away && <Team home={false} teamData={fixture.away} enablePredictions={false} isResult={isResult}></Team>}
      </div>
    </div>
  }
  return fixtureJsx;
};

export default Fixture;


/*

    <div className={classes.fixtureContainer}>
      <div className={classes.kickoffTime}>{formatTimeTo12Hour(kickoffTime)}</div>
      <div className={classes.teamsRow}>
        { homeGoals && <Team home={true} name={homeName} goals={homeGoals} isResult={isResult} logo={homeLogo}></Team>}
        { !homeGoals && <Team home={true} name={homeName} isResult={isResult} logo={homeLogo}></Team>}
        <div className={classes.predictNotice}>
          <div>
            <div>NP</div>
          </div>
        </div>
        {awayGoals && <Team home={false}  name={awayName} goals={awayGoals}  isResult={isResult} logo={awayLogo}></Team>}
        {!awayGoals && <Team home={false}  name={awayName}  isResult={isResult} logo={awayLogo}></Team>}
      </div>
    </div>


  <div class="kickoffTime">{{game.kickoff | date:'shortTime'}}</div>
  <div class="fixture" id="{{game.id}}" #fixtureEl (click)="selectGame(game)">
    <div [ngClass]="game.status === 'FT' || !game.elapsed ? '' : open ? 'card lock' : 'card lock'">
      <div [ngClass]="game.elapsed === null || game.elapsed === undefined ? 'details' : game.status === 'FT' ? 'details completed' : 'details live'">
        <div>
          <div class="team">{{game.home.name | shortTeamName}}</div>
          <div class="teamLogo"><img [src]="'/assets/team-logos/' + homeLogo + ''" border="0" width="43px"/></div>
          <div class="liveScore" *ngIf="game.elapsed !== null && game.elapsed">
            <ng-container *ngIf="game.status != 'NS'">{{game.home.goals}}</ng-container>
          </div>
          <div *ngIf="(!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
            <input pattern="[0-9]*" type="text" name="homescore" class="homeScore" (keyup)="inputChange($event, 'homeScore')" (blur)="onBlur('home')" #homeInput [value]="game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'" (focus)="onFocus('homeScore')" maxlength="1">
          </div>
<!--
          <div *ngIf="!enableHalfTime && (!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
            <input pattern="[0-9]*" type="text" name="homescoreHalfTime" class="homescoreHalfTime" (keyup)="inputChange($event, 'homeScore')" (blur)="onBlur('home')" #homeInput [value]="game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'" (focus)="onFocus('homeScore')" maxlength="1">
          </div>
-->
          <div *ngIf="inGameWeek === true && !game.elapsed" class="inputContainer">
            <div>
              {{game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'}}
            </div>
          </div>
        </div>
        <div [ngClass]="game.predicted && game.elapsed || !game.predicted && game.elapsed ? 'predictNotice' : 'predictNotice notStarted'">
          <ng-container *ngIf="game.predicted && game.elapsed">
            <div class="predictions">
              <span class="goals">{{game.prediction?.home}}</span>
              <span class="goals">{{game.prediction?.away}}</span>
              <div *ngIf="game.elapsed != null && game.prediction?.points !== undefined" [ngClass]="game.elapsed < 90 ? 'points current' : 'points end'">{{game.prediction?.points}} pts</div>
            </div>
          </ng-container>
          <ng-container *ngIf="!game.predicted && game.elapsed">
            <div class="predictions">
              <div class='points'>NP</div>
            </div>
          </ng-container>
        </div>
        <div>
          <div *ngIf="(!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
            <input pattern="[0-9]*" type="text" name="awayscore" class="awayScore" (keyup)="inputChange($event, 'awayScore')" (blur)="onBlur('away')" #awayInput [value]="game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'" (focus)="onFocus('awayScore')" maxlength="1">
          </div>
<!--
          <div *ngIf="!enableHalfTime && (!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
            <input pattern="[0-9]*" type="text" name="awayscoreHalfTime" class="awayscoreHalfTime" (keyup)="inputChange($event, 'awayScore')" (blur)="onBlur('away')" #awayInput [value]="game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'" (focus)="onFocus('awayScore')" maxlength="1">
          </div>          
-->
          <div *ngIf="inGameWeek === true && !game.elapsed" class="inputContainer">
            <div>{{game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'}}</div>
          </div>
          <div class="liveScore"  *ngIf="game.elapsed !== null && game.elapsed">
            <ng-container *ngIf="game.status != 'NS'">{{game.away.goals}}</ng-container>
          </div>
          <div class="teamLogo"><img [src]="'/assets/team-logos/' + awayLogo + ''" border="0" width="43px"/></div>
          <div class="team away">{{game.away.name | shortTeamName}}</div>
          <div *ngIf="game.elapsed && game.elapsed != null && game.status !== 'FT'" class="elapsed">{{game.elapsed}}</div>
        </div>
      </div>
    </div>

    <div *ngIf="enableHalfTime">
      <div [ngClass]="game.status === 'FT' || !game.elapsed ? '' : open ? 'card lock' : 'card lock'">
        <div [ngClass]="game.elapsed === null || game.elapsed === undefined ? 'details' : game.status === 'FT' ? 'details completed' : 'details live'">
          <div>
            <div class="team">{{game.home.name | shortTeamName}}</div>
            <div class="teamLogo"><img [src]="'/assets/team-logos/' + homeLogo + ''" border="0" width="43px"/></div>
            <div class="liveScore" *ngIf="game.elapsed !== null && game.elapsed">
              <ng-container *ngIf="game.status != 'NS'">{{game.home.goals}}</ng-container>
            </div>
            <div *ngIf="(!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
              <input pattern="[0-9]*" type="text" name="homescore" class="homeScore" (keyup)="inputChange($event, 'homeScore')" (blur)="onBlur('home')" #homeInput [value]="game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'" (focus)="onFocus('homeScore')" maxlength="1">
            </div>
  <!--
            <div *ngIf="!enableHalfTime && (!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
              <input pattern="[0-9]*" type="text" name="homescoreHalfTime" class="homescoreHalfTime" (keyup)="inputChange($event, 'homeScore')" (blur)="onBlur('home')" #homeInput [value]="game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'" (focus)="onFocus('homeScore')" maxlength="1">
            </div>
  -->
            <div *ngIf="inGameWeek === true && !game.elapsed" class="inputContainer">
              <div>
                {{game.prediction?.home || game.prediction?.home === 0 ? game.prediction?.home : '-'}}
              </div>
            </div>
          </div>
          <div [ngClass]="game.predicted && game.elapsed || !game.predicted && game.elapsed ? 'predictNotice' : 'predictNotice notStarted'">
            <ng-container *ngIf="game.predicted && game.elapsed">
              <div class="predictions">
                <span class="goals">{{game.prediction?.home}}</span>
                <span class="goals">{{game.prediction?.away}}</span>
                <div *ngIf="game.elapsed != null && game.prediction?.points !== undefined" [ngClass]="game.elapsed < 90 ? 'points current' : 'points end'">{{game.prediction?.points}} pts</div>
              </div>
            </ng-container>
            <ng-container *ngIf="!game.predicted && game.elapsed">
              <div class="predictions">
                <div class='points'>NP</div>
              </div>
            </ng-container>
          </div>
          <div>
            <div *ngIf="(!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
              <input pattern="[0-9]*" type="text" name="awayscore" class="awayScore" (keyup)="inputChange($event, 'awayScore')" (blur)="onBlur('away')" #awayInput [value]="game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'" (focus)="onFocus('awayScore')" maxlength="1">
            </div>
  <!--
            <div *ngIf="!enableHalfTime && (!game.elapsed || game.elapsed === null) && inGameWeek === false" class="inputContainer">
              <input pattern="[0-9]*" type="text" name="awayscoreHalfTime" class="awayscoreHalfTime" (keyup)="inputChange($event, 'awayScore')" (blur)="onBlur('away')" #awayInput [value]="game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'" (focus)="onFocus('awayScore')" maxlength="1">
            </div>          
  -->
            <div *ngIf="inGameWeek === true && !game.elapsed" class="inputContainer">
              <div>{{game.prediction?.away || game.prediction?.away === 0 ? game.prediction?.away : '-'}}</div>
            </div>
            <div class="liveScore"  *ngIf="game.elapsed !== null && game.elapsed">
              <ng-container *ngIf="game.status != 'NS'">{{game.away.goals}}</ng-container>
            </div>
            <div class="teamLogo"><img [src]="'/assets/team-logos/' + awayLogo + ''" border="0" width="43px"/></div>
            <div class="team away">{{game.away.name | shortTeamName}}</div>
            <div *ngIf="game.elapsed && game.elapsed != null && game.status !== 'FT'" class="elapsed">{{game.elapsed}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>


*/