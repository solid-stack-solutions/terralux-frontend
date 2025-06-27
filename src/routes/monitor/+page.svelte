<script lang="ts">
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
</script>

<section class="mx-auto max-w-5xl">
  <div class="flex flex-col justify-center">
    
      <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>
    <div class="flex justify-center">
        <ManualOnOffCluster background_styles="w-128"/>
    </div>
      <MonitorChart />
      <div class="flex w-full justify-center">
              <div class="flex justify-center">
                  <button type="button" class="btn preset-filled-primary-500 w-128"
                      >Neu konfigurieren</button
                  >
          </div>
      </div>
  </div>
</section>