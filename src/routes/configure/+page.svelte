<script lang="ts">
    import MapClickMarker from '$lib/components/locationPicker.svelte';
    import { LatLng } from 'leaflet';

    let coords: LatLng | null = null;
</script>

<MapClickMarker onSelect={(pos) => (coords = pos)} />