import { Button } from "../Button";
import classes from '../Modal.module.css';

const CreateUser = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>New user registered</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>A confirmation email has been sent to your inbox, if you cannot see the email then check your Junk folder. Please click the verification link to confirm you are not a robot, you will then be taken to the Home page where you can begin predicting.</p>
    </>
}

export default CreateUser;