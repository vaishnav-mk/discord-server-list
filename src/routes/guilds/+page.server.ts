import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load = async ({ fetch }) => {
	const guilds:PageLoad  = await fetch('/api/details/guilds', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json());
	if (guilds.error) {
		return error(500, guilds.error);
	}
	console.log({guilds});
	return guilds
};
