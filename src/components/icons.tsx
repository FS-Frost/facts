const stroke = {
    className: "size-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
};

export function ChevronLeftIcon() {
    return (
        <svg {...stroke}>
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

export function ChevronRightIcon() {
    return (
        <svg {...stroke}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

export function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg {...stroke} fill={filled ? "currentColor" : "none"}>
            <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z" />
        </svg>
    );
}

export function CopyIcon() {
    return (
        <svg {...stroke}>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        </svg>
    );
}

export function CheckIcon() {
    return (
        <svg {...stroke}>
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

export function ShareIcon() {
    return (
        <svg {...stroke}>
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" />
        </svg>
    );
}
