<script lang="ts">
    import { plugSwitchTimeToString } from '$lib/data-types';
    import configData from '$lib/data/Configuration-Data.json';

    // Day number of today
    const getDayOfYear = (date: Date): number =>
        Math.floor(
            (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
        );
    const dayOfYearForArray = getDayOfYear(new Date()) - 1;

    // Today on / off
    const todayOn = configData.computed_timers[dayOfYearForArray].on_time;
    const todayOff = configData.computed_timers[dayOfYearForArray].off_time;

    // TODO get config as prop instead of importing
</script>

<div class="p-2 pb-0">
    <div class="bg-surface-700 relative rounded-md p-3 pb-1">
        <div class="bg-surface-600 absolute -top-5 left-2 rounded-md px-2 text-base font-semibold">
            Zeiten heute
        </div>

        <div class="grid grid-cols-2 justify-center gap-y-1 text-base">
            <span>Einschaltung:</span>
            <p class="font-normal">{plugSwitchTimeToString(todayOn)} Uhr</p>
            <p class="-mt-1">Ausschaltung:</p>
            <span class="-mt-1 font-normal">{plugSwitchTimeToString(todayOff)} Uhr</span>
        </div>
    </div>
</div>
