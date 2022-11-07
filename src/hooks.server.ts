import type { Handle } from '@sveltejs/kit';
import { fetchSession } from './lib/sessionHandler';
import cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
    console.log("handle");
	if (event.cookies.get('sessionID')) {
		const session = fetchSession(event.cookies.get('sessionID'));
        console.log({ session });
		if (session) {
			event.locals.user = session;
			return await resolve(event);
		}

		event.locals.user = null;
		return await resolve(event);
	}

	event.locals.user = null;
	return await resolve(event);
};

export const getSession = (request: any) => {
    if (request.locals.user) {
        return request.locals.user;
    }
    return {};
};