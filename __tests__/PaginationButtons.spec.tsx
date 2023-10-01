import { fireEvent, screen } from "@testing-library/react";
import PaginationButtons from "@/app/components/PaginationButtons/PaginationButtons";
import { renderWithStore } from "../__mocks__/render-with-store";
import { mockPaginationInfo } from "@/__mocks__/storeMocks";

describe("Pagination Buttons Unit Tests", () => {
  const defaultProps = {
    currentPage: 1,
    paginationNumber: 1,
    fetchData: jest.fn(),
    paginationInfo: mockPaginationInfo,
  };

  it("The pagination buttons component should render", () => {
    renderWithStore(<PaginationButtons {...defaultProps} />, {});

    const paginationButtons = screen.getByTestId(
      "pagination-buttons-component"
    );
    const paginationButtonPrevious = screen.getByTestId(
      "pagination-buttons-previous-button"
    );
    const paginationButtonNextButton = screen.getByTestId(
      "pagination-buttons-next-button"
    );

    expect(paginationButtons).toBeInTheDocument();
    expect(paginationButtonPrevious).toBeInTheDocument();
    expect(paginationButtonNextButton).toBeInTheDocument();
  });

  it("The pagination next button should not call fetchData in case of being disabled", () => {
    const props = { ...defaultProps, currentPage: 42 };
    renderWithStore(<PaginationButtons {...props} />, {});
    const paginationButtonNextButton = screen.getByTestId(
      "pagination-buttons-next-button"
    );

    fireEvent.click(paginationButtonNextButton);

    expect(defaultProps.fetchData).not.toBeCalled();
  });

  it("The pagination previous button should not call fetchData in case of being disabled", () => {
    const props = { ...defaultProps, currentPage: 1 };
    renderWithStore(<PaginationButtons {...props} />, {});
    const paginationButtonPrevious = screen.getByTestId(
      "pagination-buttons-previous-button"
    );

    fireEvent.click(paginationButtonPrevious);

    expect(defaultProps.fetchData).not.toBeCalled();
  });

  it("The pagination next button should call fetchData in case of not being disabled", () => {
    renderWithStore(<PaginationButtons {...defaultProps} />, {});
    const paginationButtonNextButton = screen.getByTestId(
      "pagination-buttons-next-button"
    );
    fireEvent.click(paginationButtonNextButton);
    expect(defaultProps.fetchData).toBeCalledWith(1, 2);
  });

  it("The pagination previous button should not call fetchData in case of being disabled", () => {
    const props = { ...defaultProps, currentPage: 2 };
    renderWithStore(<PaginationButtons {...props} />, {});
    const paginationButtonPrevious = screen.getByTestId(
      "pagination-buttons-previous-button"
    );

    fireEvent.click(paginationButtonPrevious);

    expect(defaultProps.fetchData).toBeCalledWith(1, 1);
  });
});
