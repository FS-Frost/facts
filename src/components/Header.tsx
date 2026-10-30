import { Theme, useTheme } from "../hooks/useTheme";

const iconButton =
    "inline-flex size-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";

function ThemeIcon({ theme }: { theme: Theme }) {
    const common = { className: "size-5", fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", "aria-hidden": true };

    if (theme === "light") {
        return (
            <svg {...common}>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
            </svg>
        );
    }

    if (theme === "dark") {
        return (
            <svg {...common}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8m-4-4v4" />
        </svg>
    );
}

function Header() {
    const { theme, cycleTheme } = useTheme();

    return (
        <header className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Random Facts</h1>

            <div className="flex items-center gap-1">
                <button type="button" className={iconButton} onClick={cycleTheme} aria-label={`Theme: ${theme}`} title={`Theme: ${theme}`}>
                    <ThemeIcon theme={theme} />
                </button>
                <a className={iconButton} href="https://github.com/FS-Frost/facts" target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                    </svg>
                </a>
            </div>
        </header>
    );
}

export default Header;
