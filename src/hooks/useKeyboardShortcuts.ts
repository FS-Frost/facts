import { useEffect } from "react";

// Elements where arrows already have a native meaning (caret movement, option change).
const TEXT_ENTRY = "input, textarea, select, [contenteditable]";
// Space also clicks buttons/links and toggles <details>.
const SPACE_TARGETS = `${TEXT_ENTRY}, button, a, summary`;

// Maps KeyboardEvent.code (e.g. "Space", "ArrowLeft") to an action.
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>, enabled: boolean) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            const action = shortcuts[e.code];
            if (action == null || e.repeat || e.ctrlKey || e.altKey || e.metaKey) {
                return;
            }

            const nativeTargets = e.code === "Space" ? SPACE_TARGETS : TEXT_ENTRY;
            if (e.target instanceof Element && e.target.closest(nativeTargets)) {
                return;
            }

            e.preventDefault();
            action();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts, enabled]);
}
