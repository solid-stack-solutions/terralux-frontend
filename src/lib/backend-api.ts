import { tryFetching, HTTP_METHOD } from './fetching-util';
import { getBackendUrl, endpoints } from './backend-util';
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

export { changePlugState };
