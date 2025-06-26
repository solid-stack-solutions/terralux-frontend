<script lang="ts">
    import { Power } from '@lucide/svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
</script>

<div class="flex justify-center">
    <h1 class="text-6xl font-bold">Terralux Kontrollstation</h1>
</div>

<div class="flex justify-center pt-10">
    <button type="button" class="btn preset-filled-primary-500 w-128"> <Power /> </button>
</div>

<MonitorChart />

<div class="flex justify-center">
    <button type="button" class="btn preset-filled-primary-500 w-128">Neu konfigurieren</button>
</div>
