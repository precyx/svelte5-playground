<script lang="ts">
	//import { page } from '$app/stores';
	import { page } from '$app/state';

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Colors', href: '/colors' },
		{ name: 'Next', href: '/next' },
		{ name: 'Contact', href: '/contact' }
	];

	let isDark = true;

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<nav class="flex space-x-4 bg-gray-100 p-4 dark:bg-gray-800">
	{#each navItems as item}
		<a
			href={item.href}
			class="rounded px-3 py-2 text-sm font-medium text-white
				hover:bg-gray-300 dark:hover:bg-gray-700
				{page.url.pathname === item.href ? 'bg-gray-300 dark:bg-gray-700' : ''}"
		>
			{item.name}
		</a>
	{/each}

	<button on:click={toggleTheme} class="rounded bg-gray-200 p-2 dark:bg-gray-800">
		{#if isDark}
			🌙 Dark Mode
		{:else}
			☀️ Light Mode
		{/if}
	</button>
</nav>
