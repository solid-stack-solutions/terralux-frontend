<script lang="ts">
    import { getTodayConfiguration } from '$lib/backend-api';
    import { plugSwitchTimeToString, type PlugSwitchTime, type PlugTimer } from '$lib/data-types';
    import { onMount } from 'svelte';

    const fallBackTime: PlugSwitchTime = {
        hour: 0,
        minute: 0,
    };

    let configData: PlugTimer;

    // Today on / off
    function getOnTime(configData: PlugTimer): PlugSwitchTime {
        return configData?.on_time ?? fallBackTime;
    }
    function getOffTime(configData: PlugTimer): PlugSwitchTime {
        return configData?.off_time ?? fallBackTime;
    }

    onMount(async () => {
        configData = await getTodayConfiguration();
    });
</script>

<div class="p-2 pb-0">
    <div class="bg-surface-700 relative rounded-md p-3 pb-1">
        <div class="bg-surface-600 absolute -top-5 left-2 rounded-md px-2 text-base font-semibold">
            Zeiten heute
        </div>

        <div class="grid grid-cols-2 justify-center gap-y-1 text-base">
            <span>Einschaltung:</span>
            {#await configData}
                <div class="placeholder mb-1 animate-pulse"></div>
            {:then configData}
                <p class="font-normal">{plugSwitchTimeToString(getOnTime(configData))} Uhr</p>
            {/await}

            <p class="-mt-1">Ausschaltung:</p>
            {#await configData}
                <div class=" placeholder animate-pulse"></div>
            {:then configData}
                <span class="-mt-1 font-normal"
                    >{plugSwitchTimeToString(getOffTime(configData))} Uhr</span
                >
            {/await}
        </div>
    </div>
</div>
