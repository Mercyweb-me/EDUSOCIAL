import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navabar from "../Components/Navabar";
import Footer from "../Components/Footer";

const API = "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api";

// ✅ Get headers with correct token
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token"); // fixed (underscore)
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export default function StudentDashbord() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  // ✅ Fetch all active courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API}/courses/?is_active=true`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data.results || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // ✅ Fetch student's enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${API}/enrollments/student_enrollments/`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch enrollments");

      const data = await res.json();
      console.log("📥 Enrollments API response:", data);

      // normalize API shape
      if (res.ok) setEnrollments(data.results || data)
      else setError("Failed to fetch enrollments")
    } catch {
      setError("Error fetching enrollments")
    } 
  }

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  // ✅ Handle enrolling in a course
const handleEnroll = async (courseId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // ✅ same as guide

    const res = await fetch(`${API}/enrollments/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ student: user.id, course: courseId }), // ✅ matches guide
    });

    const data = await res.json();
    console.log("📤 Enroll response:", data);

    if (res.ok) {
      alert("✅ Pending Approval");
      fetchEnrollments(); // refresh enrollments after success
    } else {
      console.error("❌ Enrollment failed:", data);
      alert(`❌ Enrollment failed: ${data.detail || JSON.stringify(data)}`);
    }
  } catch (err) {
    console.error("Error enrolling:", err);
    alert("❌ Error enrolling, check console.");
  }
};


  // ✅ Helper: find enrollment status for a course
  const getEnrollmentStatus = (courseId) => {
    const e = enrollments.find((enr) => {
      if (typeof enr.course === "number") {
        return enr.course === courseId;
      }
      if (typeof enr.course === "object" && enr.course !== null) {
        return enr.course.id === courseId;
      }
      return false;
    });

    return e ? e.status : null;
  };

  return (
    <>
      <Navabar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 mt-24 text-center text-gray-800">
          📚 Available Courses
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {courses.map((c,i) => {
            const status = getEnrollmentStatus(c.id);

            return (
              <motion.div
                key={c.id}
                className="border rounded-2xl shadow-lg p-5 flex flex-col bg-white hover:shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.1}s both` }}
              >
                
                <h2 className="font-bold text-lg mb-2 text-gray-800">
                  {c.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {c.description}
                </p>

                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <div>👨‍🏫 Instructor: {c.instructor_name}</div>
                  <div>📅 Starts: {c.start_date}</div>
                  <div>⏳ Ends: {c.end_date}</div>
                </div>

                {/* Enrollment Status */}
                {status === "approved" ? (
                  <button
                    onClick={() => navigate(`/student/courses/${c.id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
                  >
                    View Details
                  </button>
                ) : status === "pending" ? (
                  <span className="inline-flex items-center justify-center gap-2 text-yellow-600 text-sm font-medium">
                    ⏳ Pending Approval
                  </span>
                ) : (
                  <button
                    type="submit"
                    onClick={() => handleEnroll(c.id)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
                  >
                    Enroll
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <Footer />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
