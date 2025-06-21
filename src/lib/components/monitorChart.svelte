<script lang="ts">
    // https://www.reddit.com/r/sveltejs/comments/n508th/apex_chart_with_sveltekit/

    import { onMount } from 'svelte';
    import type ApexChartsClass from 'apexcharts';

    import type { ApexOptions } from 'apexcharts';

    var options = {
        series: [
            {
                name: 'Desktops',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            },
        ],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left',
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
    };

    let ApexCharts: typeof ApexChartsClass;
    let loaded = false;

    const chart = (node: HTMLElement) => {
        if (!loaded) return;

        const myChart = new ApexCharts(node, options);
        myChart.render();

        return {
            update(newOptions: ApexOptions) {
                myChart.updateOptions(newOptions);
            },
            destroy() {
                myChart.destroy();
            },
        };
    };

    onMount(async () => {
        const module = await import('apexcharts');
        ApexCharts = module.default;
        loaded = true;
    });
</script>

{#if loaded}
    <div use:chart></div>
{:else}
    <p>Diagramm wird geladen …</p>
{/if}
