import { useEffect, useRef, useState } from "react";
import { FactClientResponse, FactResponse, getRandomFact, getTodayFact } from "../FactsClient";

export type FactSource = "today" | "random";

export interface FactView {
    response: FactClientResponse;
    receivedAt: Date;
}

export const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "de", label: "German" },
];

const LANGUAGE_KEY = "language";

function readLanguage(): string {
    try {
        const stored = localStorage.getItem(LANGUAGE_KEY);
        return LANGUAGES.some((l) => l.value === stored) ? stored! : "en";
    } catch {
        return "en";
    }
}

export function useFacts(onLoaded: (fact: FactResponse) => void) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [language, setLanguage] = useState<string>(readLanguage);
    const [source, setSource] = useState<FactSource>("today");
    const [requestId, setRequestId] = useState<number>(0);
    const [view, setView] = useState<FactView | null>(null);

    // Keep the latest callback without refetching when its identity changes.
    const onLoadedRef = useRef(onLoaded);
    useEffect(() => {
        onLoadedRef.current = onLoaded;
    });

    useEffect(() => {
        try {
            localStorage.setItem(LANGUAGE_KEY, language);
        } catch {
            // Storage unavailable: language still applies for this session.
        }
    }, [language]);

    useEffect(() => {
        // Aborting on cleanup drops stale responses (language change, StrictMode double run).
        const controller = new AbortController();

        const load = async () => {
            setIsLoading(true);
            const fetchFact = source === "today" ? getTodayFact : getRandomFact;
            const response = await fetchFact(language, controller.signal);
            if (controller.signal.aborted) {
                return;
            }

            setView({ response, receivedAt: new Date() });
            setIsLoading(false);
            if (response.kind === "ok") {
                onLoadedRef.current(response.json);
            }
        };

        load();
        return () => controller.abort();
    }, [language, source, requestId]);

    const load = (nextSource: FactSource) => {
        setSource(nextSource);
        setRequestId((id) => id + 1);
    };

    return { isLoading, language, setLanguage, source, view, load };
}
