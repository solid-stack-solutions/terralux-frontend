import { tryFetching, HTTP_METHOD } from '$lib/fetching-util';
import { getBackendUrl, endpoints } from '$lib/backend-util';
import type { PlugConfiguration, PlugTimer, PowerState } from '$lib/data-types';

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

/**
 * Fetches the current power state of the plug
 * @returns the backend response as a {@link Promise<PowerState>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function getPlugState(): Promise<PowerState> {
    return await (
        await tryFetching(getBackendUrl() + endpoints.get.power_state, HTTP_METHOD.GET, null, '')
    ).json();
}

/**
 * Requests top change the configuration of the plug
 * @param configuration the new configuration
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function changeConfiguration(configuration: PlugConfiguration): Promise<Response> {
    const params: Record<string, string> = {
        plug_url: configuration.plug_url,
        natural_factor: configuration.natural_factor.toString(),
        local_latitude: configuration.local_latitude.toString(),
        local_longitude: configuration.local_longitude.toString(),
        natural_latitude: configuration.natural_latitude.toString(),
        natural_longitude: configuration.natural_longitude.toString(),
    };

    return await tryFetching(
        getBackendUrl() + endpoints.put.configuration,
        HTTP_METHOD.PUT,
        null,
        params,
    );
}

/**
 * Fetches the plug configuration
 * @param full if true -- fetches the full configuration, otherwise the configuration for the current day
 * @returns the backend response as a {@link Promise<Response>}. Consult backend API documentation for response code semantics (https://github.com/solid-stack-solutions/terralux-backend)
 */
async function getConfiguration(full: boolean = false): Promise<Response> {
    return await tryFetching(
        getBackendUrl() + (full ? endpoints.get.configuration : endpoints.get.configuration_today),
        HTTP_METHOD.GET,
        null,
        '',
    );
}

/**
 * Fetches the full plug configuration
 * @returns the configuration as a {@link Promise<PlugConfiguration>} of the plug with all plug timers included
 */
async function getFullConfiguration(): Promise<PlugConfiguration> {
    return (await getConfiguration(true)).json();
}

/**
 * Fetches the plug configuration of the current day
 * @returns the on- and off-timer as a as a {@link Promise<PlugTimer>} of the current day
 */
async function getTodayConfiguration(): Promise<PlugTimer> {
    return (await getConfiguration(false)).json();
}

export {
    changePlugState,
    getPlugState,
    changeConfiguration,
    getFullConfiguration,
    getTodayConfiguration,
};
