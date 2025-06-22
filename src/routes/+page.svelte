<script>
    import ManualOnOffCluster from '../components/manualOnOffCluster.svelte';
</script>

<div class="flex justify-center">
    <h1 class="text-6xl font-bold">Terralux</h1>
</div>

<div class="mt-8 flex flex-col gap-8 px-4 lg:flex-row">
    <div class="flex-1">
        <p class="mt-4 text-3xl font-medium">
            Die smarte <strong class="font-bold">all-in-one</strong> Lampensteuerung für dein Reptil.
        </p>
        <div class="mt-6 flex justify-center">
            <button type="button" class="btn preset-filled-primary-500 text-3xl">
                Jetzt starten
            </button>
        </div>
    </div>

    <div class="flex flex-1 justify-center">
        <img
            src="image/reptileOnBranch.png"
            alt="Ein Reptil auf einem Ast"
            class="h-63 rounded object-cover" />
    </div>
    <ManualOnOffCluster></ManualOnOffCluster>
</div>

<div class="bg-primary-500 h-20 w-20"></div>
<div class="bg-secondary-500 h-20 w-20"></div>
<div class="bg-tertiary-500 h-20 w-20"></div>
