<script lang="ts">
    import { houseIcon, treeIcon } from '$lib/components/locationMarkers';
    import { goto } from '$app/navigation';
    import { changeConfiguration } from '$lib/backend-api';
    import ConfigIpModal from '$lib/components/configIpModal.svelte';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import { Slider } from '@skeletonlabs/skeleton-svelte';
    import { LatLng } from 'leaflet';
    import { onMount } from 'svelte';
    import SmoothLoadingBar from '$lib/components/smoothLoadingBar.svelte';
    import { ShieldAlert, ArrowBigLeftDash } from '@lucide/svelte';
    import { ipState } from './ipstate.svelte';

    let ipModalOpen = $state(false);

    /** Watch out: Styling is made for 4 repitles */
    const reptiles = [
        {
            name: 'Höckerkopfgecko',
            src: 'image/hoeckerkopfgecko.jpg',
            latlng: new LatLng(-22.1, 166.53),
        },
        { name: 'Leopardgecko', src: 'image/leopardgecko.jpg', latlng: new LatLng(25.8, 65.76) },
        { name: 'Bartagame', src: 'image/bartagame.jpg', latlng: new LatLng(-28.13, 122.9) },
        { name: 'Königspython', src: 'image/koenigspython.jpg', latlng: new LatLng(8.26, 1.86) },
    ];
    let selectedReptile: number | null = $state(null);

    let natCoords: LatLng | null = $state(null);
    let terrCoords: LatLng | null = $state(null);
    let sliderValue = $state([50]);

    let loading = $state(false);

    async function setConfiguration() {
        if (!natCoords || !terrCoords) return;
        if (!ipState.ipAddress) {
            ipModalOpen = true;
            return;
        }

        loading = true;
        const response = await changeConfiguration({
            plug_url: 'http://' + ipState.ipAddress,
            natural_factor: sliderValue[0] / 100,
            local_latitude: terrCoords.lat,
            local_longitude: terrCoords.lng,
            natural_latitude: natCoords.lat,
            natural_longitude: natCoords.lng,
        });
        if (response.ok) {
            goto('/monitor');
        }
        // Currently no error handling
    }

    onMount(() => {
        // When user navigates to this page manually
        if (!ipState.ipAddress) {
            ipModalOpen = true;
        }
    });

    function returnToLandingPage() {
        goto('/');
    }
</script>

<section class="mx-auto max-w-5xl">
    <div class="relative flex w-full items-center">
        {#if !loading}
            <button
                type="button"
                class="btn preset-filled-secondary-500 absolute left-0"
                onclick={() => returnToLandingPage()}
            >
                <ArrowBigLeftDash />
            </button>
        {/if}

        <h1 class="mx-auto text-center text-6xl font-bold">Terralux Konfigurator</h1>
    </div>

    {#if loading}
        <div class="mt-20">
            <p class="mb-5 text-center text-xl">Konfiguration wird verarbeitet...</p>
            <SmoothLoadingBar />
        </div>
    {:else}
        <ConfigIpModal
            hideButton={true}
            bind:openState={ipModalOpen}
            onConfirm={() => (ipModalOpen = false)}
        />
        <p class="text-xl font-bold">Dein Reptil</p>
        <p class="mb-5 text-sm opacity-60">
            <ShieldAlert class="mb-0.5 inline h-4 w-4" /> Keine Sorge, sollte dein Reptil nicht unter
            der Auswahl zu finden sein kannst du einfach den <strong>Standort</strong> manuell auf
            der Karte
            <i>Natürlicher Standort</i> einstellen.
        </p>

        <section class="grid grid-cols-2 gap-4 md:grid-cols-4">
            {#each reptiles as reptile, index}
                <div class="flex flex-col items-center">
                    <button
                        type="button"
                        class="{index == selectedReptile
                            ? 'border-tertiary-500!'
                            : 'hover:border-primary-500'} border-tertiary-contrast-200 aspect-square overflow-hidden rounded-xl border-2 shadow-2xl hover:border-4 hover:brightness-75"
                        onclick={() => {
                            selectedReptile = index;
                            natCoords = reptile.latlng;
                        }}
                    >
                        <img
                            src={reptile.src}
                            alt={reptile.name}
                            class="h-full w-full object-cover"
                        />
                    </button>
                    <span class="mt-2 text-center text-sm opacity-60">{reptile.name}</span>
                </div>
            {/each}
        </section>

        <div class="mt-15 flex flex-col items-center gap-4">
            <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <div class="flex flex-col">
                    <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                    <div class="aspect-[6/5] shadow">
                        <LocationPicker
                            selected={terrCoords}
                            onSelect={(pos) => {
                                terrCoords = pos;
                                selectedReptile = null;
                            }}
                            markerIcon={houseIcon}
                        />
                    </div>
                </div>

                <div class="flex flex-col">
                    <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                    <div class="aspect-[6/5] shadow">
                        <LocationPicker
                            selected={natCoords}
                            onSelect={(pos) => (natCoords = pos)}
                            markerIcon={treeIcon}
                        />
                    </div>
                </div>
            </div>

            <p class="text-center text-sm opacity-60">
                Klicke auf die Karten, um eine Position auszuwählen
            </p>
        </div>

        <p class="mt-15 text-xl font-bold">Natürlichkeitsfaktor</p>
        <p class="mb-5 text-sm opacity-60">
            Der Natürlichkeitsfaktor bestimmt wie stark sich die Schaltzeiten der Lampen im
            Terrarium an den biologischen Rhythmus des Reptils anpassen. <br /> Hier wird zwischen
            <strong>0 % für lokale Zeiten</strong>
            und <strong>100 % für das natürliche Habitat</strong> unterschieden.
        </p>

        <section class="flex items-center gap-2">
            <p class="text-lg opacity-60">Lokal</p>
            <Slider
                name="Slider Natürlichkeitsfaktor"
                value={sliderValue}
                onValueChange={(e) => (sliderValue = e.value)}
                markers={[0, 25, 50, 75, 100]}
                markText="text-sm"
                markOpacity="opacity-60"
                trackBg="bg-gradient-to-r from-surface-800 to-surface-700"
                meterBg="bg-primary-500"
                height="h-4"
                thumbSize="size-6"
                step={5}
            />
            <p class="text-lg opacity-60">Natürlich</p>
        </section>

        <div class="realtive flex w-full gap-x-4 pt-20">
            <button
                type="button"
                class="btn preset-filled-primary-500 w-128"
                disabled={!natCoords || !terrCoords}
                onclick={setConfiguration}>Jetzt konfigurieren</button
            >
        </div>
    {/if}
</section>
