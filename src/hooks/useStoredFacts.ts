import { useEffect, useState } from "react";
import { FactResponse } from "../FactsClient";

function isFact(value: unknown): value is FactResponse {
    const fact = value as FactResponse;
    return typeof value === "object" && value !== null && typeof fact.id === "string" && typeof fact.text === "string";
}

function readFacts(key: string): FactResponse[] {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
        return Array.isArray(parsed) ? parsed.filter(isFact) : [];
    } catch {
        return [];
    }
}

// Newest-first list of facts persisted in localStorage, unique by id.
export function useStoredFacts(key: string, limit = Infinity) {
    const [facts, setFacts] = useState<FactResponse[]>(() => readFacts(key));

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(facts));
        } catch {
            // Storage unavailable (private mode): list still works for this session.
        }
    }, [key, facts]);

    const add = (fact: FactResponse) => {
        setFacts((current) => [fact, ...current.filter((f) => f.id !== fact.id)].slice(0, limit));
    };

    const toggle = (fact: FactResponse) => {
        setFacts((current) =>
            current.some((f) => f.id === fact.id) ? current.filter((f) => f.id !== fact.id) : [fact, ...current].slice(0, limit)
        );
    };

    const has = (id: string) => facts.some((f) => f.id === id);

    const clear = () => setFacts([]);

    return { facts, add, toggle, has, clear };
}
