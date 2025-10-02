import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-[url('/imageBack.webp')] bg-cover bg-center relative">
        <motion.h1
          className="text-6xl font-extrabold mb-6 font-serif text-purple-800 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Student & Course Management
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-8 max-w-2xl text-yellow-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A powerful platform that makes it easy to manage students, courses,
          and enrollments with just a few clicks. Whether you’re an instructor
          or a student, everything you need is in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/get-started"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg text-white font-semibold rounded-lg hover:scale-105 transform transition"
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <BookOpen className="mx-auto text-purple-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-3 text-purple-800">
            Course Management
          </h3>
          <p className="text-gray-600">
            Create, edit, and manage courses effortlessly. Add descriptions,
            timelines, and course content in minutes.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <Users className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-3 text-blue-800">
            Student Management
          </h3>
          <p className="text-gray-600">
            Track student details, progress, and enrollments in one organized
            dashboard built for efficiency.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-3 text-green-800">
            Enrollment Approvals
          </h3>
          <p className="text-gray-600">
            Approve or reject enrollments with one click. Keep your classes
            organized and secure.
          </p>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Simplify Your Student & Course Management?
        </motion.h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join us today and experience how easy managing education can be with
          our modern platform.
        </p>
        <Link
          to="/get-started"
          className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
