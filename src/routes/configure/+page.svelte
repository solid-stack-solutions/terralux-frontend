<script lang="ts">
    import { goto } from '$app/navigation';
    import { changeConfiguration } from '$lib/backend-api';
    import ConfigIpModal from '$lib/components/configIpModal.svelte';
    import { houseIcon, treeIcon } from '$lib/components/locationMarkers';
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import NaturalFactorSlider from '$lib/components/naturalFactorSlider.svelte';
    import SmoothLoadingBar from '$lib/components/smoothLoadingBar.svelte';
    import { ArrowBigLeftDash, ShieldAlert } from '@lucide/svelte';
    import { LatLng } from 'leaflet';
    import { onMount } from 'svelte';
    import { ipState } from './ipstate.svelte';

    let ipModalOpen = $state(false);

    /** Watch out: Styling is made for 4 reptiles */
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

    let sliderValue = $state(0.5);

    let loading = $state(false);
    let invalidLocation = $state(false);
    // svelte-ignore non_reactive_update because this is not reactive data
    let warningRef: HTMLDivElement;

    async function setConfiguration() {
        if (!natCoords || !terrCoords) return;
        if (!ipState.ipAddress) {
            ipModalOpen = true;
            return;
        }

        loading = true;
        const response = await changeConfiguration({
            plug_url: 'http://' + ipState.ipAddress,
            natural_factor: sliderValue,
            local_latitude: terrCoords.lat,
            local_longitude: terrCoords.lng,
            natural_latitude: natCoords.lat,
            natural_longitude: natCoords.lng,
        });
        if (response.ok) {
            return goto('/monitor');
        }
        if (response.status === 400) {
            // Coordinates were too close too poles
            invalidLocation = true;
            loading = false;
            warningRef?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Currently no full error handling
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
            der Auswahl zu finden sein, kannst du einfach den <strong>Natürlichen Standort</strong> manuell
            auf der entsprechenden Karte einstellen. Damit ist ein Ort gemeint, an dem deine Reptilien-Spezies
            wild in der Natur lebt.
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

            {#if invalidLocation}
                <div
                    class="bg-tertiary-500 flex items-center justify-center rounded-md p-3"
                    bind:this={warningRef}
                >
                    <p class=" text-center text-sm">
                        <ShieldAlert class="mb-0.5 inline h-4 w-4 font-semibold" /> Für die ausgewählten Koordinaten
                        gibt es keine gültigen Sonnenstunden-Daten. Bitte wähle keinen Standort in der
                        Nähe der Pole.
                    </p>
                </div>
            {:else}
                <p class="text-center text-sm opacity-60">
                    Klicke auf die Karten, um eine Position auszuwählen
                </p>
            {/if}
        </div>

        <p class="mt-15 text-xl font-bold">Natürlichkeitsfaktor</p>
        <p class="mb-5 text-sm opacity-60">
            Der Natürlichkeitsfaktor bestimmt, wie stark sich die Schaltzeiten deiner
            Terrarienlampen am natürlichen Biorhythmus deines Reptils orientieren. <br /> Hier
            kannst du einen Wert zwischen <strong>0 %</strong>
            für die Sonnenauf/-untergangszeiten am <strong>Terrarium Standort</strong> und
            <strong>100 %</strong>
            für eine zusätzliche Anpassung der Tageslänge an die des
            <strong>Natürlichen Standorts</strong>. <br />
            Bei allem dazwischen wird gemittelt!
        </p>

        <NaturalFactorSlider bind:sliderValue />

        <div class="flex justify-center pt-20">
            <button
                type="button"
                class="btn preset-filled-primary-500 w-128"
                disabled={!natCoords || !terrCoords}
                onclick={setConfiguration}>Jetzt konfigurieren</button
            >
        </div>
    {/if}
</section>
