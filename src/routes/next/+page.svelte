<script lang="ts">
	import { contrastRatio, getContrastRating } from '$lib/utils/utils';

	import Tile from '$lib/components/Tile.svelte';
	import { onMount } from 'svelte';

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

	type Combination = {
		bg: string;
		fg: string;
		label1: string;
		label2: string;
		contrast: number;
		rating: string;
	};

	type Palette = {
		color: string;
		label: string;
	};

	const generateCombinations = (palette1: any[], palette2: any[]): Combination[] => {
		let _combinations: Combination[] = [];

		for (let bg of palette1) {
			let key1 = Object.keys(bg)[0] as keyof typeof bg;

			for (let fg of palette2) {
				let key2 = Object.keys(fg)[0] as keyof typeof fg;

				if (bg[key1] == fg[key2]) continue;

				let contrast = contrastRatio(bg[key1], fg[key2]);
				contrast = Math.round(contrast * 10) / 10;
				let rating = getContrastRating(contrast);
				_combinations.push({
					bg: bg[key1],
					fg: fg[key2],
					label1: key1 as string,
					label2: key2 as string,
					contrast: contrast,
					rating: rating
				});
			}
		}
		return _combinations;
	};

	const generateSelectedPalette = (_palette: any[]) => {
		let _newPalette: Palette[] = [];

		for (let color of _palette) {
			let key1 = Object.keys(color)[0] as keyof typeof color;

			_newPalette.push({
				color: color[key1],
				label: key1 as string
			});
		}

		return _newPalette;
	};

	/**
	 * State
	 */

	let combinations: Combination[] = $state([]);
	let selectedPalette: Palette[] = $state([]);
	let selectedPalette2: Palette[] = $state([]);

	$effect(() => {
		console.log('combs', combinations);
	});

	onMount(() => {
		combinations = generateCombinations(paletteGrey, paletteGrey);
		selectedPalette = generateSelectedPalette(paletteGrey);
		selectedPalette2 = generateSelectedPalette(paletteBlue);

		console.log('selectedPalette', selectedPalette);
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
		{#each selectedPalette as { color: color1, label: label1 }}
			<div
				class="flex-column mr-2 mb-2 flex w-[500px] flex-col items-center justify-center rounded p-6"
				style="background-color: {color1};"
			>
				<div class="mb-4 rounded-sm bg-white px-4 text-black">
					{label1}
				</div>
				{#each selectedPalette2 as { color: color2, label: label2 }}
					<div class="mt-2 flex">
						<div class="mr-4 h-[30px] w-[120px] rounded-sm" style="background: {color2};"></div>
						<div
							class="mr-4 h-[30px] w-[120px] rounded-sm"
							style=" border:1px solid {color2}; "
						></div>
						<div class="h-[30px] w-[120px] rounded-sm" style="color: {color2};">
							{label2}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
