import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
// import axiosInstance from "../Api/axios";
import axiosInstance from "../Api/axios";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    technologies: "",
    imageUrl: "",
    description: "",
    gitHubUrl: "",
    liveUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchProjects(token);
      setError("")
    }
  }, []);

  const fetchProjects = async (token) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Login data:", loginData);

      // Replace with your actual login API request
      const response = await axiosInstance.post("/admin/login", loginData);

      const data = response.data;

      // Set the token with an expiry time (1 hour from now)
      const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("tokenExpiry", expiryTime); // Store expiry time

      setIsAuthenticated(true);
      fetchProjects(data.token);

      // Optionally, set up an automatic logout function based on expiration
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("tokenExpiry");
        setIsAuthenticated(false);
      }, 60 * 60 * 1000); // 1 hour timeout
      setLoading(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setProjects([]);  
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    console.log("Project form data:", projectForm);
    
    
    const token = localStorage.getItem("adminToken");
    try {
      setLoading(true);

      const response = await axiosInstance.post("project/create-project", projectForm);
      console.log("Response:", response);
      
      if (!response.ok) throw new Error("Failed to save project");
      fetchProjects(token);
      setProjectForm({
        title: "",
        description: "",
        technologies: "",
        imageUrl: "",
        liveUrl: "",
        gitHubUrl: "",
        featured: false,
      });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    const token = localStorage.getItem("adminToken");
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete project");
      fetchProjects(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl || "",
      gitHubUrl: project.gitHubUrl || "",
      featured: project.featured,
    });
    setEditingId(project._id);
  };

  if (!isAuthenticated) {
    return (
      <div className="section">
        <div className="container max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center text-white mb-8">
              Admin Login
            </h1>
            <form
              onSubmit={handleLogin}
              className="space-y-6 text-white/90 max-w-md w-full p-6 bg-gray-900 rounded-xl shadow-lg"
            >
              {error.length !== 0  && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">Project Management</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>

          {/* Project Form */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Title"
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={projectForm.technologies}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      technologies: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={projectForm.imageUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, imageUrl: e.target.value })
                  }
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={projectForm.gitHubUrl}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      gitHubUrl: e.target.value,
                    })
                  }
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={projectForm.liveUrl}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, liveUrl: e.target.value })
                  }
                />
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                    className="mr-2 accent-blue-500"
                  />
                  Featured
                </label>
              </div>

              <textarea
                placeholder="Description"
                rows="4"
                className="bg-gray-800 text-white placeholder-gray-400 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                required
              />

              <div className="flex justify-end gap-4">
                {editingId && (
                  <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setEditingId(null);
                      setProjectForm({
                        title: "",
                        description: "",
                        technologies: "",
                        imageUrl: "",
                        liveUrl: "",
                        gitHubUrl: "",
                        featured: false,
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>

          {/* Project List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-900 rounded-lg shadow p-5 flex flex-col justify-between"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    Tech: {project.technologies.join(", ")}
                  </p>
                  <div className="flex justify-between text-sm text-blue-400 mt-2">
                    {project.gitHubUrl && (
                      <a
                        href={project.gitHubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 hover:underline"
                      >
                        Live
                      </a>
                    )}
                  </div>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-yellow-500 hover:text-yellow-600 text-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500 hover:text-red-600 text-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;
