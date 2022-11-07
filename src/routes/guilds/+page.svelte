<script>
	export let data;
	let { guilds } = data;
	console.log({ guilds });
</script>

<div class="">
	<div>
		<h1 class="text-2xl font-bold">Guilds</h1>
	</div>

	<div class="flex flex-col">
		{#each guilds as guild}
			<div class="card card-side w-96 bg-base-100 shadow-xl flex flex-row">
				<figure class="px-10 pt-10">
					<img
						src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.png"
						alt="Shoes"
						class="rounded-xl"
					/>
				</figure>
				<div class="card-body items-center text-center">
					<h2 class="card-title">{guild.name}</h2>
					<p>{guild.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
