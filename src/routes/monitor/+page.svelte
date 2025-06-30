<script lang="ts">
    import { houseIcon, treeIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import { LatLng } from 'leaflet';

    // TODO get config from backend on page load
    const lat = 53.131;
    const lng = 8.22;
</script>

<section class="mx-auto max-w-5xl">
    <div class="flex flex-col justify-center">
        <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>
        <div class="flex justify-center">
            <ManualOnOffCluster background_styles="w-128" />
        </div>

        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
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
        </div>

        <MonitorChart />

        <div class="flex w-full justify-center">
            <div class="flex justify-center">
                <button type="button" class="btn preset-filled-primary-500 w-128"
                    >Neu konfigurieren</button
                >
            </div>
        </div>
    </div>
</section>
