import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Cart from "@/app/cart/page";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
        };
    },
}));

describe("Cart Page", () => {
    it("renders cart detail page heading", () => {
        render(<Cart />);

        const cartHeading = screen.getByRole("heading", { level: 1 });

        expect(cartHeading).toBeInTheDocument();
    });
});
