import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./Facts.css";
import { FactClientResponse, getRandomFact, getTodayFact } from "./FactsClient";

function Facts() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldShowJson, setShouldShowJson] = useState<boolean>(false);
    const [fact, setFact] = useState<string>("");
    const [language, setLanguage] = useState<string>("en");
    const [rawResponse, setRawResponse] = useState<string>("");
    const [factUrl, setFactUrl] = useState<string>("https://uselessfacts.jsph.pl");
    const repoUrl = "https://github.com/FS-Frost/facts";

    const getFact = async () => {
        setIsLoading(true);
        setFact("Loading...");
        const response = await getRandomFact(language);
        handleResponse(response);
        setIsLoading(false);
    };

    const onMount = useCallback(async () => {
        setIsLoading(true);
        setFact("Loading...");
        const response = await getTodayFact("en");
        handleResponse(response);
        setIsLoading(false);
    }, []);

    const handleResponse = (response: FactClientResponse | undefined) => {
        if (response == null) {
            return;
        }

        setRawResponse(JSON.stringify(response, null, 2));

        if (response.status === 429) {
            const time = new Date().toLocaleTimeString();
            setFact(`(${time}) Too many attempts! Try again later :)`);
            setFactUrl("");
            return;
        }

        if (response.json == null) {
            setFact("Ups, try again.");
            setFactUrl("");
            return;
        }

        setFact(response.json.text);
        setFactUrl(response.json.permalink);
    };

    const toggleDebugMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShouldShowJson(e.target.checked);
    };

    useEffect(() => {
        onMount();
    }, [onMount]);

    useEffect(() => {
        getFact();
    }, [language]);

    return (
        <div className="Facts">
            <div className="facts-search">
                {shouldShowJson ? <textarea value={rawResponse} readOnly /> : <p>{fact}</p>}
                <br />
                <button
                    className="btn-search"
                    onClick={() => {
                        getFact();
                    }}
                    disabled={isLoading}
                >
                    Search fact
                </button>
            </div>

            <div>
                <label htmlFor="languages">Language: </label>
                <select
                    name="languages"
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                >
                    <option value="en">English</option>
                    <option value="de">German</option>
                    {/* <option value="random">Surprise me</option> */}
                </select>
            </div>

            <div className="facts-debug">
                <label>Debug mode</label>
                <input type="checkbox" checked={shouldShowJson} onChange={toggleDebugMode} />
            </div>

            <div className="facts-links">
                <p>
                    Fact URL:{" "}
                    <a href={factUrl} target="_blank" rel="noreferrer">
                        {factUrl}
                    </a>
                </p>

                <p>
                    Source code:{" "}
                    <a href={repoUrl} target="_blank" rel="noreferrer">
                        {repoUrl}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Facts;
