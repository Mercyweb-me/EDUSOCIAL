// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  Eye,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import Navabar from "../Components/Navabar";
import Footer from "../Components/Footer";

const API = "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api";

const getAuthHeaders = () => {
  const t = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${t}`,
    "Content-Type": "application/json",
  };
};

export default function AdminDashbord() {
  const [courses, setCourses] = useState([]);
  const [pending, setPending] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  // ✅ Fetch courses created by this admin
  const fetchMyCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(`${API}/courses/?instructor=${user.id}`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      console.log("Fetched courses:", data);

      setCourses(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // ✅ Fetch pending enrollments
  const fetchPending = async () => {
    try {
      const res = await fetch(`${API}/enrollments/pending_approvals/`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending enrollments:", err);
    }
  };

  useEffect(() => {
    fetchMyCourses();
    fetchPending();
  }, []);

  // ✅ Create course (no file upload here anymore)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return alert("Please log in again.");

      const payload = {
        title: form.title,
        description: form.description,
        start_date: form.start_date,
        end_date: form.end_date,
        instructor: user.id,
        is_active: true,
      };

      const res = await fetch(`${API}/courses/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
        });
        fetchMyCourses();
      } else {
        alert("Error creating course: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`${API}/courses/${id}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        fetchMyCourses();
      } else {
        const err = await res.json();
        alert("Failed to delete: " + JSON.stringify(err));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEnroll = async (id, status) => {
    try {
      const res = await fetch(`${API}/enrollments/${id}/${status}/`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        fetchPending();
      }
    } catch (err) {
      console.error("Error updating enrollment:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 space-y-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl">
      <Navabar />

      {/* Page Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-purple-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎓 Admin Dashboard
      </motion.h1>

      {/* Create Course */}
      <motion.section className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
        <h2 className="font-semibold mb-4 flex items-center gap-2 text-lg text-blue-700">
          <BookOpen size={20} /> Create New Course
        </h2>
        <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
          <input
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-purple-300"
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-purple-300"
            placeholder="Description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
            type="date"
            required
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
          <input
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-blue-300"
            type="date"
            required
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />

          <button
            type="submit"
            className="col-span-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <Plus size={18} /> Create Course
          </button>
        </form>
      </motion.section>

      {/* My Courses */}
      <motion.section className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <h2 className="font-semibold mb-4 flex items-center gap-2 text-lg text-purple-700">
          <BookOpen size={20} /> My Courses
        </h2>
        {courses.length === 0 && (
          <p className="text-gray-500">No courses yet.</p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <motion.div
              key={c.id}
              className="bg-gradient-to-br from-purple-50 to-blue-50 border rounded-xl p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h3 className="font-bold text-lg text-purple-700">{c.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {c.start_date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {c.end_date}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/courses/${c.id}`}
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Eye size={14} /> View & Upload Content
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pending Enrollments */}
      <motion.section className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
        <h2 className="font-semibold mb-4 flex items-center gap-2 text-lg text-pink-700">
          <Users size={20} /> Pending Enrollments
        </h2>
        {pending.length === 0 && (
          <p className="text-gray-500">No pending requests.</p>
        )}
        <div className="space-y-3">
          {pending.map((en) => (
            <motion.div
              key={en.id}
              className="border rounded-lg p-4 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 shadow-sm hover:shadow-lg transition"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <p className="font-medium text-purple-700">{en.student_name}</p>
                <p className="text-sm text-gray-600">{en.course_title}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEnroll(en.id, "approve")}
                  className="text-green-600 hover:underline flex items-center gap-1"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={() => handleEnroll(en.id, "reject")}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ✅ Enroll Student by ID */}
      <motion.section className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <h2 className="font-semibold mb-4 flex items-center gap-2 text-lg text-green-700">
          <Users size={20} /> Enroll Student Manually
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const studentId = formData.get("student_id");
            const courseId = formData.get("course_id");

            try {
              const res = await fetch(`${API}/enrollments/`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                  student: studentId,
                  course: courseId,
                }),
              });

              const data = await res.json();
              if (res.ok) {
                alert("✅ Student enrolled successfully!");
                e.target.reset();
                fetchPending(); // refresh list
              } else {
                alert("❌ Error enrolling student: " + JSON.stringify(data));
              }
            } catch (err) {
              console.error("Enroll error:", err);
              alert("Something went wrong!");
            }
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <input
            name="student_id"
            type="number"
            placeholder="Student ID"
            required
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-green-300"
          />
          <input
            name="course_id"
            type="number"
            placeholder="Course ID"
            required
            className="border rounded px-3 py-2 shadow-sm focus:ring focus:ring-green-300"
          />
          <button
            type="submit"
            className="col-span-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            Enroll Student
          </button>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
}
