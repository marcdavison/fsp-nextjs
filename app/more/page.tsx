import classes from './layout.module.css';
import NavLink from '../components/ui/NavLink';

const More = () => {   
    return <>

        <div className={classes.header}>
            <div className={classes.link}></div>
            <h2>MORE</h2>
            <div className={classes.link}><NavLink href="/home" className={classes.link}>X</NavLink></div>
        </div>
        <div className={classes.menuContainer}>
            <ul className={classes.menu}>
                <li><NavLink href="/more/about" className={classes.link}>About</NavLink><span>&gt;</span></li>
                <li><NavLink href="/more/game-rules" className={classes.link}>Game Rules</NavLink><span>&gt;</span></li>
                <li><NavLink href="/more/cookie-policy" className={classes.link}>Cookie Policy</NavLink><span>&gt;</span></li>
                <li><NavLink href="/more/privacy-policy"  className={classes.link}>Privacy Policy</NavLink><span>&gt;</span></li>
                <li><NavLink href="/signout"  className={classes.link}>Logout</NavLink><span>&gt;</span></li>
            </ul>
        </div>
    </>
}

export default More;