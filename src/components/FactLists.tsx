import { useState } from "react";
import { FactResponse } from "../FactsClient";
import { iconButton } from "./FactActions";
import { StarIcon } from "./icons";

type ListTab = "history" | "favorites";

interface FactListsProps {
    history: FactResponse[];
    favorites: FactResponse[];
    selectedId: string | null;
    isFavorite: (id: string) => boolean;
    onSelect: (fact: FactResponse) => void;
    onToggleFavorite: (fact: FactResponse) => void;
    onClearHistory: () => void;
}

function tabClass(isActive: boolean): string {
    const base = "rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-indigo-500";
    return isActive
        ? `${base} bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white`
        : `${base} text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`;
}

function FactLists({ history, favorites, selectedId, isFavorite, onSelect, onToggleFavorite, onClearHistory }: FactListsProps) {
    const [tab, setTab] = useState<ListTab>("history");
    const [isConfirmingClear, setIsConfirmingClear] = useState<boolean>(false);

    const facts = tab === "history" ? history : favorites;
    const emptyMessage = tab === "history" ? "No facts yet." : "No favorites yet. Use the star on a fact to save it.";

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/20">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-700/60" role="tablist">
                    <button type="button" role="tab" aria-selected={tab === "history"} className={tabClass(tab === "history")} onClick={() => setTab("history")}>
                        History ({history.length})
                    </button>
                    <button type="button" role="tab" aria-selected={tab === "favorites"} className={tabClass(tab === "favorites")} onClick={() => setTab("favorites")}>
                        Favorites ({favorites.length})
                    </button>
                </div>

                {tab === "history" && history.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                        {isConfirmingClear ? (
                            <>
                                <span className="text-slate-500 dark:text-slate-300">Clear all?</span>
                                <button
                                    type="button"
                                    className="rounded-md px-2 py-1 font-medium text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-400/10"
                                    onClick={() => {
                                        onClearHistory();
                                        setIsConfirmingClear(false);
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                                    onClick={() => setIsConfirmingClear(false)}
                                >
                                    No
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                onClick={() => setIsConfirmingClear(true)}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div role="tabpanel" aria-label={tab === "history" ? "History" : "Favorites"}>
                {facts.length === 0 ? (
                    <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">{emptyMessage}</p>
                ) : (
                    <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-700">
                        {facts.map((fact) => {
                            const isSelected = fact.id === selectedId;
                            const favorite = isFavorite(fact.id);
                            return (
                                <li key={fact.id} className="flex items-start gap-2 py-1">
                                    <button
                                        type="button"
                                        className={`flex-1 rounded-lg px-3 py-2 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                                            isSelected
                                                ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-400/15 dark:text-indigo-100"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-700/60"
                                        }`}
                                        onClick={() => onSelect(fact)}
                                        aria-current={isSelected ? "true" : undefined}
                                    >
                                        <span className="line-clamp-2">{fact.text}</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`${iconButton} shrink-0 ${favorite ? "text-amber-500 dark:text-amber-300" : ""}`}
                                        onClick={() => onToggleFavorite(fact)}
                                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                                        aria-pressed={favorite}
                                    >
                                        <StarIcon filled={favorite} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default FactLists;
