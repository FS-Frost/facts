import React, { MouseEvent, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import "./Facts.css";

interface FactResponse {
    id: string;
    text: string;
    source: string;
    source_url: string;
    language: string;
    permalink: string;
}

function Facts() {
    const getFact = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Click!");
        const url = "https://uselessfacts.jsph.pl/random.json?language=en";
        setIsLoading(true);
        setFact("Searching...");
        const response = await fetch(url);

        if (response.status === 429) {
            const time = new Date().toLocaleTimeString();
            setFact(`(${time}) Too many attempts! Try again later :)`);
            setFactUrl("");
            setIsLoading(false);
            return;
        }

        if (!response.ok) {
            console.error(await response.text());
            setIsLoading(false);
            setFact("Ups, try again.");
            setFactUrl("");
            return;
        }

        const json = (await response.json()) as FactResponse;
        setIsLoading(false);
        setFact(json.text);
        setFactUrl(json.permalink);
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fact, setFact] = useState<string>("");
    const [factUrl, setFactUrl] = useState<string>("https://uselessfacts.jsph.pl");
    const repoUrl = "https://github.com/FS-Frost/facts";

    return (
        <div className="Facts">
            <p>{fact}</p>
            <button className="btn-search" onClick={getFact} disabled={isLoading}>
                Search fact
            </button>
            <br />
            <p>
                Fact URL:{" "}
                <a href={factUrl} target="_blank">
                    {factUrl}
                </a>
            </p>
            <p>
                Source code:{" "}
                <a href={repoUrl} target="_blank">
                    {repoUrl}
                </a>
            </p>
        </div>
    );
}

export default Facts;
