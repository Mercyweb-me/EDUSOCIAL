import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
import Navabar from "../Components/Navabar";
import Footer from "../Components/Footer";

const API = "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api";

// ✅ Auth headers
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("access_token") || localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
};

export default function StudentCourseDetails() {
  const { id } = useParams(); // could be id or slug
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Try fetching course by ID or slug
  const fetchCourse = async () => {
    try {
      let res = await fetch(`${API}/courses/${id}/`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        // fallback: try without trailing slash
        res = await fetch(`${API}/courses/${id}`, {
          headers: getAuthHeaders(),
        });
      }

      if (!res.ok) {
        throw new Error("Course not found");
      }

      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Error fetching course:", err);
      setCourse(null);
    }
  };

  // ✅ Fetch enrollment
  const fetchEnrollment = async () => {
    try {
      const res = await fetch(`${API}/enrollments/?courses=${id}`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch enrollment");
      const data = await res.json();
      setEnrollment(data.results?.[0] || null);
    } catch (err) {
      console.error("Error fetching enrollment:", err);
      setEnrollment(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchEnrollment();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-600 animate-pulse mt-10">
        Loading course details...
      </p>
    );
  }

  // ❌ Not approved yet
  if (enrollment && enrollment.status !== "approved") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p className="text-lg">⏳ You are not approved to view this course yet.</p>
        <button
          onClick={() => navigate("/Student/Dashbord")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <Navabar />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-6">
      {course ? (
        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Decorations */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-purple-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-blue-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/Student/Dashbord")}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-purple-700 flex items-center gap-3">
            <BookOpen size={36} className="text-blue-600" />
            {course.title}
          </h1>

          {/* Description */}
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
            <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Calendar size={20} /> Start Date
              </div>
              <p className="mt-2 text-gray-800">
                {course.start_date || "Not specified"}
              </p>
            </div>
            <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow hover:shadow-md transition">
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <Calendar size={20} /> End Date
              </div>
              <p className="mt-2 text-gray-800">
                {course.end_date || "Not specified"}
              </p>
            </div>
          </motion.div>

          {/* Course Content */}
          <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-inner">
            <h2 className="text-2xl font-bold text-blue-700 mb-3">
              Course Content
            </h2>

            {course.contents && course.contents.length > 0 ? (
              <div className="space-y-3">
                {course.contents.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-lg shadow hover:shadow-md transition"
                  >
                    {item.file ? (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item.title || item.file.split("/").pop()}
                      </a>
                    ) : item.video ? (
                      <video controls className="w-full rounded-lg">
                        <source src={item.video} type="video/mp4" />
                        Your browser does not support video.
                      </video>
                    ) : (
                      <p className="text-gray-700">
                        {item.title || "Unnamed content"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No content available yet.</p>
            )}
          </div>

          {/* ✅ Done Button */}
          <motion.button
            onClick={() => navigate(`/Student/Certificate/${id}`)}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle size={20} />
            Mark as Done & Get Certificate
          </motion.button>
        </motion.div>
      ) : (
        <p className="text-center text-gray-600 animate-pulse">
          ❌ Course not found.
        </p>
      )}
    </div>
    <Footer />
    </>
  );
}
