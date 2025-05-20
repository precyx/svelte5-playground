<script>
	import CountryPicker from '$lib/components/CountryPicker.svelte';
	import PhonePicker from '$lib/components/PhonePicker.svelte';

	let country = $state(''); //$state('es');

	let phone = $state('02349');
</script>

<div class="p-10">
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

	<div>
		<PhonePicker id="pagomovil-phone" bind:value={phone} label="Numero de telefono del Pagador *"
		></PhonePicker>
	</div>
</div>
