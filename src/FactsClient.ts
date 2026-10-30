export async function getRandomFact(language: string, signal?: AbortSignal): Promise<FactClientResponse> {
    const url = `${URL_RANDOM_FACT}?language=${language}`;
    return getFact(url, signal);
}

export async function getTodayFact(language: string, signal?: AbortSignal): Promise<FactClientResponse> {
    const url = `${URL_TODAY_FACT}?language=${language}`;
    return getFact(url, signal);
}

const URL_RANDOM_FACT = "https://uselessfacts.jsph.pl/api/v2/facts/random";
const URL_TODAY_FACT = "https://uselessfacts.jsph.pl/api/v2/facts/today";

async function getFact(url: string, signal?: AbortSignal): Promise<FactClientResponse> {
    let apiResponse: Response;
    let body: string;

    try {
        apiResponse = await fetch(url, { signal });
        body = await apiResponse.text();
    } catch (error) {
        console.error(error);
        return { kind: "network-error" };
    }

    if (apiResponse.status === 429) {
        return { kind: "rate-limited", status: apiResponse.status };
    }

    if (!apiResponse.ok) {
        console.error(body);
        return { kind: "http-error", status: apiResponse.status };
    }

    try {
        return { kind: "ok", status: apiResponse.status, json: JSON.parse(body) as FactResponse };
    } catch (error) {
        console.error(error);
        return { kind: "invalid-response", status: apiResponse.status };
    }
}

export interface FactResponse {
    id: string;
    text: string;
    source: string;
    source_url: string;
    language: string;
    permalink: string;
}

export type FactClientResponse =
    | { kind: "ok"; status: number; json: FactResponse }
    | { kind: "rate-limited"; status: number }
    | { kind: "http-error"; status: number }
    | { kind: "invalid-response"; status: number }
    | { kind: "network-error" };
