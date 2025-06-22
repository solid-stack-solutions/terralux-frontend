// Import 🐦
import { ConstantBackoff, handleAll, retry } from 'cockatiel';

const retryPolicy = retry(handleAll, {
    maxAttempts: 10, // Try 10 times
    backoff: new ConstantBackoff(1000), // Wait 1s after each try
});

async function tryFetching(
    url: string,
    method: string,
    body: string,
    query: any,
) {
    if (query) {
        url = url + '?' + new URLSearchParams(query).toString();
    }
    return await retryPolicy.execute(async () => {
            return await fetch(
                new Request(url, {
                    method: method,
                    headers: {
                        'Content-Type': body === undefined ? 'text/plain' : 'application/json',
                    },
                    body: body ? JSON.stringify(body) : '',
                }),
            );
    });
}

export { tryFetching };
