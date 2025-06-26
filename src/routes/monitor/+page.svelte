<script lang="ts">
    import { Power } from '@lucide/svelte';
    import MonitorChart from '$lib/components/monitorChart.svelte';
</script>

<section class="mx-auto max-w-5xl">
    <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>

    <div class="flex justify-center pt-10">
        <button type="button" class="btn preset-filled-primary-500 w-128"> <Power /> </button>
    </div>

    <MonitorChart />

    <div class="flex justify-center">
        <button type="button" class="btn preset-filled-primary-500 w-128">Neu konfigurieren</button>
    </div>
</section>
