<script lang="ts">
    import { Slider } from '@skeletonlabs/skeleton-svelte';

    let {
        sliderValue = $bindable(0.5),
        disabled = false,
    }: { sliderValue?: number; disabled?: boolean } = $props();
</script>

<section class="flex items-center gap-2 pb-10">
    <p class="text-lg opacity-60">Lokal</p>
    <Slider
        name="Slider Natürlichkeitsfaktor"
        value={[sliderValue * 100]}
        onValueChange={(e) => (sliderValue = e.value[0] / 100)}
        readOnly={disabled}
        markers={[0, 25, 50, 75, 100]}
        markText="text-sm"
        markOpacity="opacity-60"
        trackBg="bg-gradient-to-r from-surface-800 to-surface-700"
        meterBg="bg-primary-500"
        height="h-4"
        thumbSize={disabled ? 'size-0' : 'size-6'}
        step={5}
    />
    <p class="text-lg opacity-60">Natürlich</p>
</section>
