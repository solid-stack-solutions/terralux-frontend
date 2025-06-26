<script lang="ts">
    import { goto } from '$app/navigation';
    import ConfigIpModal from '$lib/components/configIpModal.svelte';
    import { Copyright } from '@lucide/svelte';

    function onConfirmIP(e: MouseEvent) {
        goto('/configure');
    }
</script>

<section class="mx-auto max-w-6xl">
    <h1 class="text-center text-6xl font-bold">Terralux</h1>

    <div class="mt-12 flex flex-col gap-16 px-4 lg:flex-row">
        <div class="flex-1">
            <p class="mt-4 text-4xl font-medium">
                Die smarte <br />
                <strong class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-tertiary-500">ALL IN ONE</strong> Lampensteuerung für dein Reptil.
            </p>
            <p class="mt-2 text-2xl opacity-60">
                Mit dem Terralux Smartplug <Copyright class="w-5 h-5 -ml-1 pb-1 inline" /> passt sich dein Terrarium automatisch dem biologischen
                Rhythmus deines Reptils an.
            </p>
            <div class="mt-16 flex justify-center">
                <ConfigIpModal triggerText="Jetzt durchstarten 🚀" onConfirm={onConfirmIP} />
            </div>
        </div>

        <div class="flex flex-1 justify-center">
            <img
                src="image/geckoOnLanding.jpg"
                alt="Ein Reptil auf einem Ast"
                class="border-tertiary-contrast-200 rounded-xl border-2 object-cover shadow-2xl"
            />
        </div>
    </div>
</section>
