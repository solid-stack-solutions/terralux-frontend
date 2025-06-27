<script lang="ts">
    import MonitorChart from '$lib/components/monitorChart.svelte';
    import ManualOnOffCluster from '$lib/components/manualOnOffCluster.svelte';
</script>

<section class="mx-auto max-w-5xl">
  <div class="flex flex-col justify-center">
      <h1 class="text-center text-6xl font-bold">Terralux Kontrollstation</h1>

      <MonitorChart />
      <div class="flex w-full justify-center">
          <div class="flex max-w-fit flex-col gap-y-4">
              <div class="flex justify-center">
                  <ManualOnOffCluster background_styles="bg-primary-500" />
              </div>

              <div class="flex justify-center">
                  <button type="button" class="btn preset-filled-primary-500 w-128"
                      >Neu konfigurieren</button
                  >
              </div>
          </div>
      </div>
  </div>
</section>