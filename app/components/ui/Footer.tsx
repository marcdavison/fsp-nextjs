import classes from './Footer.module.css';
import NavLink from "./NavLink";
import { AniType } from '@/app/utils/types';

const Footer = () => {
    return           <footer className={classes.footer}>
            <ul>
                <li className={classes.home}><NavLink href="/home" aniType={AniType.FADE}>Home</NavLink></li>
                <li className={classes.plus}><NavLink href="/manage-private-leagues" aniType={AniType.FADE}>Leagues</NavLink></li>
                <li className={classes.more}><NavLink href="/more" aniType={AniType.FADE}>More</NavLink></li>
            </ul>
          </footer>
}

export default Footer;