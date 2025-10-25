import NavLink from '@/app/components/ui/NavLink';
import classes from '../layout.module.css';

const GameRules = () => {

    return <>
    <div className={classes.header}>
        <div className={classes.link}><NavLink href="/more" className={classes.backLink}>&lt;</NavLink></div>
        <h2>Game Rules</h2>
        <div className={classes.link}></div>
    </div>
    <div className={classes.middle}>
        <p>The object of the game is simple, predict your scores and collect the points. League competitions run from week to week, Friday till Thursday, whereas Cup competitions run from round to round.</p>

        <p>Points are awarded on the following basis:</p>

        <h3>15 points</h3>
        <p>Exact score predicted</p>

        <h3>10 points</h3>
        <p>Correct result and goal difference correct, for example the game finishes 3 - 1 and you predicted 2 - 0, then you receive 10 points.</p>

        <h3>5 points</h3>
        <p>Correct result, goal difference incorrect.</p>


        <p>At the end of each week the winners from both the private and global leagues will be notified.</p>
        <h2>WILDCARDS</h2>

        <p>Wildcards a fun way to win more points during the live games.</p>

        <p>Each week players recieve 3 Wildcards to be used during the 2nd half of games. The window will open for 5 minute intervals that begin on the 50th minute and end of 85th. Here's how each Wildcard works:</p>

        <h3>Fulltime Whistle</h3>
        <p>Blow the Full-time Whistle on a game and bank a % of the points on offer. The later you end the game the more points you bank.</p>
        <ul>
            <li>50 - 55 minutes = current points - 4</li>
            <li>60 - 65 minutes = current points - 3</li>
            <li>70 - 75 minutes = current points - 2</li>
            <li>80 - 85 minutes = current points - 1</li>
        </ul>

        <h3>Goal Boost</h3>
        <p>Boost the number of goals a team has scored by one. If they score a goal afterwards then will still be boosted by your wildcard.</p>

        <h3>Double Points</h3>
        <p>Double the amount of points for a selected game. If the score changes after selection then you will receive Double Points on the end result.</p>
    </div>
    </>
}

export default GameRules;