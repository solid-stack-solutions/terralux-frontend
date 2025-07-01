<script lang="ts">
    import { houseIcon, treeIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import { Slider } from '@skeletonlabs/skeleton-svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import configData from '$lib/data/Configuration-Data.json';
    import { LatLng } from 'leaflet';
    import NextOnOffTime from './components/nextOnOffTime.svelte';

    // Time zone
    const timezone = configData.timezone;

    let sliderValue = $state([configData.natural_factor * 100]);

    // TODO get config from backend on page load
    const lat = 53.131;
    const lng = 8.22;
</script>

<section class="mx-auto max-w-5xl">
    <div class="flex flex-col justify-center">
        <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>

        <div class="mt-10 flex flex-col">
            <h2 class="text-xl font-semibold">Aktuell verbunden mit der Steckdose 1.1.1.1</h2>
            <p class="h10 text-sm opacity-60">
                INFO ICON: Die aktuellen Zeiten werden mit berücksichtigung auf die Zeitzone {timezone}
                berechnet.
            </p>
        </div>

        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <ManualOnOffCluster />
            <NextOnOffTime />
        </div>

        <div class="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                <div>
                    <div class="aspect-[6/3] w-full shadow">
                        <LocationPicker
                            disabled={true}
                            selected={new LatLng(lat, lng)}
                            markerIcon={treeIcon}
                        />
                    </div>
                </div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-col">
                    <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                </div>
                <div>
                    <div class="aspect-[6/3] w-full shadow">
                        <LocationPicker
                            disabled={true}
                            selected={new LatLng(lat, lng)}
                            markerIcon={houseIcon}
                        />
                    </div>
                </div>
            </div>
        </div>

        <p class="mt-16 text-xl font-bold">Natürlichkeitsfaktor</p>

        <section class="flex items-center gap-2">
            <p class="text-lg opacity-60">Lokal</p>
            <Slider
                name="Slider Natürlichkeitsfaktor"
                value={sliderValue}
                onValueChange={(e) => (sliderValue = e.value)}
                readOnly
                markers={[0, 25, 50, 75, 100]}
                markText="text-sm"
                markOpacity="opacity-60"
                trackBg="bg-gradient-to-r from-surface-800 to-surface-700"
                meterBg="bg-primary-500"
                height="h-4"
                thumbSize="size-0"
                step={5}
            />
            <p class="text-lg opacity-60">Natürlich</p>
        </section>

        <MonitorChart />

        <div class="flex w-full justify-center">
            <div class="flex justify-center">
                <button type="button" class="btn preset-filled-primary-500 w-128 font-semibold"
                    >Neu konfigurieren</button
                >
            </div>
        </div>
    </div>
</section>
