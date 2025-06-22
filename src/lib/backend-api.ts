import { tryFetchingPublic } from './fetching-util';
import { getBackendUrl, endpoints } from './backend-util';
/**
 * Requests to change the power state of the plug
 * @param {boolean} power the power state the plug should be switched to
 * @returns {Promise<Response>} the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changePlugState(power: boolean) {
    return await tryFetchingPublic(getBackendUrl() + endpoints.put.power_state, 'PUT', undefined, {
        power: power,
    });
}

export { changePlugState };
