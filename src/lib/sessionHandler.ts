import crypto from 'node:crypto';

const sessionUsers = new Map();

export function setSession(userData: any, tokenGrantData: any) {

    console.log({
        userData,
        tokenGrantData
    })

    // Creating a new session ID that will be used as a cookie to authenticate the user in 
    const newSessionID = crypto.randomBytes(32).toString('hex');
    const fullUser = { ...userData, ...tokenGrantData };

    console.log({
        newSessionID,
        fullUser
    })

    sessionUsers.set(newSessionID, fullUser);

    console.log('sessionUsers', sessionUsers);

    setTimeout(() => {
        deleteSession(newSessionID)
    }, 1000 * 60 * 10) //  10 minutes

    return newSessionID;
}

export function fetchSession(sessionId: any) {
    console.log({ sessionId });
    console.log({ sessionUsers });
    console.log({ sessionUsers: sessionUsers.get(sessionId) });
    return sessionUsers.get(sessionId) || null;
}

export function deleteSession(sessionId: any) {
    sessionUsers.delete(sessionId);
}