import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from '$env/static/private'
const DISCORD_ENDPOINT = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=http://localhost:5173/api/auth/callback&response_type=code&scope=identify%20email%20guilds`;

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
    console.log({
        DISCORD_CLIENT_ID,
        DISCORD_REDIRECT_URI,
        DISCORD_ENDPOINT
    })
    //redirect to discord oauth
    throw redirect(302, DISCORD_ENDPOINT);
}