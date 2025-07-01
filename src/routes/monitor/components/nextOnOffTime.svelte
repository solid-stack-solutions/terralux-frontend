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

<div class="grid grid-cols-2 justify-center p-1 text-lg font-semibold">
    <p>Einschaltung heute:</p>
    <p class="font-normal">{plugSwitchTimeToString(todayOn)} Uhr</p>
    <p>Ausschaltung heute:</p>
    <p class="font-normal">{plugSwitchTimeToString(todayOff)} Uhr</p>
</div>
