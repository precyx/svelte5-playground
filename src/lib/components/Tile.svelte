<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		color?: string;
	};
	let { color }: Props = $props();
</script>

<div class="mr-2 mb-2 h-20 w-20 rounded-sm" style="background-color: {color}">
	<slot></slot>
</div>
