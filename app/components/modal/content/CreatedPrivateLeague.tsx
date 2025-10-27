import { Button } from "../Button";
import classes from '../Modal.module.css';

const CreatePrivateLeague = ({ close, data }: { close: () => void; data: string }) => {
    return <>
        <div className={classes.top}>
           <h3>You're all set</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>Your private league has been created. League id: <span>{data}</span></p>
        <p>Forward the League id to your friends to start playing.</p>
    </>
}

export default CreatePrivateLeague;