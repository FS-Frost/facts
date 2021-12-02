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
        const response = await fetch(url);

        if (!response.ok) {
            console.error(await response.text());
            return;
        }

        const json = (await response.json()) as FactResponse;
        setFact(json.text);
    };

    const [fact, setFact] = useState<string>("Initial fact");

    return (
        <div className="Facts">
            <p>{fact}</p>
            <button onClick={getFact}>Search fact</button>
        </div>
    );
}

export default Facts;
