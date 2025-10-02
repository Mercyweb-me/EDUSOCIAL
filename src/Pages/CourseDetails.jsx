import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ArrowLeft,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Edit3,
  Trash2,
  Loader2,
} from "lucide-react";
import Navabar from "../Components/Navabar";
import Footer from "../Components/Footer";

const API = "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api";
const getAuthHeaders = () => {
  const t =
    localStorage.getItem("access_token") || localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${t}` };
};

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token =
    localStorage.getItem("access_token") || localStorage.getItem("accessToken");

  // ✅ Fetch course
  const fetchCourse = async () => {
    try {
      const res = await fetch(`${API}/courses/${id}/`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Failed to load course");
        return;
      }
      setCourse(data);
    } catch {
      setError("Failed to load course");
    }
  };

  // ✅ Fetch contents separately
  const fetchContents = async () => {
    try {
      const res = await fetch(`${API}/contents/?course=${id}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      const list = Array.isArray(data.results) ? data.results : [];
      setContents(list);
    } catch {
      setError("Failed to load contents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchContents();
  }, [id]);

  // ✅ Upload content
const handleUpload = async (e) => {
  e.preventDefault();
  setUploading(true);
  setError("");
  setMessage("");

  try {
    const form = new FormData();
    const file = e.target.file.files[0];
    const text = e.target.text.value.trim();

    if (file) {
      form.append("content_file", file);

      // ✅ Map file extensions to backend choices
      let type = "document";
      if (file.name.endsWith(".pdf")) type = "pdf";
      else if (file.name.endsWith(".docx")) type = "docx";
      else if (file.name.endsWith(".mp4")) type = "mp4";

      form.append("content_type", type);
    } else if (text) {
      form.append("title", "Text Note");
      form.append("content_type", "text"); // assuming backend supports text notes
      form.append("description", text);
    } else {
      setError("Please provide a file or text.");
      setUploading(false);
      return;
    }

    form.append("course", id);
    form.append("title", file ? file.name : "Note");

    const res = await fetch(`${API}/contents/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (!res.ok) {
      const err = await res.text();
      setError("Upload failed: " + err);
    } else {
      setMessage("✅ Upload successful!");
      fetchContents();
      e.target.reset();
    }
  } catch (err) {
    setError("Something went wrong while uploading.");
  } finally {
    setUploading(false);
  }
};


  // ✅ Delete content
  const handleDelete = async (cid) => {
    try {
      const res = await fetch(`${API}/contents/${cid}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        setError("Delete failed");
        return;
      }
      setMessage("Content deleted");
      setContents((prev) => prev.filter((c) => c.id !== cid));
    } catch {
      setError("Delete failed");
    }
  };

  // ✅ Render preview
  const renderPreview = (c) => {
    if (c.content_type === "video") {
      return (
        <video controls className="w-full rounded mt-2">
          <source src={c.content_file} />
        </video>
      );
    }
    if (c.content_type === "image") {
      return (
        <img
          src={c.content_file}
          alt={c.title}
          className="w-full h-48 object-cover rounded mt-2"
        />
      );
    }
    if (c.content_type === "document") {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            c.content_file
          )}&embedded=true`}
          className="w-full h-96 border rounded mt-2"
          title={c.title}
        />
      );
    }
    return (
      <a
        href={c.content_file}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        Download
      </a>
    );
  };

  return (
    <>
      <Navabar />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-6">
      {loading ? (
        <p className="text-center text-gray-600 animate-pulse">
          Loading course details...
        </p>
      ) : course ? (
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate("/Admin/Dashbord")}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-purple-700 flex items-center gap-3">
            <BookOpen size={36} className="text-blue-600" />
            {course.title}
          </h1>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            {course.description}
          </p>

          {/* Dates */}
          <motion.div
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Calendar size={20} /> Start Date
              </div>
              <p className="mt-2 text-gray-800">
                {course.start_date || "Not specified"}
              </p>
            </div>
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow">
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <Calendar size={20} /> End Date
              </div>
              <p className="mt-2 text-gray-800">
                {course.end_date || "Not specified"}
              </p>
            </div>
          </motion.div>

          {/* Alerts */}
          {error && (
            <p className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</p>
          )}
          {message && (
            <p className="mt-4 p-2 bg-green-100 text-green-700 rounded">
              {message}
            </p>
          )}

          {/* Upload Form */}
          <form
            onSubmit={handleUpload}
            className="mt-10 flex flex-col gap-4 p-4 border rounded-xl bg-white shadow"
          >
            <label className="text-gray-700 font-semibold">
              Upload new content
            </label>
            <input type="file" name="file" className="p-2 border rounded-lg" />
            <textarea
              name="text"
              placeholder="Or enter text content..."
              className="p-2 border rounded-lg"
            ></textarea>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} /> Upload Content
                </>
              )}
            </button>
          </form>

          {/* Contents */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Course Contents
            </h2>
            {contents.length === 0 ? (
              <p className="text-gray-500 italic">No content available yet.</p>
            ) : (
              <ul className="space-y-4">
                {contents.map((c) => (
                  <motion.li
                    key={c.id}
                    className="p-4 border rounded-lg shadow bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg flex items-center gap-2">
                          {c.content_type === "video" && (
                            <Video className="w-5 h-5 text-purple-600" />
                          )}
                          {c.content_type === "image" && (
                            <ImageIcon className="w-5 h-5 text-pink-600" />
                          )}
                          {c.content_type === "document" && (
                            <FileText className="w-5 h-5 text-green-600" />
                          )}
                          {c.title}
                        </p>
                        {renderPreview(c)}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 animate-pulse">
          Course not found
        </p>
      )}
    </div>
    <Footer/>
    </>
  );
}
