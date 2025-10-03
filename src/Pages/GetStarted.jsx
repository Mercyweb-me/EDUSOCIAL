import { Link } from "react-router-dom";
import Navbar from "../Components/Navabar";
import Footer from "../Components/Footer";

const GetStarted = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen relative">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url(/imageback2.webp)] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main section */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6 font-serif">
            Welcome to <span className="text-pink-400">EduManage</span>
          </h1>
          <p className="font-serif text-base md:text-xl text-indigo-200 max-w-2xl mb-10 drop-shadow-md font-semibold">
            Your all-in-one school management system 🚀 <br />
            Manage students, teachers, and records seamlessly.
          </p>

        {/* Buttons */}
<div className="flex flex-col sm:flex-row gap-4">
  <Link to="/Login">
    <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-600 to-blue-400 shadow-md text-white text-lg rounded-full hover:scale-105 transition font-serif">
      <span className="text-xl font-extrabold text-pink-300">L</span>ogin
    </button>
  </Link>

  <Link to="/Register/Page">
    <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-400 shadow-md text-white text-lg rounded-full hover:scale-105 transition font-serif">
      <span className="font-extrabold text-xl text-yellow-300">R</span>egister
    </button>
  </Link>
</div>
        </main>
      </div>

      {/* Why Choose Section */}
      <div className="py-12 bg-gradient-to-t from-sky-500 to-green-500 font-sans">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-6 text-center">
          Why Choose EduManage?
        </h2>
        <ul className="space-y-2 text-yellow-100 max-w-xl mx-auto text-center mb-10 px-6">
          <li>✅ Simplified student and staff management</li>
          <li>✅ Secure record keeping with modern tech</li>
          <li>✅ Real-time communication between admins and students</li>
          <li>✅ Insightful dashboards & performance tracking</li>
        </ul>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12">
          <div className="bg-green-700 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">🚀 Innovation</h3>
            <p className="text-white text-sm">
              Embracing modern technology to transform learning and school management.
            </p>
          </div>

          <div className="bg-indigo-700 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-green-200 mb-2">🔍 Transparency</h3>
            <p className="text-white text-sm">
              Ensuring accurate records and accountability for all stakeholders.
            </p>
          </div>

          <div className="bg-pink-700 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-yellow-200 mb-2">🤝 Collaboration</h3>
            <p className="text-white text-sm">
              Building stronger connections between students, teachers, and admins.
            </p>
          </div>

          <div className="bg-yellow-700 shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-purple-200 mb-2">🌱 Excellence</h3>
            <p className="text-white text-sm">
              Helping learners and institutions achieve their full potential.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GetStarted;
