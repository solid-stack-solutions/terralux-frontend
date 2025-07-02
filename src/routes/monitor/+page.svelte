<script lang="ts">
    import { goto } from '$app/navigation';
    import { getFullConfiguration } from '$lib/backend-api';
    import { houseIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import type { PlugConfiguration } from '$lib/data-types';
    import { LatLng } from 'leaflet';
    import { onMount } from 'svelte';
    import AdditionalSettings from './components/additionalSettings.svelte';
    import NextOnOffTime from './components/nextOnOffTime.svelte';

    let configData: Promise<PlugConfiguration> = new Promise(() => {});

    function onReconfigure() {
        goto('/configure');
    }

    onMount(async () => {
        configData = getFullConfiguration();
    });
</script>

<section class="mx-auto max-w-5xl">
    <div class="flex flex-col justify-center">
        <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>

        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <ManualOnOffCluster />
            <NextOnOffTime {configData} />
        </div>

        <div
            class="bg-surface-700 mt-5 grid w-full grid-cols-1 gap-6 rounded-md px-3 pt-2 pb-3 md:grid-cols-2"
        >
            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                <div class="aspect-[6/3] w-full shadow">
                    {#await configData}
                        <div class="placeholder h-full animate-pulse"></div>
                    {:then configData}
                        <LocationPicker
                            disabled={true}
                            selected={new LatLng(
                                configData.local_latitude,
                                configData.local_longitude,
                            )}
                            markerIcon={houseIcon}
                        />
                    {/await}
                </div>
            </div>

            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                <div class="aspect-[6/3] w-full shadow">
                    {#await configData}
                        <div class="placeholder h-full animate-pulse"></div>
                    {:then configData}
                        <LocationPicker
                            disabled={true}
                            selected={new LatLng(
                                configData.natural_latitude,
                                configData.natural_longitude,
                            )}
                            markerIcon={houseIcon}
                        />
                    {/await}
                </div>
            </div>
        </div>

        <div class="mt-5">
            <AdditionalSettings />
        </div>

        <h1 class="mt-10 text-xl font-semibold">Sonnenzeiten & Schaltzeiten</h1>
        <p class="mb-2 text-sm text-red-400 opacity-60">Hier kann der Graph erläutert werden</p>
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
