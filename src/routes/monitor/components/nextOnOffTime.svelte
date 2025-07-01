<script lang="ts">
    import configData from '$lib/data/Configuration-Data.json';

    // Day number of today
    const getDayOfYear = (date: Date): number =>
        Math.floor(
            (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
        );
    const dayOfYearForArray = getDayOfYear(new Date()) - 1;

    // Today on / off
    const todayOnHour = configData.computed_timers[dayOfYearForArray].on_time.hour;
    const todayOnMinute = configData.computed_timers[dayOfYearForArray].on_time.minute;
    const todayOffHour = configData.computed_timers[dayOfYearForArray].off_time.hour;
    const todayOffMinute = configData.computed_timers[dayOfYearForArray].off_time.minute;

    // TODO get config as prop instead of importing
</script>

<div>
    <p class="text-lg font-semibold">
        Einschaltung heute: <span class="font-normal">{todayOnHour}:{todayOnMinute} Uhr</span>
    </p>
    <p class="text-lg font-semibold">
        Ausschaltung heute: <span class="font-normal">{todayOffHour}:{todayOffMinute} Uhr</span>
    </p>
</div>
