import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
    vi.stubGlobal(
        "fetch",
        vi.fn(async () => new Response("slow down", { status: 429 }))
    );
    localStorage.clear();
    document.documentElement.classList.remove("dark");
});

afterEach(() => {
    vi.unstubAllGlobals();
});

test("renders header with GitHub link", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Random Facts" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/FS-Frost/facts");
});

test("theme toggle cycles system, light, dark and persists", async () => {
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Theme: system" });

    await userEvent.click(toggle);
    expect(toggle).toHaveAccessibleName("Theme: light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement).not.toHaveClass("dark");

    await userEvent.click(toggle);
    expect(toggle).toHaveAccessibleName("Theme: dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");

    await userEvent.click(toggle);
    expect(toggle).toHaveAccessibleName("Theme: system");
    expect(localStorage.getItem("theme")).toBeNull();
});
