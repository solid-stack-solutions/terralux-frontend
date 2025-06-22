import { writable, get } from 'svelte/store';

const LOCALSTORAGE_KEY = 'backendUrl';
const DEFAULT_URL = 'https://localhost:5000';

// read inital value from localStorage or return fallback
const initial = localStorage.getItem(LOCALSTORAGE_KEY) || DEFAULT_URL;

const backendUrl = writable<string>(initial);

// save automatically when value changes
backendUrl.subscribe((value) => {
	localStorage.setItem(LOCALSTORAGE_KEY, value);
});

function setBackendUrl(newUrl: string) {
	backendUrl.set(newUrl);
}

function getBackendUrl(): string {
	return get(backendUrl); 
}

// Backend endpoints
const plugPower = "plug/power";
const configuration = "configuration";
const today = "today";

/**
 * Collection of useable backend API endpoints
 */
const endpoints = {
    get: {
        configuration_today: configuration + today,
        power_state: plugPower,
    },
    put: {
        configuration: configuration,
        power_state: plugPower,
    }
};

export { backendUrl, setBackendUrl, getBackendUrl, endpoints };
