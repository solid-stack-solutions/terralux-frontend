<script lang="ts">
    import {
        plugSwitchTimeToString,
        type PlugConfiguration,
        type PlugSwitchTime,
        type PlugTimer,
    } from '$lib/data-types';

    // Day number of today
    const getDayOfYear = (date: Date): number =>
        Math.floor(
            (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
        );
    const dayOfYearForArray = getDayOfYear(new Date()) - 1;

    const fallBackTime: PlugSwitchTime = {
        hour: 0,
        minute: 0,
    };

    let {
        configData = new Promise<PlugConfiguration>(() => {}),
    }: {
        configData: Promise<PlugConfiguration>;
    } = $props();

    // Today on / off
    function getOnTime(configData: PlugConfiguration): PlugSwitchTime {
        return configData?.computed_timers?.[dayOfYearForArray]?.on_time ?? fallBackTime;
    }
    function getOffTime(configData: PlugConfiguration): PlugSwitchTime {
        return configData?.computed_timers?.[dayOfYearForArray]?.off_time ?? fallBackTime;
    }
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
