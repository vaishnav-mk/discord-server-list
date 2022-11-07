import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI, DISCORD_CLIENT_SECRET } from '$env/static/private'
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http://localhost:5173/api/auth/callback&response_type=code&scope=identify%20email%20guilds`;
import { setSession } from '$lib/sessionHandler';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const GET: RequestHandler = async ({ request, cookies, params, url }) => {
    console.dir({request, url, params}, {depth: null});
    const code = new URLSearchParams(url.search).get('code');

	console.log({code});

    if (!code) {
        return redirect(302, DISCORD_ENDPOINT);
    }

	const dataObject = {
		client_id: DISCORD_CLIENT_ID,
		client_secret: DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		code,
		redirect_uri: DISCORD_REDIRECT_URI,
		scope: 'identify email guilds'
	};

	const data = new URLSearchParams(dataObject);

    console.log({data});

	const response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: data,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});

	const json = await response.json();

	console.log({json});

	if (json.error) {
		throw redirect(302, '/error');
	}

    const user = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${json.access_token}`
        }
    }).then(res => res.json());

    console.log({user});

	const access_token_expires_in = new Date(Date.now() + json.expires_in); // 10 minutes
	const refresh_token_expires_in = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	console.log('redirect to / with cookies');
    
    cookies.set('access_token', json.access_token, {
        path: '/',
        expires: access_token_expires_in
    });
    
    cookies.set('refresh_token', json.refresh_token, {
        path: '/',
        expires: refresh_token_expires_in
    });

    cookies.set('user', JSON.stringify(user), {
        path: '/',
        expires: refresh_token_expires_in
    });


    console.log("reached");
    console.log({user})
    const sessionID = setSession(user, json);

    console.log({sessionID});

    cookies.set('sessionID', sessionID, {
        path: '/',
        expires: refresh_token_expires_in
    });

    console.log({sessionID});
    throw redirect(302, '/');
};
