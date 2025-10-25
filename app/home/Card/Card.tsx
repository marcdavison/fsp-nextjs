import classes from './Card.module.css'
import NavLink from '../../components/ui/NavLink';
import { AniType } from '../../utils/types';

interface Card {
  id: number;
  low: number;
  user: number;
  high: number;
  type: 'now' | 'prev'
  link?: string;
}

const Card = ({ id, low, user, high, link, type }: Card) => {

    let content = <div className={classes.section}>
              <h3 className={classes.title}>ROUND<span className={classes.weekNumber}>{ id }</span>{type === 'now' ? 'SCORE' : 'RESULTS'}</h3>
              <div className={classes.scores}>
                <div><h3>{ low }</h3>LOW</div>
                <div><h3>{ user }</h3></div>
                <div><h3>{ high }</h3>HIGH</div>
              </div>
              <div>
                <div></div>
              </div>
            </div>

    if (link) {
      content = <div className={classes.section}>
              <h3 className={classes.title}>ROUND<span className={classes.weekNumber}>{ id }</span>{type === 'now' ? 'SCORE' : 'RESULTS'}</h3>
              <div className={classes.scores}>
                <div><h3>{ low }</h3>LOW</div>
                <div><h3>{ user }</h3></div>
                <div><h3>{ high }</h3>HIGH</div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
    }
    return content
}

export default Card;