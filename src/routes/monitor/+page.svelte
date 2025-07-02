<script lang="ts">
    import { houseIcon, treeIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import { LatLng } from 'leaflet';
    import AdditionalSettings from './components/additionalSettings.svelte';
    import NextOnOffTime from './components/nextOnOffTime.svelte';
    import { goto } from '$app/navigation';

    // TODO get config from backend on page load
    const lat = 53.131;
    const lng = 8.22;

    function onReconfigure() {
        goto('/configure');
    }
</script>

<section class="mx-auto max-w-5xl">
    <div class="flex flex-col justify-center">
        <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>

        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <ManualOnOffCluster />
            <NextOnOffTime />
        </div>

        <div
            class="bg-surface-700 mt-5 grid w-full grid-cols-1 gap-6 rounded-md px-3 pt-2 pb-3 md:grid-cols-2"
        >
            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                <div class="aspect-[6/3] w-full shadow">
                    <LocationPicker
                        disabled={true}
                        selected={new LatLng(lat, lng)}
                        markerIcon={houseIcon}
                    />
                </div>
            </div>

            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                <div class="aspect-[6/3] w-full shadow">
                    <LocationPicker
                        disabled={true}
                        selected={new LatLng(lat, lng)}
                        markerIcon={treeIcon}
                    />
                </div>
            </div>
        </div>

        <div class="mt-5">
            <AdditionalSettings />
        </div>

        <h1 class="mt-10 text-xl font-semibold">Sonnenzeiten & Schaltzeiten</h1>
        <MonitorChart />

        <div class="mt-10 flex w-full justify-center">
            <div class="flex justify-center">
                <button
                    onclick={onReconfigure}
                    type="button"
                    class="btn preset-filled-primary-500 w-128 font-semibold"
                    >Neu konfigurieren</button
                >
            </div>
        </div>
    </div>
</section>
