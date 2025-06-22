<script lang="ts">
    import '../app.css';

    let { children } = $props();

    const BLOB_COUNT = 100;
    const BLOB_CANVAS_WIDTH = 5000;
    const BLOB_CANVAS_HEIGHT = 2000;
    const MIN_DISTANCE_FACTOR = 0.8; // adjust how tightly blobs can be placed

    type Blob = {
        size: number;
        top: number;
        left: number;
        colorClass: string;
        opacity: number;
        blur: string;
    };

    const blobs: Blob[] = [];

    for (let i = 0; i < BLOB_COUNT; i++) {
        let attempts = 0;
        let valid = false;
        let blob: Blob | null = null;

        while (attempts < 20 && !valid) {
            const size = Math.floor(Math.random() * 200) + 200; // 200-400
            const radius = size / 2;
            const top = Math.floor(Math.random() * (BLOB_CANVAS_HEIGHT - size));
            const left = Math.floor(Math.random() * (BLOB_CANVAS_WIDTH - size));

            blob = {
                size,
                top,
                left,
                colorClass: Math.random() > 0.5 ? 'bg-primary-700' : 'bg-primary-800',
                opacity: Math.random() * 0.1 + 0.1,
                blur: ['blur-2xl', 'blur-2xl', 'blur-3xl'][Math.floor(Math.random() * 3)],
            };

            // check if the new blob overlaps with existing blobs
            valid = blobs.every((existing) => {
                const dx = existing.left + existing.size / 2 - (left + radius);
                const dy = existing.top + existing.size / 2 - (top + radius);
                const dist = Math.sqrt(dx * dx + dy * dy);
                return dist > ((existing.size + size) / 2) * MIN_DISTANCE_FACTOR;
            });

            attempts++;
        }

        if (valid && blob) blobs.push(blob);
    }

    import { onMount } from 'svelte';
    import { loadConfig } from '$lib/load-config';
    import { backendUrl } from '$lib/backend-util';
    // read and cache persistent configuration into store
    onMount(async () => {
        const config = await loadConfig();
        backendUrl.set(config.backendUrl);
    });
</script>

<div class="bg-background-800 relative h-screen w-full overflow-hidden">
    <!-- Static blob canvas -->
    <div
        class="pointer-events-none absolute top-1/2 left-1/2"
        style={`width: ${BLOB_CANVAS_WIDTH}px; height: ${BLOB_CANVAS_HEIGHT}px; transform: translate(-50%, -50%);`}
    >
        {#each blobs as blob}
            <div
                class={`absolute rounded-full ${blob.colorClass} ${blob.blur}`}
                style={`
          width: ${blob.size}px;
          height: ${blob.size}px;
          top: ${blob.top}px;
          left: ${blob.left}px;
          opacity: ${blob.opacity};
        `}
            ></div>
        {/each}
    </div>

    <!-- Foreground content -->
    <div class="relative z-1 container mx-auto w-full max-w-4xl p-5 text-white">
        {@render children()}
    </div>
</div>
