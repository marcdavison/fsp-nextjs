import classes from './Team.module.css';
import Image from 'next/image';
import InputField from './EntryField';

type TeamData = {
    name: string;
    logo: string;
    goals: number;
}

type Prediction = {
    away: number;
    home: number;
}

const Team = ({ home, teamData, enablePredictions, prediction, isResult, inPlay, elapsed, inputChange }: { home: boolean, teamData: TeamData; enablePredictions: boolean; prediction?: Prediction; isResult: boolean; inPlay?: boolean; elapsed?: number;  inputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; }) => {
    function trimName(str: string) {
        return str.substring(0, 3);
    }

    const teamContent = <div className={home ? classes.container : classes.containerReverse}>
            {
                elapsed && <div className={classes.elapsed}>{elapsed}</div>
            }
            <div className={classes.name}>{ trimName(teamData.name) }</div>
            <div className={classes.logoContainer}>
                <img src={teamData.logo} alt={teamData.name + ' badge'} width={0} height={0} className={classes.logoIag} />
            </div>
            {
                (enablePredictions) && <div className={classes.inputContainer}>
                    <InputField prediction={prediction} home={home} inputChange={inputChange}></InputField>
                </div>
            }
            {
                isResult && <div className={classes.resultScore}>{ teamData.goals }</div>
            }
            {
                inPlay && <div className={classes.liveScore}>{ teamData.goals }</div>
            }
        </div>
    return teamContent;

}

export default Team;