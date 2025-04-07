import React from 'react';
import styles from './Pagination.module.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null; 
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginationContainer} aria-label="Navegacion de productos">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${styles.pageButton} ${styles.prevNextButton}`}
        aria-label="Pagina Anterior"
        title="Pagina Anterior"
      >
        <FaArrowLeft/>
        {/* {'Ant'} */}
      </button>

      <ul className={styles.pageList}>
         {pageNumbers.map((number) => (
           <li key={number}>
             <button
               onClick={() => onPageChange(number)}
               className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
               aria-current={currentPage === number ? 'page' : undefined}
             >
               {number}
             </button>
           </li>
         ))}
      </ul>


      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.pageButton} ${styles.prevNextButton}`}
        aria-label="Pagina Siguiente"
        title="Pagina Siguiente"
      >
        {/* {'Sig'} */}
        <FaArrowRight/>
      </button>
    </nav>
  );
};

export default Pagination;