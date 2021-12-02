import React, { MouseEvent, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

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
        const url = "https://uselessfacts.jsph.pl/random.json";
        setIsLoading(true);
        setFact("Searching...");
        const response = await fetch(url);

        if (response.status === 429) {
            const time = new Date().toLocaleTimeString();
            setFact(`(${time}) Too many attempts! Try again later :)`);
            setIsLoading(false);
            return;
        }

        if (!response.ok) {
            console.error(await response.text());
            setIsLoading(false);
            return;
        }

        const json = (await response.json()) as FactResponse;
        setIsLoading(false);
        setFact(json.text);
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fact, setFact] = useState<string>("Initial fact");

    return (
        <div className="Facts">
            <p>{fact}</p>
            <button onClick={getFact} disabled={isLoading}>
                Search fact
            </button>
            <br />
            <p>Powered by: https://uselessfacts.jsph.pl</p>
        </div>
    );
}

export default Facts;
