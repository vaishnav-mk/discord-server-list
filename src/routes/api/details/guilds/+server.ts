import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from '$env/static/private'
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http://localhost:5173/api/auth/callback&response_type=code&scope=identify%20email%20guilds`;

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchSession } from '$lib/sessionHandler';

export const GET: RequestHandler = async ({ request, cookies }) => {
    if (!cookies.get('sessionID')) {
        throw redirect(302, '/');
    }

    const session = await fetchSession(cookies.get('sessionID'));

    console.log({s: session});

    if (!session) {
        throw redirect(302, '/');
    }

    const guilds = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `Bearer ${session.access_token}`
        }
    }).then(res => res.json());

    console.dir({guilds}, {depth: null});

    return json({guilds});

}