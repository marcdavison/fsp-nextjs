import { Button } from "../Button";
import classes from '../Modal.module.css';

const JoinPrivateLeague = ({ close, data }: { close: () => void; data: string }) => {
    return <>
        <div className={classes.top}>
           <h3>Joined private league</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>You have been added to the "{data}" league name and will be included in future tables.</p>
    </>
}

export default JoinPrivateLeague;