<script lang="ts">
    import LocationPicker from '$lib/components/locationPicker.svelte';
    import { LatLng } from 'leaflet';
    import { Slider } from '@skeletonlabs/skeleton-svelte';
    import { ShieldAlert } from '@lucide/svelte';

    let natCoords: LatLng | null = null;
    let terrCoords: LatLng | null = null;

    let sliderValue = $state([30]);
</script>

<section class="mx-auto max-w-5xl">
    <h1 class="mb-10 text-center text-6xl font-bold">Terralux Konfigurator</h1>

    <p class="mt-10 text-xl font-bold">Dein Reptil</p>
    <p class="mb-5 text-sm opacity-60">
        <ShieldAlert class="mb-0.5 inline h-4 w-4" /> Keine Sorge, sollte dein Reptil nicht unter der
        Auswahl zu finden sein kannst du einfach den <strong>Standort</strong> manuell auf der Karte
        <i>Natürlicher Standort</i> einstellen.
    </p>

    <section class="flex flex-wrap justify-center gap-4">
        {#each [
            { name: 'Gecko', src: 'image/gecko.jpg' },
            { name: 'Bartagame', src: 'image/bartagame.webp' },
            { name: 'Königspython', src: 'image/koenigspython.jpg' }, 
            { name: 'Grüner Leguan', src: 'image/leguan.jpg', position: 'object-left-top' }] as reptile}
            <div class="flex w-48 flex-col items-center">
                <button
                    type="button"
                    class="border-tertiary-contrast-200 h-40 w-40 overflow-hidden rounded-xl border-2 shadow-2xl"
                >
                    <img
                        src={reptile.src}
                        alt={reptile.name}
                        class="h-full w-full object-cover {reptile.position ?? ''}"
                    />
                </button>
                <span class="mt-2 text-center text-sm opacity-80">{reptile.name}</span>
            </div>
        {/each}
    </section>

    <div class="mt-15 flex flex-col items-center gap-4">
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

    <p class="mt-15 text-xl font-bold">Natürlichkeitsfaktor</p>
    <p class="mb-5 text-sm opacity-60">
        Der Natürlichkeitsfaktor bestimmt wie stark sich die Schaltzeiten der Lampen im Terrarium an
        den biologischen Rhythmus des Reptils anpassen. <br /> Hier wird zwischen
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
