import { writable, get } from 'svelte/store';

const initial = 'http://localhost:5000/';
const backendUrl = writable<string>(initial);

function setBackendUrl(newUrl: string) {
    backendUrl.set(newUrl);
}

function getBackendUrl(): string {
    return get(backendUrl);
}

// Backend endpoints
const plugPower = 'plug/power';
const configuration = 'configuration/';
const today = 'today';

/**
 * Collection of useable backend API endpoints
 */
const endpoints = {
    get: {
        configuration_today: configuration + today,
        configuration: configuration,
        power_state: plugPower,
    },
    put: {
        configuration: configuration,
        power_state: plugPower,
    },
};

export { backendUrl, setBackendUrl, getBackendUrl, endpoints };
