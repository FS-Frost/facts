import { useState } from "react";
import DebugPanel from "./components/DebugPanel";
import FactActions from "./components/FactActions";
import FactCard from "./components/FactCard";
import FactLists from "./components/FactLists";
import { FactResponse } from "./FactsClient";
import { FactSource, LANGUAGES, useFacts } from "./hooks/useFacts";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useStoredFacts } from "./hooks/useStoredFacts";

const HISTORY_LIMIT = 50;

function sourceTabClass(isActive: boolean): string {
    const base = "rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-indigo-500";
    return isActive
        ? `${base} bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white`
        : `${base} text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`;
}

function Facts() {
    const history = useStoredFacts("history", HISTORY_LIMIT);
    const favorites = useStoredFacts("favorites");
    // A fact picked from history/favorites; null shows the latest fetch result.
    const [selected, setSelected] = useState<FactResponse | null>(null);
    const { isLoading, language, setLanguage, source, view, load } = useFacts(history.add);

    const startLoad = (nextSource: FactSource) => {
        setSelected(null);
        load(nextSource);
    };

    const latest = view?.response.kind === "ok" ? view.response.json : null;
    const fact = selected ?? latest;
    const errorView = selected == null && view?.response.kind !== "ok" ? view : null;

    // Picking the latest fetched fact goes back to the live view.
    const select = (picked: FactResponse) => {
        setSelected(picked.id === latest?.id ? null : picked);
    };

    // History is newest-first: "older" moves down the list, "newer" moves up.
    const index = fact == null ? -1 : history.facts.findIndex((f) => f.id === fact.id);
    const older = index === -1 ? (fact == null ? history.facts[0] : undefined) : history.facts[index + 1];
    const newer = index > 0 ? history.facts[index - 1] : undefined;
    const showOlder = older == null || isLoading ? undefined : () => select(older);
    const showNewer = newer == null || isLoading ? undefined : () => select(newer);

    useKeyboardShortcuts(
        {
            Space: () => startLoad("random"),
            ...(showOlder && { ArrowLeft: showOlder }),
            ...(showNewer && { ArrowRight: showNewer }),
        },
        !isLoading
    );

    const label = selected != null ? "Previously seen" : source === "today" ? "Fact of the day" : "Random fact";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300" htmlFor="languages">
                        Language
                        <select
                            id="languages"
                            name="languages"
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            value={language}
                            onChange={(e) => {
                                setSelected(null);
                                setLanguage(e.target.value);
                            }}
                        >
                            {LANGUAGES.map((l) => (
                                <option key={l.value} value={l.value}>
                                    {l.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="inline-flex rounded-lg bg-slate-200/70 p-1 dark:bg-slate-800" role="group" aria-label="Fact type">
                        <button type="button" className={sourceTabClass(source === "today")} aria-pressed={source === "today"} onClick={() => startLoad("today")} disabled={isLoading}>
                            Today
                        </button>
                        <button type="button" className={sourceTabClass(source === "random")} aria-pressed={source === "random"} onClick={() => startLoad("random")} disabled={isLoading}>
                            Random
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex min-w-32 items-center justify-center gap-3 rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-40 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    onClick={() => startLoad("random")}
                    disabled={isLoading}
                    aria-keyshortcuts="Space"
                >
                    Next
                    <kbd className="hidden rounded border border-white/30 px-1.5 py-0.5 font-sans text-xs font-medium text-white/80 sm:inline" aria-hidden="true">
                        Space
                    </kbd>
                </button>
            </div>

            <FactCard
                isLoading={isLoading}
                label={label}
                fact={fact}
                errorView={errorView}
                actions={
                    <FactActions
                        fact={isLoading ? null : fact}
                        isFavorite={fact != null && favorites.has(fact.id)}
                        onToggleFavorite={() => fact && favorites.toggle(fact)}
                        onOlder={showOlder}
                        onNewer={showNewer}
                    />
                }
            />

            <FactLists
                history={history.facts}
                favorites={favorites.facts}
                selectedId={isLoading ? null : (fact?.id ?? null)}
                isFavorite={favorites.has}
                onSelect={select}
                onToggleFavorite={favorites.toggle}
                onClearHistory={history.clear}
            />

            <DebugPanel isLoading={isLoading} view={view} />
        </div>
    );
}

export default Facts;
