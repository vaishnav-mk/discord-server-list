import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

//import hook data from the server and pass it to the page
import { fetchSession } from '$lib/sessionHandler';
import { compute_rest_props } from 'svelte/internal';
export const load: PageServerLoad = async ({ request, cookies }) => {
	//get the session cookie from the request

	if (!cookies.get('sessionID')) {
		return {
			user: null
		};
	}
	//get the session data from the session cookie
	const session = fetchSession(cookies.get('sessionID'));
	console.log({ u: session });
	if (!session) {
		return {
			user: null
		};
	}
	console.log('reacjed');
	//return the session data t o the page
	return {
		user: session
	};
};
