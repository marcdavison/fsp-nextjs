
import classes from '../Card/Card.module.css';
import CountdownTimer from './CountDownTimer';

export default function CountdownCard({ id, expiry }: {id: string; expiry: Date }) {
    return <div className={classes.section}>
              <h3 className={classes.title}>ROUND<span className={classes.weekNumber}>{ id }</span>BEGINS</h3>
              <div className={classes.countdownParent}>
                <CountdownTimer expiry={ expiry }></CountdownTimer>
              </div>
            </div>

}