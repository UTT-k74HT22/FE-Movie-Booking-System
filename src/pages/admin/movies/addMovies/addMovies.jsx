import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { addMovies } from "../../../../services/movieService";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const AddMovies = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    releaseDate: "",
    posterUrl: "",
    trailerUrl: "",
    rating: "",
    genre: "",
    language: "",
    status: "COMING_SOON",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const statusOption = [
    "COMING SOON"
  ];
  const languageOption  = [
    "Vietnamese", "English"
  ];
  const genreOption = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!form.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (isNaN(form.duration) || Number(form.duration) <= 0) {
      newErrors.duration = "Duration must be a positive number";
    }

    if (!form.releaseDate.trim()) {
      newErrors.releaseDate = "Release date is required";
    }

    if (!form.posterUrl.trim()) {
      newErrors.posterUrl = "Poster URL is required";
    } else if (!isValidUrl(form.posterUrl)) {
      newErrors.posterUrl = "Invalid URL format";
    }

    if (form.trailerUrl.trim() && !isValidUrl(form.trailerUrl)) {
      newErrors.trailerUrl = "Invalid URL format";
    }

    if (!form.rating.trim()) {
      newErrors.rating = "Rating is required";
    } else if (
      isNaN(form.rating) ||
      Number(form.rating) < 0 ||
      Number(form.rating) > 10
    ) {
      newErrors.rating = "Rating must be between 0 and 10";
    }

    if (!form.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!form.language.trim()) {
      newErrors.language = "Language is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateFormErr = validateForm();
    if (Object.keys(validateFormErr).length > 0) {
      Object.entries(validateFormErr).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      duration: form.duration.trim(),
      releaseDate: form.releaseDate.trim(),
      posterUrl: form.posterUrl.trim(),
      trailerUrl: form.trailerUrl.trim(),
      rating: form.rating.trim(),
      genre: form.genre.trim(),
      language: form.language.trim(),
      status: form.status,
    };

    setLoading(true);
    try {
      await addMovies(payload);
      toast.success("Phim đã được thêm thành công");

      setForm({
        title: "",
        description: "",
        duration: "",
        releaseDate: "",
        posterUrl: "",
        trailerUrl: "",
        rating: "",
        genre: "",
        language: "",
        status: "COMING_SOON",
      });

      setTimeout(() => navigate("/listMovies"), 1000);

    } catch (err) {
      if (err?.data?.errors) {
        const validate = err.data.errors;
        Object.entries(validate).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Có lỗi khi thêm phim");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    if(window.confirm("bạn chắc chắn muốn xóa toàn bộ nội dung đã nhập")) {
      setForm({
        title: "",
        description: "",
        duration: "",
        releaseDate: "",
        posterUrl: "",
        trailerUrl: "",
        rating: "",
        genre: "",
        language: "",
        status: "COMING_SOON",
      });
      setErrors({});
      toast.success("dã xóa toàn bộ nội dung");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="flex-1 text-xl font-semibold text-gray-800">
          add movies
        </h2>
        <nav className="flex items-center gap-1.5">home</nav>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* contener info:
            title
            description
            genre
            language
            status */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Info</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-5 grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
                  <div>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter title" 
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800" type="text"></input>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Genre</label>
                  <div>
                    <select
                      name="genre"
                      value={form.genre}
                      onChange={handleChange} 
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10">
                      <option value ="" className="text-gray-700">Select a Genre</option>
                      { genreOption.map(genre => (
                        <option className="text-gray-700" key={genre}  value = {genre}> {genre} </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Language</label>
                  <div>
                    <select
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10">
                      <option value ="" className="text-gray-700">Select a Language</option>
                      { languageOption.map(language => (
                        <option className="text-gray-700" key={language}  value = {language}> {language} </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <div>
                    <select
                    name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10">
                      <option value ="" className="text-gray-700">Select a Status</option>
                      { statusOption.map(status => (
                        <option className="text-gray-700" key={status}  value = {status}> {status} </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                  <div>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Enter information"
                      rows= "6"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-blue-300 focus:ring-3 focus:ring-blue-500/10"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* contener media;
            posterUrl
            trailerUr */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Media</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">PosterUrl</label>
                  <div>
                    <input
                      name="posterUrl"
                      value={form.posterUrl}
                      onChange={handleChange}
                      placeholder="Enter Url"
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800"
                      type="url"></input>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">TrailerUrl</label>
                  <div>
                    <input
                      name="trailerUrl"
                      value={form.trailerUrl}
                      onChange={handleChange}
                      placeholder="Enter Url"
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800"
                      type="url"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* thông số phim
            duration
            releaseDate
            rating */}
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800">Movie Details</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Duration</label>
                  <div>
                    <input
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      placeholder="Enter Duration (minutes)"
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800"
                      type="number"></input>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Release Date</label>
                  <div>
                    <input
                      name="releaseDate"
                      value={form.releaseDate}
                      onChange={handleChange}
                      placeholder="Select Release Date"
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800" 
                      type="date"></input>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Rating</label>
                  <div>
                    <input
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      placeholder="Rating"
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-300 bg-transparent text-gray-800" type="number" step="0.1"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex flex-row justify-end gap-3 ">
            <button
            type="button"
            onClick={handleRemove}
            disabled={loading}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">remove</button>
            <button 
            type="submit"
            disabled={loading}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-blue-500 text-white ring-1 ring-inset ring-gray-300 hover:bg-blue-600">Add Movie</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddMovies;
