<script lang="ts">
	import CountryPicker from '$lib/components/CountryPicker.svelte';
	import PhonePicker from '$lib/components/PhonePicker.svelte';
	import Input from '$lib/components/Input.svelte';
	import { generateHSLColors } from '$lib/utils/color';

	let country = $state(''); //$state('es');
	let phone = $state('02349');
	let numberOfColors = $state(5);

	let colors = $derived.by(() => {
		return generateHSLColors(numberOfColors);
	});
</script>

<div class="mx-auto w-[400px] p-10">
	<div class="mt-20">
		<div class="mb-4">
			<CountryPicker
				required={true}
				id="country"
				bind:value={country}
				label="Pais *"
				searchText="Buscar Pais"
				selectText="Seleccionar Pais"
			></CountryPicker>
		</div>

		<div class="mb-4">
			<PhonePicker id="pagomovil-phone" bind:value={phone} label="Numero de telefono del Pagador *"
			></PhonePicker>
		</div>

		<div class="mb-4">
			<Input
				max={'1000'}
				id=""
				type="number"
				bind:value={numberOfColors}
				oninput={(e) => {
					let v = parseInt(e?.target?.value);
					numberOfColors = Math.min(1000, v);
				}}
				label={'Number of colors'}
			/>
		</div>
	</div>
</div>

<div class="mx-auto w-[80vw]">
	<div class="flex flex-wrap">
		{#each colors as color, i}
			<div
				class="mr-2 mb-2 flex h-8 w-8 items-center justify-center rounded"
				style="background-color: {color}"
				title={color}
			>
				{i + 1}
			</div>
		{/each}
	</div>
</div>
