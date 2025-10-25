import { Button } from "../Button";
import classes from '../Modal.module.css';

const EditNameContent = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>Edit display name</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>Hello there, how's it going?</p>
    </>
}

export default EditNameContent;