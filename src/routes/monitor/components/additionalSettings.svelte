<script lang="ts">
    import Info from '@lucide/svelte/icons/info';
    import NaturalFactorSlider from '$lib/components/naturalFactorSlider.svelte';
    import { Accordion } from '@skeletonlabs/skeleton-svelte';
    import type { PlugConfiguration } from '$lib/data-types';

    let value = $state(['']);

    let { configData }: { configData: Promise<PlugConfiguration> } = $props();
</script>

<Accordion {value} onValueChange={(e) => (value = e.value)} collapsible base="bg-surface-700">
    <Accordion.Item
        value="additional-settings"
        controlHover="hover:bg-surface-600"
        controlClasses="text-lg font-semibold"
    >
        {#snippet control()}Weitere Informationen{/snippet}
        {#snippet panel()}
            <div class="mx-3">
                <div class="mt-2 flex flex-col">
                    <h2 class="text-xl font-semibold">
                        Aktuell verbunden mit der Steckdose
                        {#await configData}
                            <div
                                class="placeholder -mb-1 inline-block h-5 w-30 animate-pulse"
                            ></div>
                        {:then configData}
                            {configData.plug_url}
                        {/await}
                    </h2>
                    <p class="h10 text-sm opacity-60">
                        <Info class="mb-0.5 inline w-4" /> Die aktuellen Zeiten werden mit berücksichtigung
                        auf die <span class="font-semibold">Zeitzone</span>
                        {#await configData}
                            <span class="placeholder -mb-1 inline-block w-20 animate-pulse"></span>
                        {:then configData}
                            {configData.timezone}
                        {/await}
                        berechnet.
                    </p>
                </div>
                <p class="mt-10 text-xl font-semibold">Natürlichkeitsfaktor</p>
                {#await configData}
                    <NaturalFactorSlider disabled={true} loading={true} />
                {:then configData}
                    <NaturalFactorSlider sliderValue={configData.natural_factor} disabled={true} />
                {/await}
            </div>
        {/snippet}
    </Accordion.Item>
</Accordion>
