// Import 🐦
import { ConstantBackoff, handleAll, retry } from 'cockatiel';

const retryPolicy = retry(handleAll, {
    maxAttempts: 3, // Try 3 times
    backoff: new ConstantBackoff(50), // Wait 50ms after each try
});

async function tryFetching(
    url: string,
    method: string,
    body: string,
    restricted: boolean,
    query: any,
) {
    if (query) {
        url = url + '?' + new URLSearchParams(query).toString();
    }
    return await retryPolicy.execute(async () => {
        if (method === 'GET' || query || method === undefined) {
            return await fetch(
                new Request(url, {
                    method: method ?? 'GET', // Default to GET
                    credentials: restricted ? 'include' : 'omit',
                }),
            );
        } else {
            return await fetch(
                new Request(url, {
                    method: method,
                    credentials: restricted ? 'include' : 'omit',
                    headers: {
                        'Content-Type': body === undefined ? 'text/plain' : 'application/json',
                    },
                    body: body ? JSON.stringify(body) : '',
                }),
            );
        }
    });
}

// Fetch with credentials
async function tryFetchingRestricted(url: string, method: string, body: any, query: any) {
    return await tryFetching(url, method, body, true, query);
}

// Fetch without credentials
async function tryFetchingPublic(url: string, method: string, body: any, query: any) {
    return await tryFetching(url, method, body, false, query);
}

export { tryFetchingPublic, tryFetchingRestricted };
