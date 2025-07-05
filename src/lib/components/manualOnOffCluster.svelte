<script lang="ts">
    import { changePlugState, getPlugState } from '$lib/backend-api';
    import type { PowerState } from '$lib/data-types';
    import { onDestroy, onMount } from 'svelte';
    import { Lightbulb, LightbulbOff } from '@lucide/svelte';

    let {
        background_styles = null,
        indicator = true,
    }: { background_styles?: string | null; indicator?: boolean } = $props();

    let loading = $state(true);
    let currentPowerState: boolean = $state(false);
    let pollIntervall: number;
    const onColor = 'var(--color-yellow-500)';
    const offColor = 'var(--color-surface-300)';

    function changeState(power: boolean) {
        changePlugState(power);
        currentPowerState = power;
    }

    async function getPowerState() {
        const data: PowerState = await getPlugState();
        currentPowerState = data.power;
    }

    onMount(async () => {
        loading = true;
        const data: PowerState = await getPlugState();
        currentPowerState = data.power;
        loading = false;
        pollIntervall = setInterval(() => {
            getPowerState;
        }, 500);
    });

    onDestroy(() => {
        clearInterval(pollIntervall);
    });
</script>

<div class="flex flex-col rounded-md {background_styles}">
    {#if indicator}
        <div class="flex flex-row px-2 pt-2">
            <div class="bg-surface-700 flex w-full justify-center rounded-md py-1">
                {#if currentPowerState}
                    <Lightbulb color={onColor} />
                {:else}
                    <LightbulbOff color={offColor} />
                {/if}
            </div>
        </div>
    {/if}
    <div class="flex flex-row space-x-1 p-2 {loading ? 'animate-pulse cursor-not-allowed' : ''}">
        <button
            type="button"
            class="btn preset-filled-success-500 w-1/2 font-semibold"
            disabled={loading || currentPowerState}
            onclick={() => changeState(true)}
        >
            Ein
        </button>
        <button
            type="button"
            class="btn preset-filled-error-500 w-1/2 font-semibold"
            disabled={loading || !currentPowerState}
            onclick={() => changeState(false)}
        >
            Aus
        </button>
    </div>
</div>
