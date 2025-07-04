<script lang="ts">
    import { houseIcon } from '$lib/components/locationMarkers';
    import * as L from 'leaflet';
    import { onMount } from 'svelte';

    let mapDiv: HTMLDivElement;
    let map: L.Map;
    let marker: L.Marker;

    let {
        /**
         * If false, the user can select a location on the map and move the map.
         */
        disabled = false,
        selected = null,
        markerIcon = null,
        onSelect = () => {},
    }: {
        disabled?: boolean;
        selected?: L.LatLng | null;
        markerIcon?: L.Icon | null;
        onSelect?: (coords: L.LatLng) => void;
    } = $props();

    const initialCenter: L.LatLngExpression = selected ?? [53.131, 8.22];
    const initialZoom = 7;

    onMount(() => {
        const zoomBehaviour = disabled ? 'center' : true;
        map = L.map(mapDiv, {
            boxZoom: !disabled,
            doubleClickZoom: zoomBehaviour,
            dragging: !disabled,
            scrollWheelZoom: zoomBehaviour,
            touchZoom: zoomBehaviour,
        }).setView(initialCenter, initialZoom);

        // see https://leaflet-extras.github.io/leaflet-providers/preview/ for list of available tile layers
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 8,
            minZoom: 2,
        }).addTo(map);

        // Only add markers and polylines when enabled
        if (disabled) return;

        // Add polar cicles
        /** Absolute value for geographic coordinate latitude of polar circle.
         * This value should be synchronized with the one in the backend to avoid
         * confusion. */
        const polarCircleLat = 65;
        L.polyline(
            [
                [polarCircleLat, -3600],
                [polarCircleLat, 3600],
            ],
            {
                color: 'var(--color-primary-500)',
                weight: 3,
            },
        ).addTo(map);

        L.polyline(
            [
                [-polarCircleLat, -3600],
                [-polarCircleLat, 3600],
            ],
            {
                color: 'var(--color-primary-500)',
                weight: 3,
            },
        ).addTo(map);

        map.on('click', (e: L.LeafletMouseEvent) => {
            const { latlng } = e;

            selected = latlng;
            onSelect(latlng);
        });
    });

    // Update the marker and map view when selected location changes
    $effect(() => {
        if (!map || !selected) return;

        map.setView(selected, map.getZoom());
        if (!marker) {
            marker = L.marker(selected, { icon: markerIcon ?? houseIcon }).addTo(map);
        } else {
            marker.setLatLng(selected);
        }
    });
</script>

<div class="relative flex h-full w-full">
    {#if selected}
        <div
            class="bg-primary-500 absolute top-3 left-1/2 z-20 -translate-x-1/2 transform rounded px-4 py-2 text-nowrap"
        >
            Lat: {selected.lat.toFixed(5)}, Lng: {selected.lng.toFixed(5)}
        </div>
    {/if}
    {#if disabled}
        <div
            class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/15"
        ></div>
    {/if}
    <div bind:this={mapDiv} class="z-0 flex h-full w-full rounded"></div>
</div>

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
