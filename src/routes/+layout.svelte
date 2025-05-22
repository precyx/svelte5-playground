<script lang="ts">
	import '../app.css';

	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<div class="text-dark dark:bg-grey-1100 min-h-screen bg-white dark:text-white">
	<Nav />
	{@render children()}
</div>
