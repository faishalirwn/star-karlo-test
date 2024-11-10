import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
    it("renders juna's restaurant heading", () => {
        render(<Home />);

        const heading = screen.getByText("Juna Restaurant's Menu");

        expect(heading).toBeInTheDocument();
    });
});
