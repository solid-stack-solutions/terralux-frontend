// Import 🐦
import { ConstantBackoff, handleAll, retry } from 'cockatiel';

enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

const retryPolicy = retry(handleAll, {
    maxAttempts: 10, // Try 10 times
    backoff: new ConstantBackoff(1000), // Wait 1s after each try
});

async function tryFetching(url: string, method: HTTP_METHOD, body: string | null, query: any) {
    if (query) {
        url = url + '?' + new URLSearchParams(query).toString();
    }
    return await retryPolicy.execute(async () => {
        return await fetch(
            new Request(url, {
                method: method ? method.toString() : HTTP_METHOD.GET.toString(),
                headers: {
                    'Content-Type': body === null ? 'text/plain' : 'application/json',
                },
                body: body ? JSON.stringify(body) : '',
            }),
        );
    });
}

export { tryFetching, HTTP_METHOD };
