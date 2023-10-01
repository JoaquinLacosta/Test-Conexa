import { PaginationInfo } from "@/app/common/types";

interface PaginationButtonsProps {
  currentPage: number;
  paginationNumber: number;
  fetchData: (paginationNumber: number, page: number) => void;
  paginationInfo?: PaginationInfo;
}

export default function PaginationButtons({
  currentPage,
  fetchData,
  paginationInfo,
  paginationNumber,
}: PaginationButtonsProps) {
  return (
    <div
      data-testid="pagination-buttons-component"
      className="flex w-full justify-between mb-2 px-2"
    >
      <button
        data-testid="pagination-buttons-previous-button"
        disabled={currentPage === 1}
        onClick={() => {
          fetchData(paginationNumber, currentPage - 1);
        }}
        className="border-2 p-4 text-white  hover:shadow-sm rounded-md hover:shadow-neutral-300 disabled:text-gray-300 disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        data-testid="pagination-buttons-next-button"
        disabled={paginationInfo && currentPage === paginationInfo.pages}
        onClick={() => {
          fetchData(paginationNumber, currentPage + 1);
        }}
        className="border-2 p-4 text-white  hover:shadow-sm rounded-md hover:shadow-neutral-300 disabled:text-gray-300 disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
