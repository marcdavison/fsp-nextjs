// import 2 server actions
import { joinSubmit, createSubmit } from './form-action';
import classes from '../styles/fullpage.module.css';
import NavLink from '../components/ui/NavLink';
import { AniType } from '../utils/types';
import Form from './Form';

/*
  alteranative to this is just to use server action .. the server action could make the calls and then redirect with cookies
  or query params rather than using state and making this a client component we could keep as a server page
*/

export default function Page() {
  return (
<div className={classes.pageContent}>
        <div className={classes.header}>
            <div className={classes.link}></div>
            <h2>Private leagues</h2>
            <div className={classes.link}><NavLink href="/home" className={classes.link} aniType={AniType.FADE}>X</NavLink></div>
        </div>
        <div className={classes.middle}>
          <h3>Create your own Private League</h3>
          <p>Start a league for you and your friends, use the form below to create a league ID, share with your friends and start playing!</p>
          <div className={classes.formContainer}>
            <Form placeholder="Enter your league name" buttonText='Create Game' name="create" formAction={createSubmit} initialState={{ message: '', data: null }}></Form>
          </div>

          <h3>Join a Private League</h3>
          <p>Enter the league ID below to join your friends!</p>
          <div className={classes.formContainer}>
            <Form placeholder="Enter league id" buttonText='Join' name="join" formAction={joinSubmit} initialState={{ message: '', data: null }}></Form>
          </div>
        </div>
    </div>
  );
}