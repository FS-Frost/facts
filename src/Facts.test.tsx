import { render, screen } from "@testing-library/react";
import Facts from "./Facts";

test("renders search button", async () => {
    render(<Facts />);
    const searchButton = screen.getByText("Search fact");
    expect(searchButton).toBeInTheDocument();
});
