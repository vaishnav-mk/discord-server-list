<script>
	export let data;
	const { user } = data;
</script>

{#if !user}
	<a title="Discord OAuth2" href="api/auth">Authenticate via Discord</a>
{:else}
	<img
		alt="{user.userName}#{user.discriminator} avatar"
		src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png"
	/>
	<h1>{user.username}#{user.discriminator}</h1>
	<a title="Sign out" href="api/auth/signout">Sign Out</a>
{/if}
