import { Button } from "../Button";
import classes from '../Modal.module.css';

const ForgottenPassword = ({ close }: { close: () => void }) => {
    return <>
        <div className={classes.top}>
           <h3>Forgotten your password?</h3>
            <Button onClick={close} cssClass={classes.closeX} textOnly={false}>X</Button>
        </div>
        <p>An email has been forwarded to your inbox with a password reset link. If you have not recieved the email, please check your Junk / Trash.</p>
    </>
}

export default ForgottenPassword;