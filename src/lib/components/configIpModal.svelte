<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';

    // == Modal control ==
    let openState = $state(false);

    function modalClose() {
        openState = false;
    }

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
        onConfirm(e);
    }

    /**
     * Set the error state to `false` when it is currently `true` and IP address is now valid.
     */
    function refreshOnError() {
        if (!error) return;
        error = !isIPV4Address(ipAddress);
    }

    let {
        triggerText = 'Jetzt starten',
        onConfirm,
    }: { triggerText: string; onConfirm: (e: SubmitEvent) => void } = $props();
</script>

<Modal
    open={openState}
    onOpenChange={(e) => (openState = e.open)}
    triggerBase="btn preset-filled-primary-500 text-3xl"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet trigger()}
        {triggerText}
    {/snippet}
    {#snippet content()}
        <header class="flex justify-between">
            <h2 class="h2">Steckdose verbinden</h2>
        </header>
        <form onsubmit={handleConfirm}>
            <article class="pb-4">
                <p>
                    Gebe die IP-Adresse deiner Steckdose ein, um dich mit ihr zu verbinden.<br />
                    <span class="opacity-60"
                        >Die Steckdose muss sich im gleichen Netzwerk befinden. Du kannst die
                        IP-Adresse der Steckdose in den Router Einstellungen finden.
                    </span>
                </p>
                <label class="label pt-5">
                    <span class="label-text">IPv4-Adresse</span>
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
                <button type="button" class=" btn preset-filled-surface-500" onclick={modalClose}
                    >Cancel</button
                >
                <button type="submit" class="btn preset-filled-success-500">Confirm</button>
            </footer>
        </form>
    {/snippet}
</Modal>
