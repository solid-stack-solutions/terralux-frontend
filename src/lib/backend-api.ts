import { tryFetching, HTTP_METHOD } from './fetching-util';
import { getBackendUrl, endpoints } from './backend-util';
import type { PlugConfiguration } from './response-types';
/**
 * Requests to change the power state of the plug
 * @param power the power state the plug should be switched to
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changePlugState(power: boolean): Promise<Response> {
    return await tryFetching(getBackendUrl() + endpoints.put.power_state, HTTP_METHOD.PUT, null, {
        power: power,
    });
}

/**
 * Requets top change the configuration of the plug
 * @param configuration the new configuration
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changeConfiguration(configuration:PlugConfiguration): Promise<Response> {
    return await tryFetching(getBackendUrl() + endpoints.put.configuration, HTTP_METHOD.PUT, JSON.stringify(configuration), null);
};

export { changePlugState };
