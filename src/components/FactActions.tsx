import { useEffect, useState } from "react";
import { FactResponse } from "../FactsClient";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, ShareIcon, StarIcon } from "./icons";

interface FactActionsProps {
    fact: FactResponse | null;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onOlder?: () => void;
    onNewer?: () => void;
}

export const iconButton =
    "inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-500 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";

const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

function FactActions({ fact, isFavorite, onToggleFavorite, onOlder, onNewer }: FactActionsProps) {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timeout = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [copied]);

    const copy = async () => {
        if (fact == null) {
            return;
        }

        try {
            await navigator.clipboard.writeText(`${fact.text}\n${fact.permalink}`);
            setCopied(true);
        } catch (error) {
            console.error(error);
        }
    };

    const share = () => {
        if (fact == null) {
            return;
        }

        // Rejects with AbortError when the user closes the share sheet; nothing to do.
        navigator.share({ title: "Random fact", text: fact.text, url: fact.permalink }).catch(() => {});
    };

    return (
        <div className="flex items-center gap-1">
            <button type="button" className={iconButton} onClick={onOlder} disabled={onOlder == null} aria-label="Older fact" aria-keyshortcuts="ArrowLeft" title="Older (←)">
                <ChevronLeftIcon />
            </button>
            <button type="button" className={iconButton} onClick={onNewer} disabled={onNewer == null} aria-label="Newer fact" aria-keyshortcuts="ArrowRight" title="Newer (→)">
                <ChevronRightIcon />
            </button>

            <span className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-600" aria-hidden="true" />

            <button
                type="button"
                className={`${iconButton} ${isFavorite ? "text-amber-500 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200" : ""}`}
                onClick={onToggleFavorite}
                disabled={fact == null}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={isFavorite}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <StarIcon filled={isFavorite} />
            </button>
            <button type="button" className={iconButton} onClick={copy} disabled={fact == null} aria-label={copied ? "Copied" : "Copy fact"} title="Copy">
                {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
            {canShare && (
                <button type="button" className={iconButton} onClick={share} disabled={fact == null} aria-label="Share fact" title="Share">
                    <ShareIcon />
                </button>
            )}
        </div>
    );
}

export default FactActions;
