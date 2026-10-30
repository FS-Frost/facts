import Facts from "./Facts";
import Header from "./components/Header";

function App() {
    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-8 sm:py-10">
            <Header />
            <main>
                <Facts />
            </main>
        </div>
    );
}

export default App;
