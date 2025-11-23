import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getTheaters, addTheater } from "../../../services/theaterService";

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);

  const [showAdd, setShowAdd] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    city: "",
    phone: "",
  });

  const fetchTheaters = async (page) => {
    try {
      const data = await getTheaters({ pageNumber: page, pageSize });
      setTheaters(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Error loading theater list!");
    }
  };

  useEffect(() => {
    fetchTheaters(page);
  }, [page]);

  const goToPage = (pageNumber) => {
    if (!totalPages || totalPages < 1) return;
    const newPage = Math.min(Math.max(pageNumber - 1, 0), totalPages - 1);
    if (newPage === page) return; // Fixed: was !==
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setForm({
      name: "",
      location: "",
      city: "",
      phone: "",
    });
    setShowAdd(true);
  };

  const closeAdd = () => {
    setShowAdd(false);
  };

  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.location.trim() ||
      !form.city.trim() ||
      !form.phone.trim()
    ) {
      toast.error("Please fill in complete theater information!");
      return false;
    }
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCreating(true);
    try {
      await addTheater(form);
      toast.success("Add theater successfully!");
      closeAdd();
      fetchTheaters(page);
    } catch (error) {
      toast.error("Error adding theater!");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          List theaters
        </h2>
        <div className="flex gap-2">
        <button className="flex items-center gap-1.5 rounded-lg px-4 py-3 text-sm bg-green-600 text-white shadow-sm hover:bg-green-700 cursor-pointer">
          Export
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 rounded-lg px-4 py-3 text-sm bg-blue-600 text-white shadow-sm hover:bg-blue-700 cursor-pointer"
        >
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white">
        <table className="w-full table-fixed">
          <thead className="border-b border-gray-200 text-left text-gray-800">
            <tr>
              <th className="px-6 py-4 w-20">STT</th>
              <th className="px-6 py-4 w-20">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4 w-50">Status</th>
              <th className="px-6 py-4 w-80">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium text-gray-700">
            {theaters.map((theater, index) => (
              <tr key={theater.id} className="border-b border-gray-200">
                <td className="px-6 py-4">{index + 1 + page * pageSize}</td>
                <td className="px-6 py-4">{theater.id}</td>
                <td className="px-6 py-4 truncate">{theater.name}</td>
                <td className="px-6 py-4">{theater.location}</td>
                <td className="px-6 py-4">{theater.city}</td>
                <td className="px-6 py-4">{theater.phone}</td>
                <td className="px-6 py-4">{theater.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-5">
                    <button className="flex items-center rounded-lg px-4 py-2.5 text-sm bg-blue-600 text-white shadow-sm hover:bg-blue-700 cursor-pointer">
                      Chi tiết
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600"
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
                      className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-700"
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

        <div className="flex items-center justify-center gap-2 py-4">
          <button
            className="px-3 py-2.5 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goToPage(1)}
            disabled={page === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
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
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
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
            className="px-3 py-2.5 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goToPage(totalPages)}
            disabled={page === totalPages - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
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

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            onClick={() => {
              if (!creating) closeAdd();
            }}
          />
          <div className="bg-white rounded-lg shadow-lg z-10 max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Theater</h3>
              <button
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => {
                  if (!creating) closeAdd();
                }}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  placeholder="Enter phone"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    if (!creating) closeAdd();
                  }}
                >
                    Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className={`px-4 py-2 rounded-lg text-white cursor-pointer ${
                    creating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {creating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheaterList;