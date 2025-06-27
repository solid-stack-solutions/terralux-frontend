import { tryFetching, HTTP_METHOD } from './fetching-util';
import { getBackendUrl, endpoints } from './backend-util';
import type { PlugConfiguration } from './data-types';
/**
 * Requests to change the power state of the plug
 * @param power the power state the plug should be switched to
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changePlugState(power: boolean): Promise<Response> {
    return await tryFetching(getBackendUrl() + endpoints.put.power_state, HTTP_METHOD.PUT, null, {
        power: power.toString(),
    });
}

async function getPlugState(): Promise<Response> {
    return await tryFetching(
        getBackendUrl() + endpoints.get.power_state,
        HTTP_METHOD.GET,
        null,
        '',
    );
}

/**
 * Requests top change the configuration of the plug
 * @param configuration the new configuration
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changeConfiguration(configuration:PlugConfiguration): Promise<Response> {
    return await tryFetching(getBackendUrl() + endpoints.put.configuration, HTTP_METHOD.PUT, JSON.stringify(configuration), '');
};

/**
 * Fatches the plug configuration
 * @param full if true -- fetches the full configuration, otherwise the configuration for the current day
 * @returns the fetched configuration
 */
async function getConfiguration(full: boolean = false): Promise<Response> {
    return await tryFetching(getBackendUrl() + (full ? endpoints.get.configuration :  endpoints.get.configuration_today), HTTP_METHOD.GET, null, '');
}

async function getFullConfiguration() {
    return await getConfiguration(true);
}

async function getTodayConfiguration() {
    return await getConfiguration(false);
}


export { changePlugState, getPlugState, changeConfiguration, getFullConfiguration, getTodayConfiguration };
