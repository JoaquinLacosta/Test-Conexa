import { screen } from "@testing-library/react";
import Spinner from "@/app/components/Spinner/Spinner";
import { renderWithStore } from "../__mocks__/render-with-store";

describe("Spinner Unit Tests", () => {
  it("The spinner component should render with the correct classes", () => {
    renderWithStore(<Spinner />, {});

    const spinnerComponent = screen.getByTestId("spinner-image");

    expect(spinnerComponent).toBeInTheDocument();
    expect(spinnerComponent).toHaveClass("mx-auto animate-spin");
  });
});
