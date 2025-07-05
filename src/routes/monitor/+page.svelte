<script lang="ts">
    import { goto } from '$app/navigation';
    import { getFullConfiguration } from '$lib/backend-api';
    import { houseIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
    import type { PlugConfiguration } from '$lib/data-types';
    import { LatLng } from 'leaflet';
    import { onMount } from 'svelte';
    import AdditionalSettings from './components/additionalSettings.svelte';
    import MonitorChart from './components/monitorChart.svelte';
    import NextOnOffTime from './components/nextOnOffTime.svelte';
    import { Info } from '@lucide/svelte';

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

        <div class="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <ManualOnOffCluster />
            <NextOnOffTime />
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
            <AdditionalSettings {configData} />
        </div>

        <h1 class="mt-12 text-xl font-semibold">Sonnenzeiten & Schaltzeiten</h1>
        <p class="mb-2 text-sm opacity-60">
            <Info class="mb-0.5 inline w-4" /> Mit diesem Graphen erhältst du einen übersichtlichen Einblick
            in alle Abläufe im Terrarium.<br />
            Du kannst erkennen, <strong>wann</strong> im Jahresverlauf die
            <strong>Schaltzeiten</strong>
            im Verhältnis zu den Sonnenaufgangs- und Sonnenuntergangszeiten liegen, sowohl in der
            <strong>natürlichen Umgebung</strong>
            als auch im <strong>Terrarium</strong>. <br />Die Tage sind von oben nach unten zu
            lesen.
        </p>

        {#await configData}
            <div class="placeholder h-[550px] animate-pulse"></div>
        {:then configData}
            <MonitorChart {configData} />
        {/await}

        <div class="mt-12 flex w-full justify-center">
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
