import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { getTheaters } from "../../../services/theaterService";

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchTheaters = async (page) => {
    try {
      const data = await getTheaters({ pageNumber: page, pageSize });
      setTheaters(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách rạp!");
    }
  };

  useEffect(() => {
    fetchTheaters(page);
  }, [page]);

  const goToPage = (pageNumber) => {
    if (!totalPages || totalPages < 1) return;
    const newPage = Math.min(Math.max(pageNumber - 1, 0), totalPages - 1);
    if (newPage !== page) return;
    setPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const currentPageOneBased = page + 1;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPageOneBased - 2);
      let endPage = Math.min(totalPages, currentPageOneBased + 2);

      if (endPage - startPage + 1 < maxPageButtons) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
        } else if (endPage === totalPages) {
          startPage = Math.max(1, endPage - maxPageButtons + 1);
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="flex-1 text-xl font-semibold text-gray-800">
          List theaters
        </h2>
        <button className=" cursor-pointer flex items-center gap-1.5 inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-green-600 text-white shadow-theme-xs hover:bg-green-700">
          export
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
        <button className="flex items-center gap-1.5 inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700">
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white">
        <table className="w-full table-fixed">
          <thead className="border-b border-gray-200 px-6 py-4 text-left text-gray-800">
            <tr>
              <th className="px-6 py-4 w-20">STT</th>
              <th className="px-6 py-4 w-20">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className=" border-b border-gray-200 mb-1.5 text-sm font-medium text-gray-700">
            {theaters.map((theater, index) => (
              <tr key={theater.id} className="border-gray-200 border-b">
                <td className="px-6 py-4 w-20">
                  {index + 1 + page * pageSize}
                </td>
                <td className="px-6 py-4 w-20">{theater.id}</td>
                <td className="px-6 py-4 truncate whitespace-nowrap overflow-hidden">
                  {theater.name}
                </td>
                <td className="px-5 py-4">{theater.location}</td>
                <td className="px-6 py-4">{theater.city}</td>
                <td className="px-6 py-4">{theater.phone}</td>
                <td className="px-4 py-4">{theater.status}</td>
                <td className="px-4 py-4">
                  <div className="items-center flex gap-5">
                    <button className=" cursor-pointer flex items-center inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-2.5 text-sm bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700">
                      Chi tiết
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-500 cursor-pointer hover:text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-blue-600 cursor-pointer hover:text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-2 mt-4 mb-4">
          <button
            className="px-3 py-2.5 rounded-lg bg-white hover:bg-gray-100"
            onClick={() => goToPage(1)}
            disabled={page === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-theme-sm font-medium bg-brand-600 cursor-pointer ${
                pageNumber === page + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100 hover:text-blue-700 text-gray-500"
              }`}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="px-3 py-2.5 rounded-lg bg-white hover:bg-gray-100"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheaterList;
