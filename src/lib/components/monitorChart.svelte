<script lang="ts">
    // Types for typescript support
    import ApexChartsClass from 'apexcharts';
    import type { ApexOptions } from 'apexcharts';

    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    // Dummy data
    import configData from '$lib/data/Configuration-Data.json';

    // Prepare data
    const toDecimalTime = (hour: number, minute: number): number =>
        Math.round((hour + minute / 60) * 1000) / 1000;

    const mapToDatetimeSeries = (values: number[]): { x: Date; y: number }[] =>
        values.map((y, index) => ({
            x: new Date(2025, 0, index + 1),
            y,
        }));

    // Chart
    let chart: ApexChartsClass;
    let chartElement: HTMLDivElement;

    // Data
    const dataNaturalSunrise: number[] = configData.natural_timers.map((timer) =>
        toDecimalTime(timer.on_time.hour, timer.on_time.minute),
    );

    const seriesData = mapToDatetimeSeries(dataNaturalSunrise);

    const dataNaturalSunset: number[] = configData.natural_timers.map((timer) =>
        toDecimalTime(timer.off_time.hour, timer.off_time.minute),
    );
    const dataLocalSunrise: number[] = configData.local_timers.map((timer) =>
        toDecimalTime(timer.on_time.hour, timer.on_time.minute),
    );
    const dataLocalSunset: number[] = configData.local_timers.map((timer) =>
        toDecimalTime(timer.off_time.hour, timer.off_time.minute),
    );
    const dataOn: number[] = configData.computed_timers.map((timer) =>
        toDecimalTime(timer.on_time.hour, timer.on_time.minute),
    );
    const dataOff: number[] = configData.computed_timers.map((timer) =>
        toDecimalTime(timer.off_time.hour, timer.off_time.minute),
    );

    const options: ApexOptions = {
        title: {
            text: 'Sonnenzeiten & Schaltpunkte',
            align: 'left',
        },
        chart: {
            fontFamily: 'Atma',
            foreColor: '#fff',
            type: 'line',
            height: 550,
            zoom: {
                enabled: true,
            },
        },
        legend: {
            position: 'bottom',
            fontSize: '17px',
            floating: false,
        },
        tooltip: {
            enabled: true,
            style: {
                fontFamily: 'Atma',
                fontSize: '12px',
            },
        },
        series: [
            {
                name: 'Nat. 🌞',
                data: seriesData,
            },
            // {
            //     name: 'Nat. 🌚',
            //     data: dataNaturalSunset,
            // },
            // {
            //     name: 'Ter. 🌞',
            //     data: dataLocalSunrise,
            // },
            // {
            //     name: 'Ter. 🌚',
            //     data: dataLocalSunset,
            // },
            // {
            //     name: 'Lampe 🌞',
            //     data: dataOn,
            // },
            // {
            //     name: 'Lampe 🌚',
            //     data: dataOff,
            // },
        ],
        colors: [
            'oklch(68.12% 0.07 134.27deg)',
            'oklch(46.16% 0.07 134.91deg)',
            'oklch(78% 0.09 69.51deg)',
            'oklch(62.11% 0.07 70.73deg)',
            'oklch(68.49% 0.11 21.67deg)',
            'oklch(43.24% 0.12 23.56deg)',
        ],
        xaxis: {
            title: {
                text: 'Monat',
            },
            type: 'datetime'
        },
        yaxis: {
            reversed: true,
            min: 0,
            max: 24,
            tickAmount: 8,
            title: {
                text: 'Stunde',
            },
        },
    };

    // When first rendered
    onMount(async () => {
        // Only render on client
        if (browser) {
            const ApexCharts = (await import('apexcharts')).default;
            chart = new ApexCharts(chartElement, options);
            await chart.render();
        }
    });

    // When leaving site
    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div class="p-10" bind:this={chartElement}></div>
