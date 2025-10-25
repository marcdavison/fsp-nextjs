import { Button } from "../Button";
import classes from '../Modal.module.css';

const InvalidPredictions = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>Invalid predictions</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>You have entered an invalid prediction! Please enter both home and away scores for the fixtures you are predicting on.</p>
    </>
}

export default InvalidPredictions;