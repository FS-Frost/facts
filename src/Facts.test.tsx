import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Facts from "./Facts";

const fetchMock = vi.fn<typeof fetch>();

function factResponse(text: string, status = 200): Response {
    const body = { id: text, text, source: "test", source_url: "", language: "en", permalink: `https://example.com/${text}` };
    return new Response(JSON.stringify(body), { status });
}

function requestedUrls(): string[] {
    return fetchMock.mock.calls.map(([url]) => String(url));
}

function card() {
    return within(screen.getByRole("figure"));
}

function lists() {
    return within(screen.getByRole("tabpanel"));
}

async function renderWithFacts(...texts: string[]) {
    texts.forEach((text) => fetchMock.mockResolvedValueOnce(factResponse(text)));
    render(<Facts />);
    await card().findByText(texts[0]);
}

beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

test("shows a loading state, then the fact", async () => {
    fetchMock.mockResolvedValue(factResponse("today"));
    render(<Facts />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(await card().findByText("today")).toBeInTheDocument();
});

test("loads only today's fact on mount", async () => {
    await renderWithFacts("today");

    expect(card().getByText("Fact of the day")).toBeInTheDocument();
    expect(requestedUrls()).toEqual(["https://uselessfacts.jsph.pl/api/v2/facts/today?language=en"]);
    expect(card().getByRole("link", { name: /Permalink/ })).toHaveAttribute("href", "https://example.com/today");
});

test("next button loads a random fact", async () => {
    await renderWithFacts("today", "random");

    await userEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(await card().findByText("random")).toBeInTheDocument();
    expect(card().getByText("Random fact")).toBeInTheDocument();
    expect(requestedUrls()[1]).toBe("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
});

test("today and random tabs pick the endpoint", async () => {
    await renderWithFacts("today", "random", "today again");

    await userEvent.click(screen.getByRole("button", { name: "Random" }));
    await card().findByText("random");
    expect(screen.getByRole("button", { name: "Random" })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(screen.getByRole("button", { name: "Today" }));
    await card().findByText("today again");
    expect(requestedUrls()[2]).toBe("https://uselessfacts.jsph.pl/api/v2/facts/today?language=en");
});

test("space key loads a random fact", async () => {
    await renderWithFacts("today", "random");

    await userEvent.keyboard(" ");

    expect(await card().findByText("random")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("space key is ignored while loading and on focused controls", async () => {
    fetchMock.mockResolvedValueOnce(factResponse("today")).mockResolvedValueOnce(factResponse("random"));
    render(<Facts />);

    await userEvent.keyboard(" ");
    await card().findByText("today");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    screen.getByText("Debug").focus();
    await userEvent.keyboard(" ");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // Focused button: native click fires once, the shortcut must not add a second request.
    screen.getByRole("button", { name: "Next" }).focus();
    await userEvent.keyboard(" ");
    expect(await card().findByText("random")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("changing language refetches in that language and is remembered", async () => {
    await renderWithFacts("today", "heute");

    await userEvent.selectOptions(screen.getByLabelText(/Language/), "de");

    expect(await card().findByText("heute")).toBeInTheDocument();
    expect(requestedUrls()[1]).toBe("https://uselessfacts.jsph.pl/api/v2/facts/today?language=de");
    expect(localStorage.getItem("language")).toBe("de");
});

test("uses the remembered language on mount", async () => {
    localStorage.setItem("language", "de");
    await renderWithFacts("heute");

    expect(screen.getByLabelText(/Language/)).toHaveValue("de");
    expect(requestedUrls()).toEqual(["https://uselessfacts.jsph.pl/api/v2/facts/today?language=de"]);
});

test("shows source as a link when it has a URL", async () => {
    const body = { id: "1", text: "linked", source: "NEON", source_url: "https://neon.de", language: "en", permalink: "https://example.com/1" };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));
    render(<Facts />);

    expect(await card().findByRole("link", { name: "NEON" })).toHaveAttribute("href", "https://neon.de");
});

test("shows rate limit message without links", async () => {
    fetchMock.mockResolvedValue(new Response("slow down", { status: 429 }));
    render(<Facts />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/Too many attempts/);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
});

test("recovers from network errors", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<Facts />);

    expect(await screen.findByRole("alert")).toHaveTextContent(/Network error/);
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
});

test("history records facts newest first and persists", async () => {
    await renderWithFacts("first", "second");
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    await card().findByText("second");

    expect(screen.getByRole("tab", { name: "History (2)" })).toHaveAttribute("aria-selected", "true");
    const items = lists().getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(["second", "first"]);
    expect(JSON.parse(localStorage.getItem("history")!).map((f: { id: string }) => f.id)).toEqual(["second", "first"]);
});

test("selecting a history item shows it in the card", async () => {
    await renderWithFacts("first", "second");
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    await card().findByText("second");

    await userEvent.click(lists().getByRole("button", { name: "first" }));

    expect(card().getByText("first")).toBeInTheDocument();
    expect(card().getByText("Previously seen")).toBeInTheDocument();
    expect(lists().getByRole("button", { name: "first" })).toHaveAttribute("aria-current", "true");
});

test("arrow keys and buttons navigate history", async () => {
    await renderWithFacts("first", "second");
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    await card().findByText("second");
    expect(card().getByRole("button", { name: "Newer fact" })).toBeDisabled();

    await userEvent.keyboard("{ArrowLeft}");
    expect(card().getByText("first")).toBeInTheDocument();
    expect(card().getByRole("button", { name: "Older fact" })).toBeDisabled();

    await userEvent.click(card().getByRole("button", { name: "Newer fact" }));
    expect(card().getByText("second")).toBeInTheDocument();
    expect(card().getByText("Random fact")).toBeInTheDocument();
});

test("favorites toggle from the card and persist", async () => {
    await renderWithFacts("today");

    await userEvent.click(card().getByRole("button", { name: "Add to favorites" }));

    expect(card().getByRole("button", { name: "Remove from favorites" })).toHaveAttribute("aria-pressed", "true");
    expect(JSON.parse(localStorage.getItem("favorites")!)[0].id).toBe("today");

    await userEvent.click(screen.getByRole("tab", { name: "Favorites (1)" }));
    expect(lists().getByRole("button", { name: "today" })).toBeInTheDocument();

    await userEvent.click(lists().getByRole("button", { name: "Remove from favorites" }));
    expect(lists().getByText(/No favorites yet/)).toBeInTheDocument();
});

test("clearing history asks for confirmation", async () => {
    await renderWithFacts("today");

    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await userEvent.click(screen.getByRole("button", { name: "No" }));
    expect(lists().getAllByRole("listitem")).toHaveLength(1);

    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await userEvent.click(screen.getByRole("button", { name: "Yes" }));
    expect(lists().getByText("No facts yet.")).toBeInTheDocument();
    expect(localStorage.getItem("history")).toBe("[]");
});

test("copy puts text and permalink on the clipboard", async () => {
    const user = userEvent.setup();
    await renderWithFacts("today");

    await user.click(card().getByRole("button", { name: "Copy fact" }));

    expect(await navigator.clipboard.readText()).toBe("today\nhttps://example.com/today");
    expect(card().getByRole("button", { name: "Copied" })).toBeInTheDocument();
});

test("debug panel shows the raw response", async () => {
    fetchMock.mockResolvedValue(factResponse("today"));
    const { container } = render(<Facts />);
    await card().findByText("today");

    await userEvent.click(screen.getByText("Debug"));

    expect(container.querySelector("details")).toHaveAttribute("open");
    expect(container.querySelector("pre")).toHaveTextContent('"kind": "ok"');
});
