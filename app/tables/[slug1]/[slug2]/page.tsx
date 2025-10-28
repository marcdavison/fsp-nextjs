
import classes from './league-tables.module.css';
import NavLink from '@/app/components/ui/NavLink';
import { AniType } from '@/app/utils/types';


const LeagueTables = () => {
    return <div className={classes.pageContent}>

        <div className={classes.header}>
            <div className={classes.link}></div>
            <h2>MARCS LEAGUE</h2>
            <div className={classes.link}><NavLink href="/home" className={classes.link} aniType={AniType.FADE}>X</NavLink></div>
        </div>
    </div>
}

/*
const LeagueTables = async ({ params }: { params: { slug1: string; slug2: string }}) => {
    console.log('params slug is');
     const { slug1, slug2 } = await params;
    console.log(slug1);
    console.log(slug2);
    return <div className={classes.pageContent}>

        <div className={classes.header}>
            <div className={classes.link}></div>
            <h2>MARCS LEAGUE</h2>
            <div className={classes.link}><NavLink href="/home" className={classes.link} aniType={AniType.FADE}>X</NavLink></div>
        </div>
        <div>
            <h3 className={classes.bar}>
                <span className="arrow active">&lt;</span>
                <span>Round { slug2 }</span>
                <span className="arrow disabled">&gt;</span>
            </h3>
            <ul>
                <li className="head">
                    <span>Pos</span>
                    <span>Player</span>
                    <span>Pts</span>
                </li>
                <li className="items">
                    <span className="icon same"></span>
                    <span>1</span>
                    <span className="pName">mld hotmail</span>
                    <span className="points">55</span>
                </li>
                <li className="items">
                    <span className="icon same"></span>
                    <span>1</span>
                    <span className="pName">marc</span>
                    <span className="points">40</span>
                </li>
            </ul>
        </div>
    </div>
}
    */

export default LeagueTables;