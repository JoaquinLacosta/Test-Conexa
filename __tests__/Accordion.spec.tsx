import { fireEvent, screen } from "@testing-library/react";
import Accordion from "@/app/components/Accordion/Accordion";
import { renderWithStore } from "../__mocks__/render-with-store";

describe("Accordion Component Unit Tests", () => {
  const defaultProps = {
    children: "test",
    title: "test",
    childrenContainerClassName: "test",
    titleClassName: "test",
  };
  it("The accordion component should render", () => {
    renderWithStore(<Accordion {...defaultProps} />, {});

    const accordionComponent = screen.getByTestId("accordion-component");

    expect(accordionComponent).toBeInTheDocument();
  });

  it("The accordion button should open the accordion", () => {
    renderWithStore(<Accordion {...defaultProps} />, {});

    const accordionButton = screen.getByTestId("accordion-button");
    const accordionContent = screen.getByTestId("accordion-content");
    fireEvent.click(accordionButton);
    expect(accordionContent).toHaveStyle({ maxHeight: "0rem" });
  });
});
