<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import { ipState } from '../../routes/configure/ipstate.svelte';
    import { onMount } from 'svelte';
    import { Info } from '@lucide/svelte';

    // == Form control ==
    // svelte-ignore non_reactive_update because it does not need to be reactive`
    let ipAddress = '';
    let error = $state(false);
    const errorMessage = 'Bitte gib eine gültige IPv4-Adresse ein.';

    function isIPV4Address(ip: string): boolean {
        // Match up to 255.255.255.255
        const ipv4Regex =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipv4Regex.test(ip);
    }

    function handleConfirm(e: SubmitEvent) {
        e.preventDefault();
        if (!isIPV4Address(ipAddress)) {
            error = true;
            return;
        }
        error = false;
        ipState.ipAddress = ipAddress;
        if (onConfirm) onConfirm(e);
    }

    /**
     * Set the error state to `false` when it is currently `true` and IP address is now valid.
     */
    function refreshOnError() {
        if (!error) return;
        error = !isIPV4Address(ipAddress);
    }

    let {
        triggerText = 'Jetzt durchstarten 🚀',
        hideButton = false,
        openState = $bindable(false),
        onConfirm,
    }: {
        triggerText?: string;
        hideButton?: boolean;
        openState?: boolean;
        onConfirm?: (e: SubmitEvent) => void;
    } = $props();

    // Initialisation
    onMount(() => {
        ipAddress = ipState.ipAddress;
    });
</script>

<Modal
    open={openState}
    onOpenChange={(e) => (openState = e.open)}
    triggerBase={hideButton ? 'invisible! block w-0 h-0' : 'btn preset-filled-primary-500 text-2xl font-semibold'}
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet trigger()}
        {triggerText}
    {/snippet}
    {#snippet content()}
        <header class="flex justify-between">
            <h2 class="text-3xl font-bold">Steckdose verbinden</h2>
        </header>
        <form onsubmit={handleConfirm}>
            <article class="pb-4">
                <p>
                    <span class="text-lg">
                        Gib die IP-Adresse deiner Steckdose ein, um dich mit ihr zu verbinden.
                    </span><br />
                    <span class="text-sm opacity-60">
                        <Info class="mb-0.5 inline w-4" /> Die Steckdose muss sich im gleichen Netzwerk
                        befinden. Du kannst die IP-Adresse der Steckdose in den Router Einstellungen
                        finden.
                    </span>
                </p>
                <label class="label pt-5">
                    <span class="label-text text-sm">IPv4-Adresse</span>
                    <input
                        type="text"
                        class="input font-mono {error ? 'ring-error-500 focus:ring-error-500' : ''}"
                        minlength="7"
                        maxlength="15"
                        required
                        aria-required="true"
                        placeholder="192.168.178.1"
                        bind:value={ipAddress}
                        oninput={refreshOnError}
                    />
                    {#if error}
                        <p class="text-error-500">
                            {errorMessage}
                        </p>
                    {/if}
                </label>
            </article>
            <footer class="flex justify-end gap-4">
                <button
                    type="button"
                    class="btn preset-filled-surface-500 font-semibold"
                    onclick={() => (openState = false)}
                >
                    Abbrechen
                </button>
                <button type="submit" class="btn preset-filled-success-500 font-semibold">
                    Bestätigen
                </button>
            </footer>
        </form>
    {/snippet}
</Modal>
