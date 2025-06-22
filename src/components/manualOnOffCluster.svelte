<script lang="ts">
    import { changePlugState, getPlugState } from '$lib/backend-api';
    import type { PowerState } from '$lib/response-types';
    import { onMount } from 'svelte';

    let currentPowerState: boolean = false;
    let loading = false;
    function changeState(power: boolean) {
        changePlugState(power);
    }
    onMount(async () => {
        loading = true;
        const data: PowerState = await (await getPlugState()).json();
        currentPowerState = data.power;
        loading = false;
    });
</script>

<div class="flex-row">
    <div class="flex-col p-2 {loading ? 'animate-pulse cursor-not-allowed' : ''}">
        <button
            type="button"
            class="btn preset-filled-success-500"
            disabled={!currentPowerState || loading}
            onclick={() => changeState(true)}>
            An
        </button>
        <button
            type="button"
            class="btn preset-filled-error-500"
            disabled={currentPowerState || loading}
            onclick={() => changeState(false)}>
            Aus
        </button>
    </div>
</div>
