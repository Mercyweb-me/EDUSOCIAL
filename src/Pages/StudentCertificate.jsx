import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowLeft } from "lucide-react";


export default function StudentCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.username || "Student";
  const courseTitle = "Sample Course"; // You can fetch if needed

  return (
      <>
     
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-100 p-6">
      <motion.div
        className="bg-white border-4 border-yellow-500 rounded-2xl shadow-2xl p-10 text-center max-w-2xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative Background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200 rounded-full blur-2xl opacity-30"></div>

        <Award size={50} className="text-yellow-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Certificate of Completion</h1>
        <p className="mt-4 text-gray-600 text-lg">
          This is proudly presented to
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-purple-700">{studentName}</h2>
        <p className="mt-4 text-gray-600">
          for successfully completing the course
        </p>
        <h3 className="mt-2 text-xl font-semibold text-blue-700 italic">
          {courseTitle}
        </h3>

        <motion.button
          onClick={() => navigate("/Student/Dashbord")}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}
