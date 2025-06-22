<script lang="ts">
    import { Power } from '@lucide/svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
</script>

<div class="flex justify-center">
    <h1 class="text-4xl font-bold">Terralux Kontrollstation</h1>
    <button type="button" class="btn preset-filled-success-500 w-16"> ON </button>
    <Power />
</div>

<MonitorChart />

<div class="flex justify-center">
    <button type="button" class="btn preset-filled-tertiary-500 w-128">Neu konfigurieren</button>
</div>
