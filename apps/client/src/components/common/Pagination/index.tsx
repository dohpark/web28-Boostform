import React, { useEffect, useState } from "react";
import Right from "@public/icons/right.svg";
import Left from "@public/icons/left.svg";
import IconButton from "@/components/common/IconButton";
import COLORS from "@/constants/color";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  callback: (pageNumber: number) => void;
}

function Pagination({ currentPage, lastPage, callback }: PaginationProps) {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    let temp: number[];
    if (lastPage < 5) {
      temp = Array.from({ length: lastPage }, (_, i) => i + 1);
    } else if (![1, 2, lastPage, lastPage - 1].includes(currentPage)) {
      temp = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    } else if ([1, 2].includes(currentPage)) {
      temp = [1, 2, 3, 4, 5];
    } else {
      temp = [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    setPageNumbers(temp);
  }, [currentPage, lastPage]);

  return (
    <div className="flex items-center justify-center py-2 px-10 mt-3">
      <IconButton type="button" onClick={() => callback(currentPage - 1)} disabled={currentPage === 1} className="h-6">
        <Left fill={COLORS.grey5} />
      </IconButton>
      <ul className="mx-2">
        {pageNumbers.map((number) => {
          const defaultCss = "w-6 my-0 mx-2 h-6 rounded-xl text-center text-sm font-medium cursor-pointer leading-6";
          const conditionalCss = "text-white font-semibold bg-blue3";

          const className = currentPage === number ? `${defaultCss} ${conditionalCss}` : defaultCss;

          return (
            <li key={number} className={className}>
              <button onClick={() => callback(number)} type="button" className="w-full">
                {number}
              </button>
            </li>
          );
        })}
      </ul>
      <IconButton
        type="button"
        onClick={() => callback(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="h-6"
      >
        <Right fill={COLORS.grey5} />
      </IconButton>
    </div>
  );
}

export default Pagination;
