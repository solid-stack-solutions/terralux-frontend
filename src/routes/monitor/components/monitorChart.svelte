<!--
@component
Make sure to add `export const ssr = false` to the page when using this component.
The chart can not be rendered on the server.
-->
<script lang="ts">
    import apexchartsLocaleDE from '$lib/apexcharts-locales/de.json';
    import type { PlugConfiguration } from '$lib/data-types';
    import type { ApexOptions } from 'apexcharts';
    import { default as ApexCharts, default as ApexChartsClass } from 'apexcharts';
    import { onDestroy, onMount } from 'svelte';

    // Prepare data
    function toDecimalTime(hour: number, minute: number): number {
        return hour + minute / 60;
    }

    function mapToDatetimeSeries(values: number[]): { x: Date; y: number }[] {
        return values.map((y, index) => ({
            x: new Date(new Date().getFullYear(), 0, index + 1),
            y,
        }));
    }

    function convertToHourMinute(value: number): string {
        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);
        return `${hours.toString()}:${minutes.toString().padStart(2, '0')}`;
    }

    // Chart
    let chart: ApexChartsClass;
    let chartElement: HTMLDivElement;

    let { configData }: { configData: PlugConfiguration } = $props();

    function getSeriesData(
        configData: PlugConfiguration,
    ): { name: string; data: { x: Date; y: number }[] }[] {
        const seriesDataNaturalSunrise =
            configData.natural_timers?.map((timer) =>
                toDecimalTime(timer.on_time.hour, timer.on_time.minute),
            ) ?? [];
        const seriesDataNaturalSunset =
            configData.natural_timers?.map((timer) =>
                toDecimalTime(timer.off_time.hour, timer.off_time.minute),
            ) ?? [];
        const seriesDataLocalSunrise =
            configData.local_timers?.map((timer) =>
                toDecimalTime(timer.on_time.hour, timer.on_time.minute),
            ) ?? [];
        const seriesDataLocalSunset =
            configData.local_timers?.map((timer) =>
                toDecimalTime(timer.off_time.hour, timer.off_time.minute),
            ) ?? [];
        const seriesDataOn =
            configData.computed_timers?.map((timer) =>
                toDecimalTime(timer.on_time.hour, timer.on_time.minute),
            ) ?? [];
        const seriesDataOff =
            configData.computed_timers?.map((timer) =>
                toDecimalTime(timer.off_time.hour, timer.off_time.minute),
            ) ?? [];

        return [
            { name: 'Natürlich 🌞', data: mapToDatetimeSeries(seriesDataNaturalSunrise) },
            { name: 'Natürlich 🌚', data: mapToDatetimeSeries(seriesDataNaturalSunset) },
            { name: 'Terrarium 🌞', data: mapToDatetimeSeries(seriesDataLocalSunrise) },
            { name: 'Terrarium 🌚', data: mapToDatetimeSeries(seriesDataLocalSunset) },
            { name: 'Lampe 🌞', data: mapToDatetimeSeries(seriesDataOn) },
            { name: 'Lampe 🌚', data: mapToDatetimeSeries(seriesDataOff) },
        ];
    }

    const options: ApexOptions = {
        title: {
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
            toolbar: {
                show: false,
            },
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1,
            },
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
            customLegendItems: ['Natürlich  🌞🌚', 'Terrarium 🌞🌚', 'Lampe 🌞🌚'],
            onItemClick: {
                toggleDataSeries: false,
            },
            markers: {
                offsetX: -5,
                offsetY: -1,
                fillColors: [
                    'var(--color-success-400)',
                    'var(--color-warning-400)',
                    'var(--color-error-400)',
                ],
            },
        },
        grid: {
            borderColor: 'var(--color-surface-400)',
            row: {
                colors: ['var(--color-surface-400)', 'transparent'],
                opacity: 0.05,
            },
        },
        tooltip: {
            enabled: true,
            style: {
                fontFamily: 'Atma',
                fontSize: '16px',
            },
        },
        series: getSeriesData(configData),
        colors: [
            'var(--color-success-400)',
            'var(--color-success-400)',
            'var(--color-warning-400)',
            'var(--color-warning-400)',
            'var(--color-error-400)',
            'var(--color-error-400)',
        ],
        stroke: {
            width: [2.5, 2.5, 2.5, 2.5, 4, 4],
            dashArray: [4, 4, 4, 4, 0, 0],
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
                    year: 'MMM',
                    month: 'MMM',
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
        chart = new ApexCharts(chartElement, options);
        await chart.render();
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div bind:this={chartElement}></div>

<style>
    :global(.apexcharts-legend) {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
    }
</style>
