import { fetchSession } from '$lib/sessionHandler';
import { error } from '@sveltejs/kit';

export const POST = async ({ request }: any) => {

    const body = await request.json();
    if (!body) {
        throw error(400, 'Property "sessionId" is required.');
    }

    const session = fetchSession(body.sessionId);
    if (!session) {
        throw error(400, 'Invalid session.');
    }

    delete session.access_token;
    delete session.refresh_token;
    delete session.expires_in;
    delete session.scope;
    delete session.token_type;

    return {
        status: 200,
        body: session
    };
}