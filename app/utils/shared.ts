// import { UserCredential } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function completeSignIn(result: any, token: string, router: AppRouterInstance) {

    const creationTime = result.user.metadata.creationTime;
    console.log('creationTime is ', creationTime);
    console.log('token is ', token);
    
    console.log("result.user is ...");
    console.log(result.user);
    const USER_SESSION_DATA = {
        emailVerified: result.user.emailVerified,
        email: result.user.email,
        creationTime: result.user.metadata.creationTime,
        providerId: result.user.providerData[0].providerId,
        displayName: result.user.displayName
    };
    /*
    console.log(token);
    const DETAILS = {
        tokenValue: token,
        created: creationTime
    };
    */


// validate in session
    sessionStorage.setItem('logoutDone', 'false');
    sessionStorage.setItem('USER_SESSION_DATA', JSON.stringify(USER_SESSION_DATA));

    fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ token, sessionData: USER_SESSION_DATA }),
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        console.log(res);
        if (res.ok) {
            console.log("send to home");
            router.push('/home');
        } else {
            console.error('Failed to store cookie');
        }
    })
    .catch((err) => {
        console.error('Error posting to API:', err);
    });
}