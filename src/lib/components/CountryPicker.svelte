<script lang="ts">
	import IconTriangle from '../icons/IconTriangle.svelte';
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import { writable } from 'svelte/store';
	import { clickOutside } from '$lib/utils/clickOutside';
	import IconGlobe from '$lib/icons/IconGlobe.svelte';

	type Props = {
		id?: string;
		label?: string;
		selectText?: string;
		searchText?: string;
		value?: string; // Country code e.g. "de"
		required?: boolean;
		error?: string;
	};
	let {
		id,
		label = 'País',
		selectText = 'Seleccionar país',
		searchText = 'Buscar país',
		value = $bindable<string>(), // Country code e.g. "de"
		required = false,
		error = ''
	}: Props = $props();

	type Country = {
		name: string;
		code: string;
	};

	// countries
	let countries: Country[] = $state([]);
	let filteredCountries: Country[] = $state([]);
	let search: string = $state('');
	let selectedCountry: Country | null = $state(null);
	let showPopover: boolean = $state(false);
	let inputMode: 'select' | 'search' = $state('select');

	onMount(async () => {
		let response = await fetch('/data/country.json');
		let _countries: Country[] = await response.json();

		countries = _countries;
		filteredCountries = _countries;

		// set initial country
		if (value) {
			selectedCountry = _countries.find((country) => country.code === value.toLowerCase()) || null;
		}
	});

	// Normalize and remove accents
	const removeDiacritics = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

	const onSearch = (e: any) => {
		const searchQuery = removeDiacritics(e.target.value.trim().toLowerCase());

		filteredCountries = countries.filter((country) => {
			const nameNormalized = removeDiacritics(country.name.toLowerCase());
			return nameNormalized.includes(searchQuery);
		});
	};

	const clickCountry = (country: Country) => {
		selectedCountry = country;
		showPopover = false;
		inputMode = 'select';
		value = country.code;
		error = '';
	};

	const clickSearch = () => {
		//showPopover = true;
	};

	const clickOpenCountryPicker = () => {
		showPopover = true;
		inputMode = 'search';
	};
</script>

<div class="relative">
	<label for={id} class="dark:text-grey-0 mb-1 block text-sm font-medium text-blue-500">
		{label}
	</label>
	<!--
    ###
    ### Search Field
    ###
    -->
	<div class="relative w-full">
		{#if inputMode == 'search'}
			<input
				{id}
				type="text"
				bind:value={search}
				placeholder={searchText}
				{required}
				oninput={onSearch}
				onclick={clickSearch}
				use:clickOutside={() => {
					showPopover = false;
					inputMode = 'select';
				}}
				class=" relative mt-1 block w-full rounded-md border-2 px-4 py-3 focus:ring-0
          {error
					? 'dark:bg-opacity-20 dark:placeholder-opacity-40 border-red-400  bg-red-50 text-red-400 placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:placeholder-white'
					: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0 focus:border-blue-500'}"
			/>
		{:else if inputMode == 'select'}
			<div class="pointer-events-none absolute top-[16px] left-5 z-10 mr-4 flex items-center">
				{#if selectedCountry}
					<img
						class=" w-[24px] rounded-sm"
						src={`/img/flags/4x3/${selectedCountry?.code}.svg`}
						alt={selectedCountry?.name}
					/>
				{:else}
					<!-- 
					<div
						class=" dark:bg-grey-600 flex h-[20px] w-[26px] items-center justify-center rounded-sm border border-blue-500 dark:border-grey-300"
					>
				</div>
			-->
					<IconGlobe classes="w-5 dark:text-grey-300 text-blue-500"></IconGlobe>
				{/if}
			</div>

			<input
				readonly
				{id}
				type="text"
				value={selectedCountry?.name}
				placeholder={selectText}
				{required}
				onclick={clickOpenCountryPicker}
				use:clickOutside={() => {
					showPopover = false;
					//inputMode = 'select';
				}}
				class=" relative mt-1 block w-full cursor-pointer rounded-md border-2 px-4 py-3 pl-[55px] outline-none focus:ring-0
          {error
					? 'dark:bg-opacity-20 dark:placeholder-opacity-40 border-red-400  bg-red-50 text-red-400 placeholder-red-400 focus:border-red-400 dark:bg-red-900 dark:placeholder-white'
					: ' border-grey-300 bg-grey-50 text-grey-500 placeholder-grey-300 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-200 dark:focus:border-grey-0 focus:border-blue-500'}"
			/>

			<IconTriangle
				classes={'absolute pointer-events-none right-5 top-[20px] w-[15px] text-blue-500 dark:text-grey-300'}
			></IconTriangle>
		{/if}

		{#if error}
			<p class="mt-1 text-sm font-medium text-red-400">{error}</p>
		{/if}
	</div>

	<!--
    ###
    ### Popover
    ###
    -->
	{#if showPopover}
		<div class="absolute top-[80px] left-0 z-50 w-full group-hover:block">
			<div
				class="border-grey-300 bg-grey-0 dark:border-grey-700 dark:bg-grey-900 max-h-[200px] w-full overflow-y-scroll rounded-lg border-2 shadow-[0px_10px_18px_-4px_rgba(0,_0,_0,_0.25)] shadow-lg"
			>
				<div class="flex flex-col flex-wrap">
					{#if filteredCountries.length}
						{#each filteredCountries as country}
							<button
								onclick={() => {
									clickCountry(country);
								}}
								class="hover:bg-grey-50 dark:hover:bg-grey-1000 flex cursor-pointer items-center px-4 py-2"
							>
								<div class="rounded-sm">
									<img
										class="mr-4 w-[24px] rounded-sm"
										src={`/img/flags/4x3/${country.code}.svg`}
										alt={country.name}
									/>
								</div>
								<div class="text-left text-blue-500 dark:text-white">{country.name}</div>
							</button>
						{/each}
					{:else}
						<div class="text-grey-300 py-2 text-center">No hay resultados</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
