import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/sessionHandler';
export const GET: RequestHandler = async ({ request, cookies }) => {
    if (!cookies.get('sessionID')) {
        return redirect(302, '/');
    }
    deleteSession(cookies.get('sessionID'));
    console.log('signout');
    cookies.delete('access_token');
    cookies.delete('refresh_token');
    return redirect(302, '/');
}