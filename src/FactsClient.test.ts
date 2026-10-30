import { getRandomFact } from "./FactsClient";

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

test("returns http-error for non-ok responses", async () => {
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));
    expect(await getRandomFact("en")).toEqual({ kind: "http-error", status: 500 });
});

test("returns invalid-response for malformed JSON", async () => {
    fetchMock.mockResolvedValue(new Response("not json", { status: 200 }));
    expect(await getRandomFact("en")).toEqual({ kind: "invalid-response", status: 200 });
});

test("returns network-error when fetch rejects", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await getRandomFact("en")).toEqual({ kind: "network-error" });
});
