import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readTheme(): Theme {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
        return "system";
    }
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(readTheme);

    useEffect(() => {
        try {
            if (theme === "system") {
                localStorage.removeItem(STORAGE_KEY);
            } else {
                localStorage.setItem(STORAGE_KEY, theme);
            }
        } catch {
            // Storage unavailable (private mode): theme still applies for this session.
        }

        const media = window.matchMedia?.(DARK_QUERY);
        const apply = () => {
            const isDark = theme === "dark" || (theme === "system" && media?.matches === true);
            document.documentElement.classList.toggle("dark", isDark);
        };

        apply();
        media?.addEventListener("change", apply);
        return () => media?.removeEventListener("change", apply);
    }, [theme]);

    const cycleTheme = () => {
        setTheme((current) => (current === "system" ? "light" : current === "light" ? "dark" : "system"));
    };

    return { theme, cycleTheme };
}
