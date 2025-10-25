import { Button } from "../Button";
import classes from '../Modal.module.css';

const VerifyUser = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>Email address not verified</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>An account has been created, however the email address has not been verified. Please visit your inbox and click the verification link to continue.</p>
    </>
}

export default VerifyUser;