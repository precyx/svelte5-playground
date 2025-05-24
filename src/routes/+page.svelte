<script lang="ts">
	import { contrastRatio, getContrastRating } from '$lib/utils/utils';

	import Tile from '$lib/components/Tile.svelte';

	let paletteGrey = [
		{ 'grey-1100': '#1e1f21' },
		{ 'grey-1000': '#26282b' },
		{ 'grey-900': '#2d3434' },
		{ 'grey-700': '#50595f' },
		{ 'grey-500': '#6f767f' },
		{ 'grey-400': '#9ca6b2' },
		{ 'grey-300': '#b2c1ca' },
		{ 'grey-200': '#c7d2d7' },
		{ 'grey-100': '#cecece' },
		{ 'grey-50': '#f6f6f6' },
		{ 'grey-0': '#ffffff' }
	];

	let paletteBlue = [
		{ 'blue-600': '#0a4760' },
		{ 'blue-500': '#2793ce' },
		{ 'blue-400': '#75b8dc' },
		{ 'blue-300': '#9bdaff' },
		{ 'blue-200': '#b8cfec' },
		{ 'blue-100': '#c8dee9' }
	];

	let paletteGreen = [
		{ 'green-600': '#3D5A20' },
		{ 'green-400': '#7B965F' },
		{ 'green-300': '#7CA340' },
		{ 'green-200': '#8FC04B' },
		{ 'green-100': '#CDEB9F' }
	];

	let reduxGrey = [
		{ 'grey-1': '#111111' },
		{ 'grey-2': '#191919' },
		{ 'grey-3': '#222222' },
		{ 'grey-4': '#2A2A2A' },
		{ 'grey-5': '#313131' },
		{ 'grey-6': '#3A3A3A' },
		{ 'grey-7': '#484848' },
		{ 'grey-8': '#606060' },
		{ 'grey-9': '#6E6E6E' },
		{ 'grey-10': '#7B7B7B' },
		{ 'grey-11': '#B4B4B4' },
		{ 'grey-12': '#EEEEEE' }
	];

	let combinations: {
		bg: string;
		fg: string;
		label1: string;
		label2: string;
		contrast: string;
		rating: string;
	}[] = $state([]);

	for (let bg of paletteGrey) {
		let key1 = Object.keys(bg)[0] as keyof typeof bg;

		for (let fg of paletteGrey) {
			let key2 = Object.keys(fg)[0] as keyof typeof fg;

			if (bg[key1] == fg[key2]) continue;

			let contrast = contrastRatio(bg[key1], fg[key2]);
			contrast = Math.round(contrast * 10) / 10;
			let rating = getContrastRating(contrast);
			combinations.push({
				bg: bg[key1],
				fg: fg[key2],
				label1: key1,
				label2: key2,
				contrast: contrast,
				rating: rating
			});
		}
	}

	$effect(() => {
		console.log('combs', combinations);
	});
</script>

<div class="mx-auto w-[400px] p-10">
	<select name="palettes" id="palettes">
		<option value="cleanGreen">Clean Grey</option>
		<option value="cleanBlue">Clean Blue</option>
		<option value="cleanGreen">Clean Green </option>
		<option value="reduxGrey">Redux Grey</option>
	</select>
</div>

<div class="mx-auto w-[80vw]">
	<div class="mt-2 mb-2 text-lg">Clean Grey</div>
	<div class="flex">
		{#each paletteGrey as color, i}
			<Tile color={Object.values(color)[0]}></Tile>
		{/each}
	</div>
	<div class="flex">
		{#each paletteBlue as color, i}
			<Tile color={Object.values(color)[0]}></Tile>
		{/each}
	</div>

	<div class="mt-2 mb-2 text-lg">Redux Grey</div>
	<div class="flex">
		{#each reduxGrey as color, i}
			<Tile color={Object.values(color)[0]}></Tile>
		{/each}
	</div>

	<div class="mt-2 mb-2 text-lg">Combinations UI</div>
	<div class="flex flex-wrap">
		{#each combinations as { bg, fg, label1, label2, contrast, rating }}
			<div
				class="flex-column mr-2 mb-2 flex h-[160px] w-[160px] flex-col items-center justify-center rounded"
				style="background-color: {bg}; color: {fg};"
			>
				<div class="text-center">
					<div class="text-lg font-bold">{label2}</div>
					<div class="text-xs">{contrast} - {rating}</div>
					<div class="text-[10px]">{label1}</div>
				</div>

				<div class="mt-2">
					<div
						class="h-[20px] w-[80px] rounded-sm text-center"
						style="background-color: {fg};"
					></div>
				</div>
				<div class="mt-2">
					<div
						class="h-[20px] w-[80px] rounded-sm text-center"
						style="border-color: {fg}; border:1px solid; background: {bg};"
					></div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-2 mb-2 text-lg">Combinations Text</div>
	<div class="flex flex-wrap">
		{#each combinations as { bg, fg, label1, label2, contrast, rating }}
			<div
				class="mr-2 mb-2 flex h-[150px] w-[150px] items-center justify-center rounded"
				style="background-color: {bg}; color: {fg};"
			>
				<div class="text-center">
					<div class="text-lg font-bold">{label2}</div>
					<div class="text-xs">{contrast} - {rating}</div>
					<div class="text-[10px]">{label1}</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-2 mb-2 text-lg">Combinations Areas</div>
	<div class="flex flex-wrap">
		{#each combinations as { bg, fg, label1, label2, contrast, rating }}
			<div
				class="mr-2 mb-2 flex h-[150px] w-[150px] items-center justify-center rounded"
				style="background-color: {bg}; color: {fg};"
			>
				<div class="h-[100px] w-[100px] text-center" style="background-color: {fg};"></div>
			</div>
		{/each}
	</div>

	<div class="mt-2 mb-2 text-lg">Combinations Borders</div>
	<div class="flex flex-wrap">
		{#each combinations as { bg, fg, label1, label2, contrast, rating }}
			<div
				class="mr-4 mb-4 flex h-[150px] w-[150px] items-center justify-center rounded border border-2"
				style="background-color: {bg}; border-color: {fg};"
			></div>
		{/each}
	</div>
</div>
