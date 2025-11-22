import React, { useState, useEffect } from "react";

// Badge tình trạng màn hình
const StatusBadge = ({ status }) => {
  const color =
    status === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

const Screen = () => {
  const [screens, setScreens] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);

  // form state
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    status: "ACTIVE",
  });

  // Mock data
  useEffect(() => {
    const mockScreens = [
      { id: 1, name: "Screen A", capacity: 120, status: "ACTIVE" },
      { id: 2, name: "Screen B", capacity: 80, status: "INACTIVE" },
      { id: 3, name: "Premium Screen", capacity: 200, status: "ACTIVE" },
      { id: 4, name: "VIP Room", capacity: 55, status: "ACTIVE" },
    ];
    setScreens(mockScreens);
  }, []);

  // ✨ mở modal create
  const openCreateModal = () => {
    setForm({ name: "", capacity: "", status: "ACTIVE" });
    setShowCreate(true);
  };

  // ✨ mở modal edit
  const openEditModal = (screen) => {
    setSelectedScreen(screen);
    setForm({
      name: screen.name,
      capacity: screen.capacity,
      status: screen.status,
    });
    setShowEdit(true);
  };

  // ❌ đóng tất cả modal
  const closeModal = () => {
    setShowCreate(false);
    setShowEdit(false);
  };

  // ✔ create screen
  const handleCreate = (e) => {
    e.preventDefault();
    const newScreen = {
      id: screens.length + 1,
      ...form,
    };
    setScreens([...screens, newScreen]);
    closeModal();
  };

  // ✔ update screen
  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = screens.map((s) =>
      s.id === selectedScreen.id ? { ...selectedScreen, ...form } : s
    );
    setScreens(updated);
    closeModal();
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Screen Management</h1>

        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create Screen
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {screens.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-5 text-center text-gray-500">
                  No screens found
                </td>
              </tr>
            ) : (
              screens.map((screen) => (
                <tr
                  key={screen.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{screen.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {screen.name}
                  </td>
                  <td className="py-3 px-4">{screen.capacity}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={screen.status} />
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(screen)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-5">
        <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Prev
        </button>
        <span className="text-gray-700">Page 1 of 1</span>
        <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>

      {/* ===================== MODAL ===================== */}
      {(showCreate || showEdit) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl animate-fadeIn">

            <h2 className="text-lg font-bold mb-4">
              {showCreate ? "Create Screen" : "Edit Screen"}
            </h2>

            <form
              className="space-y-4"
              onSubmit={showCreate ? handleCreate : handleUpdate}
            >
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Screen name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block mb-1 text-sm">Capacity</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Capacity"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-sm">Status</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Screen;
