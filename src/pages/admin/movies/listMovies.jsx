import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getMovies,
  deleteMovie,
  updateMovies,
} from "../../../services/movieService";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, seteditMovie] = useState(null);
  const [saving, setSaving] = useState(false);

  const pageSize = 10;

  const fetchMovies = async (page) => {
    try {
      const data = await getMovies({ pageNumber: page, size: pageSize });
      setMovies(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const goToPage = (pageOneBased) => {
    if (!totalPages || totalPages < 1) return;
    const newPage = Math.min(Math.max(pageOneBased - 1, 0), totalPages - 1);
    if (newPage === page) return;
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

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleShowEdit = (movie) => {
    seteditMovie({ ...movie });
  };

  const handleCloseEdit = () => {
    seteditMovie(null);
    setSaving(false);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    seteditMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editMovie || !editMovie.id) {
      toast.error("No movie selected for editing");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: editMovie.title,
        genre: editMovie.genre,
        language: editMovie.language,
        releaseDate: editMovie.releaseDate,
        duration: Number(editMovie.duration),
        rating: Number(editMovie.rating),
        status: editMovie.status,
        posterUrl: editMovie.posterUrl,
        trailerUrl: editMovie.trailerUrl,
        description: editMovie.description,
      };

      await updateMovies(editMovie.id, payload);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === payload.id ? { ...movie, ...payload } : movie
        )
      );
      toast.success("Movie updated successfully");
      handleCloseEdit();
      fetchMovies(page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update movie");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMovie = async (movieId, movieStatus) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) {
      return;
    }
    try {
      await deleteMovie(movieId, movieStatus);
      fetchMovies(page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="flex-1 text-xl font-semibold text-gray-800">
          List movies
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
        <NavLink
          className="flex items-center gap-1.5 inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700"
          to="/addMovies"
        >
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
        </NavLink>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white">
        <table className="w-full table-fixed">
          <thead className="border-b border-gray-200 px-6 py-4 text-left text-gray-800">
            <tr>
              <th className="px-6 py-4 w-20">STT</th>
              <th className="px-6 py-4 w-20">ID</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Genre</th>
              <th className="px-6 py-4">Language</th>
              <th className="px-6 py-4">ReleaseDate</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className=" border-b border-gray-200 mb-1.5 text-sm font-medium text-gray-700">
            {movies.map((movie, index) => (
              <tr key={movie.id} className="border-gray-200 border-b">
                <td className="px-6 py-4 w-20">
                  {index + 1 + page * pageSize}
                </td>
                <td className="px-6 py-4 w-20">{movie.id}</td>
                <td className="px-6 py-4 truncate whitespace-nowrap overflow-hidden">
                  {movie.title}
                </td>
                <td className="px-6 py-4">{movie.genre}</td>
                <td className="px-6 py-4">{movie.language}</td>
                <td className="px-6 py-4">{movie.releaseDate}</td>
                <td className="px-6 py-4">
                  <div className="items-center flex gap-5">
                    <button
                      className=" cursor-pointer flex items-center inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-2.5 text-sm bg-blue-600 text-white shadow-theme-xs hover:bg-blue-700"
                      onClick={() => handleShowDetails(movie)}
                    >
                      Chi tiết
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteMovie(movie.id, movie.status)}
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
                      onClick={() => handleShowEdit(movie)}
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

      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header popup */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-xl font-semibold text-gray-800">
                Chi tiết phim
              </h3>
              <button
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nội dung popup */}
            <div className="px-6 py-4">
              <div className="space-y-4">
                {/* Poster nếu có */}
                <div className="flex ">
                  <div>
                    {selectedMovie.posterUrl && (
                      <div className="flex justify-center">
                        <img
                          src={selectedMovie.posterUrl}
                          alt={selectedMovie.title}
                          className="max-w-full h-auto rounded-lg shadow-lg max-h-96 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {/* Tiêu đề */}
                  <div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedMovie.title}
                      </h4>
                    </div>
                    {/* Thông tin chi tiết */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">ID</p>
                        <p className="text-base text-gray-900">
                          {selectedMovie.id}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Thể loại
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedMovie.genre || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Ngôn ngữ
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedMovie.language || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Ngày phát hành
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedMovie.releaseDate || "N/A"}
                        </p>
                      </div>

                      {selectedMovie.duration && (
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Thời lượng
                          </p>
                          <p className="text-base text-gray-900">
                            {selectedMovie.duration} phút
                          </p>
                        </div>
                      )}

                      {selectedMovie.rating && (
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Đánh giá
                          </p>
                          <p className="text-base text-gray-900">
                            {selectedMovie.rating}/10
                          </p>
                        </div>
                      )}

                      {selectedMovie.status && (
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Trạng thái
                          </p>
                          <p className="text-base text-gray-900">
                            {selectedMovie.status}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mô tả */}
                  {selectedMovie.description && (
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        Mô tả
                      </p>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {selectedMovie.description}
                      </p>
                    </div>
                  )}
                </div>
                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedMovie.trailerUrl && (
                    <a
                      href={selectedMovie.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                      Xem Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Footer popup */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end rounded-b-2xl">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      {editMovie && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          onClick={handleCloseEdit}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full mx-4">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-xl font-semibold text-gray-800">edit</h3>
                <button
                  onClick={handleCloseEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-sm text-gray-500">Title</label>
                <input
                  name="title"
                  value={editMovie.title ?? ""}
                  onChange={handleChangeEdit}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Genre</label>
                  <select
                    name="genre"
                    value={editMovie.genre ?? ""}
                    onChange={handleChangeEdit}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  >
                    <option value="">Select genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Romance">Romance</option>
                    {/* thêm các thể loại khác nếu cần */}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Language</label>
                  <select
                    name="language"
                    value={editMovie.language ?? ""}
                    onChange={handleChangeEdit}
                    className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                  >
                    <option value="">Select language</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    {/* thêm ngôn ngữ khác nếu cần */}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Release Date</label>
                  <input
                    name="releaseDate"
                    value={editMovie.releaseDate ?? ""}
                    onChange={handleChangeEdit}
                    type="date"
                    className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Duration (phút)
                  </label>
                  <input
                    name="duration"
                    value={editMovie.duration ?? ""}
                    onChange={handleChangeEdit}
                    type="number"
                    min="0"
                    className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Rating</label>
                  <input
                    name="rating"
                    value={editMovie.rating ?? ""}
                    onChange={handleChangeEdit}
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <select
                    name="status"
                    value={editMovie.status ?? ""}
                    onChange={handleChangeEdit}
                    className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                  >
                    <option value="">Select status</option>
                    <option value="COMING_SOON">Coming Soon</option>
                    <option value="NOW_SHOWING">Now Showing</option>
                    <option value="ENDED">Ended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Poster URL</label>
                <input
                  name="posterUrl"
                  value={editMovie.posterUrl ?? ""}
                  onChange={handleChangeEdit}
                  className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Trailer URL</label>
                <input
                  name="trailerUrl"
                  value={editMovie.trailerUrl ?? ""}
                  onChange={handleChangeEdit}
                  className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Description</label>
                <textarea
                  name="description"
                  value={editMovie.description ?? ""}
                  onChange={handleChangeEdit}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 border px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end rounded-b-2xl">
              <button
                onClick={handleCloseEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ListMovies;