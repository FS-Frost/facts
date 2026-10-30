import { FactView } from "../hooks/useFacts";

interface DebugPanelProps {
    isLoading: boolean;
    view: FactView | null;
}

function DebugPanel({ isLoading, view }: DebugPanelProps) {
    const raw = isLoading || view == null ? "Loading..." : JSON.stringify(view.response, null, 2);

    return (
        <details className="rounded-lg border border-slate-200 bg-white text-sm dark:border-slate-700 dark:bg-slate-800/60">
            <summary className="cursor-pointer px-4 py-2 text-slate-500 select-none hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                Debug
            </summary>
            <pre className="overflow-x-auto border-t border-slate-200 p-4 text-xs dark:border-slate-700 dark:text-slate-200">{raw}</pre>
        </details>
    );
}

export default DebugPanel;
