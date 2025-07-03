import { endpoints, getBackendUrl } from '$lib/backend-util';
import { HTTP_METHOD } from '$lib/fetching-util';
import { redirect, type Load } from '@sveltejs/kit';

/**
 * Redirects to the monitor page if backend is configured. If backend not available,
 * or not configured, the page will load normally.
 */
export const load: Load = async ({ fetch }) => {
    let response;
    try {
        // Do not use retry policy to prevent long page loading
        response = await fetch(
            // Use power state since this returns quickly
            getBackendUrl() + endpoints.get.power_state,
            { method: HTTP_METHOD.GET.toString() },
        );
    } catch (e) {
        console.warn(e);
        return;
    }

    if (response && response.status !== 409) {
        throw redirect(307, '/monitor');
    }
};
