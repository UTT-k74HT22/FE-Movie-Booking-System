/**
 * Pagination Component
 * Beautiful pagination for movie lists
 */

import React from 'react';
import './Pagination.css';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  showPageNumbers = true,
  maxPageButtons = 5 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const halfMax = Math.floor(maxPageButtons / 2);
    
    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, currentPage + halfMax);
    
    // Adjust if we're near the beginning or end
    if (currentPage <= halfMax) {
      endPage = Math.min(totalPages, maxPageButtons);
    }
    if (currentPage > totalPages - halfMax) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }
    
    // Add first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange?.(page);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn pagination-prev"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="pagination-btn-text">Previous</span>
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            <button
              key={`page-${index}`}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
              className={`pagination-number ${
                page === currentPage ? 'active' : ''
              } ${page === '...' ? 'dots' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Page Info (for mobile) */}
      <div className="pagination-info">
        <span className="pagination-current">{currentPage}</span>
        <span className="pagination-separator">/</span>
        <span className="pagination-total">{totalPages}</span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn pagination-next"
        aria-label="Next page"
      >
        <span className="pagination-btn-text">Next</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
