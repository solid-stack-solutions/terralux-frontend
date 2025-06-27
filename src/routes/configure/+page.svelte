<script lang="ts">
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import { LatLng } from 'leaflet';
    import { Slider } from '@skeletonlabs/skeleton-svelte';

    let natCoords: LatLng | null = null;
    let terrCoords: LatLng | null = null;

    let sliderValue = $state([30]);
</script>

<section class="mx-auto max-w-5xl">
    <h1 class="mb-10 text-center text-6xl font-bold">Terralux Konfigurator</h1>

    <div class="flex flex-col items-center gap-4">
        <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Natürlicher Standort</h2>
                <div class="aspect-[6/5] w-full shadow">
                    <LocationPicker onSelect={(pos) => (natCoords = pos)} />
                </div>
            </div>

            <div class="flex flex-col">
                <h2 class="mb-2 text-center text-xl font-semibold">Terrarium Standort</h2>
                <div class="aspect-[6/5] w-full shadow">
                    <LocationPicker onSelect={(pos) => (terrCoords = pos)} />
                </div>
            </div>
        </div>

        <p class="text-center text-sm opacity-60">
            Klicke auf die Karten, um eine Position auszuwählen
        </p>
    </div>

    <p class="mt-10 text-xl font-bold">Natürlichkeitsfaktor</p>
    <p class="mb-5 text-sm opacity-60">
        Der Natürlichkeitsfaktor bestimmt wie stark sich die Schaltzeiten der Lampen im Terrarium
        an den biologischen Rhythmus des Reptils anpassen. <br /> Hier wird zwischen
        <strong>0 % für lokale Zeiten</strong>
        und <strong>100 % für das natürliche Habitat</strong> unterschieden.
    </p>

    <section class="flex items-center gap-2">
        <p class="text-lg opacity-60">Lokal</p>
        <Slider
            name="Slider Natürlichkeitsfaktor"
            value={sliderValue}
            onValueChange={(e) => (sliderValue = e.value)}
            markers={[0, 25, 50, 75, 100]}
            markText="text-sm"
            markOpacity="opacity-60"
            meterBg="bg-primary-500"
            height="h-4"
            thumbSize="size-6"
        />
        <p class="text-lg opacity-60">Natürlich</p>
    </section>
</section>
