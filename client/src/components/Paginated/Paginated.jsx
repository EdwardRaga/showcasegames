import style from "./Paginate.module.css";
import { useState, useEffect } from "react";

const Paginate = ({ videogames, setPaginate, setLanding}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videogames.length / 15);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, videogames]);

  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [videogames]);

  const handlePageClick = (pageNumber) => {
    const startIndex = (pageNumber - 1) * 15;
    const endIndex = startIndex + 15;
    setPaginate(null);
    setLanding(true);
    console.log(pageNumber);

    setPaginate(videogames.slice(startIndex, endIndex));

    if (videogames?.length > 1) {
      setLanding(false);
    }
    setCurrentPage(pageNumber);
  };
  return (
    videogames?.length > 5 && (
      <div className={style.pagination}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? style.active : null}
            onClick={(e) => {
              handlePageClick(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    )
  );
};

export default Paginate;
