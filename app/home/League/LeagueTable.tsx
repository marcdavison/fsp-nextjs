import classes from '../home.module.css';
import NavLink from '../../components/ui/NavLink';
import { AniType } from '../../utils/types';

type TableDetails = {
    [key: string]: TableDetail
}

type TableDetail = {
    created: string;
    duration: string;
    league: number;
    name: string;
    wildcards: boolean;
}

const LeagueTable = ({data, weekId}: {data: any; weekId: number}) => {
    console.log('League date and data is ..');
    console.log(data);
    console.log(weekId);
    const ownerTables = data?.owner || null;
    const joinedTables = data?.joined || null;
    console.log(JSON.stringify(ownerTables));

    let table = <div className={classes.section}>
        <h3 className={classes.title}>Leagues</h3>
        <p className={classes.leagueText}>You have not joined or created any custom leagues.</p>
    </div>

    if (data) {
        table = <div className={classes.section}>
      <h3 className={classes.title}>Leagues</h3>
      <ul className={classes.leagueList}>
        {
            ownerTables && Object.entries(ownerTables).map(([keyValue, value]) => 
                <li key={keyValue}>
                    <span>{(value as TableDetail).name}</span>
                    <NavLink href={`tables/${keyValue}/${weekId}`} aniType={AniType.FADE}>View</NavLink>
                </li>
            )
        }
        {
            joinedTables && Object.entries(joinedTables).map(([keyValue, value]) => 
                <li key={keyValue}>
                    <span>{(value as string).split("||")[1]}</span>
                    <NavLink href={`tables/${keyValue}/${weekId}`} aniType={AniType.FADE}>View</NavLink>
                </li>
            )
        }

      </ul>
    </div>
    }


    return  table;
}

export default LeagueTable;