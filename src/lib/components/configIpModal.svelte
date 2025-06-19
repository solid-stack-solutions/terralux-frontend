<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';

    let openState = $state(false);

    function modalClose() {
        openState = false;
    }

    let { triggerText = 'Jetzt starten' } = $props();
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
        <article>
            <p>
                Gebe die IP-Adresse der Steckdose ein, um dich mit ihr zu verbinden.<br />
                <span class="opacity-60"
                    >Die Steckdose muss sich im gleichen Netzwerk befinden. Du kannst die IP-Adresse
                    der Steckdose in den Router Einstellungen finden.</span
                >
            </p>
            <label class="label pt-5">
                <span class="label-text">IP-Adresse</span>
                <input type="text" class="input" placeholder="192.168.178.1" />
            </label>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class=" btn preset-filled-surface-500" onclick={modalClose}
                >Cancel</button
            >
            <button type="button" class="btn preset-filled-success-500" onclick={modalClose}
                >Confirm</button
            >
        </footer>
    {/snippet}
</Modal>
