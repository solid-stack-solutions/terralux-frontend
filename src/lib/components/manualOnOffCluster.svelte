<script lang="ts">
    import { changePlugState, getPlugState } from '$lib/backend-api';
    import type { PowerState } from '$lib/response-types';
    import { onMount } from 'svelte';
    import { Lightbulb, LightbulbOff } from '@lucide/svelte';

    export let background_styles: string | null = null;
    export let indicator: boolean = true;

    let loading = true;
    let currentPowerState: boolean = false;
    let onColor = '';
    let offColor = '';
    function changeState(power: boolean) {
        changePlugState(power);
        currentPowerState = power;
    }

    onMount(async () => {
        loading = true;
        const style = getComputedStyle(document.documentElement);
        onColor = style.getPropertyValue('--color-yellow-500');
        offColor = style.getPropertyValue('--color-surface-300');
        const data: PowerState = await (await getPlugState()).json();
        currentPowerState = data.power;
        loading = false;
    });
</script>

<div class="flex h-fit min-w-fit grow flex-col rounded-md {background_styles}">
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
            class="btn preset-filled-success-500 w-1/2"
            disabled={loading || currentPowerState}
            onclick={() => changeState(true)}
        >
            An
        </button>
        <button
            type="button"
            class="btn preset-filled-error-500 w-1/2"
            disabled={loading || !currentPowerState}
            onclick={() => changeState(false)}
        >
            Aus
        </button>
    </div>
</div>
