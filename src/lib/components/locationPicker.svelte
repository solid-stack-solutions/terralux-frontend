<script lang="ts">
    import { onMount } from 'svelte';
    import * as L from 'leaflet';

    let mapDiv: HTMLDivElement;
    let map: L.Map;
    let marker: L.Marker;

    const initialCenter: L.LatLngExpression = [53.131, 8.22];
    const initialZoom = 13;

    export let selected: L.LatLng | null = null;
    export let onSelect: (coords: L.LatLng) => void = () => {};

    onMount(() => {
        map = L.map(mapDiv).setView(initialCenter, initialZoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 8,
        }).addTo(map);

        map.on('click', (e: L.LeafletMouseEvent) => {
            const { latlng } = e;

            if (!marker) {
                marker = L.marker(latlng).addTo(map);
            } else {
                marker.setLatLng(latlng);
            }

            selected = latlng;
            onSelect(latlng);
        });
    });
</script>

<div class="flex h-full w-full">
    <div bind:this={mapDiv} class="z-0 flex h-full w-full rounded"></div>
</div>

{#if selected}
    <div
        class="bg-primary-500 absolute top-10 left-1/2 -translate-x-1/2 transform rounded px-4 py-2"
    >
        Lat: {selected.lat.toFixed(5)}, Lng: {selected.lng.toFixed(5)}
    </div>
{/if}

<style>
    /* Overwrite Leaflet styles */
    :global(.leaflet-control-zoom-out) {
        color: white !important;
        background: var(--color-primary-500) !important;
    }
    :global(.leaflet-control-zoom-in) {
        color: white !important;
        background: var(--color-primary-500) !important;
    }
</style>
