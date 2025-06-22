<script lang="ts">
    // Types for typescript support
    import ApexChartsClass from 'apexcharts';
    import type { ApexOptions } from 'apexcharts';

    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import apexchartsLocaleDE from '$lib/apexcharts-locales/de.json';

    // Dummy data
    import configData from '$lib/data/Configuration-Data.json';

    // Prepare data
    const toDecimalTime = (hour: number, minute: number): number => hour + minute / 60;

    const mapToDatetimeSeries = (values: number[]): { x: Date; y: number }[] =>
        values.map((y, index) => ({
            x: new Date(2025, 0, index + 1),
            y,
        }));

    function convertToHourMinute(value: number): string {
        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);
        return `${hours.toString()}:${minutes.toString().padStart(2, '0')}`;
    }

    // Chart
    let chart: ApexChartsClass;
    let chartElement: HTMLDivElement;

    // Data
    const dataNaturalSunrise: number[] = configData.natural_timers.map((timer) =>
        toDecimalTime(timer.on_time.hour, timer.on_time.minute),
    );
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
    const seriesDataNaturalSunrise = mapToDatetimeSeries(dataNaturalSunrise);
    const seriesDataNaturalSunset = mapToDatetimeSeries(dataNaturalSunset);
    const seriesDataLocalSunrise = mapToDatetimeSeries(dataLocalSunrise);
    const seriesDataLocalSunset = mapToDatetimeSeries(dataLocalSunset);
    const seriesDataOn = mapToDatetimeSeries(dataOn);
    const seriesDataOff = mapToDatetimeSeries(dataOff);

    const options: ApexOptions = {
        title: {
            text: 'Sonnenzeiten & Schaltpunkte',
            align: 'left',
            style: {
                fontSize: '20px',
            },
        },
        chart: {
            fontFamily: 'Atma',
            locales: [apexchartsLocaleDE],
            defaultLocale: 'de',
            foreColor: '#fff',
            background: 'transparent',
            type: 'line',
            height: 550,
            animations: {
                enabled: true,
                animateGradually: {
                    enabled: false,
                    delay: 50,
                },
            },
            zoom: {
                enabled: false,
            },
        },
        theme: {
            mode: 'dark',
        },
        legend: {
            position: 'bottom',
            fontSize: '16px',
            floating: false,
            onItemHover: {
                highlightDataSeries: false,
            },
        },
        tooltip: {
            enabled: true,
            style: {
                fontFamily: 'Atma',
                fontSize: '16px',
            },
        },
        series: [
            {
                name: 'Natürlich 🌞',
                data: seriesDataNaturalSunrise,
            },
            {
                name: 'Terrarium 🌞',
                data: seriesDataLocalSunrise,
            },
            {
                name: 'Lampe 🌞',
                data: seriesDataOn,
            },
            {
                name: 'Natürlich 🌚',
                data: seriesDataNaturalSunset,
            },
            {
                name: 'Terrarium 🌚',
                data: seriesDataLocalSunset,
            },
            {
                name: 'Lampe 🌚',
                data: seriesDataOff,
            },
        ],
        colors: [
            'oklch(68.12% 0.07 134.27deg)',
            'oklch(78% 0.09 69.51deg)',
            'oklch(68.49% 0.11 21.67deg)',
            'oklch(46.16% 0.07 134.91deg)',
            'oklch(62.11% 0.07 70.73deg)',
            'oklch(43.24% 0.12 23.56deg)',
        ],
        stroke: {
            width: [2, 2, 4, 2, 2, 4],
            dashArray: [4, 4, 0, 4, 4, 0],
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Monat',
                style: {
                    fontSize: '14px',
                },
            },
            labels: {
                datetimeFormatter: {
                    year: "MMM 'yy",
                },
                style: {
                    fontSize: '14px',
                    cssClass: 'font-normal',
                },
            },
        },
        yaxis: {
            reversed: true,
            min: 0,
            max: 24,
            tickAmount: 8,
            title: {
                text: 'Stunde',
                style: {
                    fontSize: '14px',
                },
            },
            labels: {
                style: {
                    fontSize: '14px',
                },
                formatter: convertToHourMinute,
            },
        },
    };

    onMount(async () => {
        // Only render on client
        if (browser) {
            const ApexCharts = (await import('apexcharts')).default;
            chart = new ApexCharts(chartElement, options);
            await chart.render();
        }
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div class="p-10" bind:this={chartElement}></div>

<style>
    :global(.apexcharts-legend) {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }
</style>
