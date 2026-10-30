import { ReactNode } from "react";
import { FactResponse } from "../FactsClient";
import { FactView } from "../hooks/useFacts";

interface FactCardProps {
    isLoading: boolean;
    label: string;
    fact: FactResponse | null;
    errorView: FactView | null;
    actions: ReactNode;
}

function errorMessage({ response, receivedAt }: FactView): string {
    switch (response.kind) {
        case "rate-limited":
            return `(${receivedAt.toLocaleTimeString()}) Too many attempts! Try again later :)`;
        case "network-error":
            return "Network error. Check your connection and try again.";
        default:
            return "Ups, try again.";
    }
}

// Card height is fixed, so longer facts get a smaller font instead of a taller card.
function textSize(text: string): string {
    if (text.length <= 90) {
        return "text-2xl sm:text-4xl";
    }

    if (text.length <= 180) {
        return "text-xl sm:text-3xl";
    }

    return "text-lg sm:text-2xl";
}

function Skeleton() {
    return (
        <div className="my-auto animate-pulse space-y-4" role="status">
            <span className="sr-only">Loading...</span>
            <div className="h-7 w-full rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-7 w-11/12 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
    );
}

function FactFooter({ fact }: { fact: FactResponse }) {
    const link = "underline decoration-slate-300 underline-offset-4 hover:text-indigo-600 dark:decoration-slate-500 dark:hover:text-indigo-300";

    return (
        <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
            <span>
                Source:{" "}
                {fact.source_url ? (
                    <a className={link} href={fact.source_url} target="_blank" rel="noreferrer">
                        {fact.source}
                    </a>
                ) : (
                    fact.source
                )}
            </span>
            <a className={link} href={fact.permalink} target="_blank" rel="noreferrer">
                Permalink ↗
            </a>
        </figcaption>
    );
}

function FactCard({ isLoading, label, fact, errorView, actions }: FactCardProps) {
    const shownFact = isLoading ? null : fact;

    let content;
    if (shownFact != null) {
        content = <blockquote className={`my-auto leading-snug font-medium text-pretty ${textSize(shownFact.text)}`}>{shownFact.text}</blockquote>;
    } else if (!isLoading && errorView != null) {
        content = (
            <p className="my-auto rounded-lg bg-amber-50 p-4 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200" role="alert">
                {errorMessage(errorView)}
            </p>
        );
    } else {
        content = <Skeleton />;
    }

    return (
        <figure
            className="flex h-80 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:h-96 sm:p-10 sm:pt-6 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/20"
            aria-busy={isLoading}
            aria-live="polite"
        >
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-300">{label}</p>
                {actions}
            </div>
            {/* Scroll is a last resort for very long facts; my-auto centers short ones vertically without clipping. */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{content}</div>
            {shownFact != null && <FactFooter fact={shownFact} />}
        </figure>
    );
}

export default FactCard;
