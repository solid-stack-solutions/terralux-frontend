<script lang="ts">
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import { LatLng } from 'leaflet';

    let natCoords: LatLng | null = null;
    let terrCoords: LatLng | null = null;
</script>

<section class="mx-auto max-w-5xl">
    <h1 class="mb-10 text-center text-6xl font-bold">Terralux Konfigurator</h1>

    <div class="flex flex-col items-center gap-4">
        <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                <div class="aspect-[6/5] w-full shadow">
                    <LocationPicker onSelect={(pos) => (natCoords = pos)} />
                </div>
            </div>

            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                <div class="aspect-[6/5] w-full shadow">
                    <LocationPicker onSelect={(pos) => (terrCoords = pos)} />
                </div>
            </div>
        </div>

        <p class="text-center">Klicke auf die Karten, um eine Position auszuwählen</p>
    </div>
</section>
