import { Button } from "../Button";
import classes from '../Modal.module.css';

const PredictionsConfirmation = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>Predictions saved</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>You will be able to update your predictions up until kickoff!</p>
    </>
}

export default PredictionsConfirmation;