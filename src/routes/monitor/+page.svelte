<script lang="ts">
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
</script>
<div class="flex flex-col justify-center">
    <div class="flex justify-center">
        <h1 class="text-4xl font-bold">Terralux Kontrollstation</h1>
    </div>

    <MonitorChart />
    <div class="flex w-full justify-center">
        <div class="flex flex-col gap-y-4 max-w-fit">
            <div class="flex justify-center">
                <ManualOnOffCluster background_styles="bg-primary-500"/>
            </div>

            <div class="flex justify-center">
                <button type="button" class="btn preset-filled-primary-500 w-128">Neu konfigurieren</button>
            </div>
        </div>
    </div>
</div>