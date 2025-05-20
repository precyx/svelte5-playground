<script lang="ts">
	import '../app.css';

	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<div class="text-dark min-h-screen bg-white dark:bg-black dark:text-white">
	<Nav />
	{@render children()}
</div>
