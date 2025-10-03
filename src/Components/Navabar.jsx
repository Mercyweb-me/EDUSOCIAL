import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Navabar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // check if logged in
  const role = user?.role; // "admin" or "student"

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/"); // go home
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-pink-400 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-8xl mx-auto px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-100 font-serif"
          >
            📚 EduManage
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 font-serif text-yellow-100 items-center">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            {!user ? (
              <>
                <Link
                  to="/get-started"
                  className="hover:text-blue-600 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/Register/Page"
                  className="hover:text-blue-600 transition"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="hover:text-blue-600 transition"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <Link
                    to="/Admin/Dashbord"
                    className="hover:text-blue-600 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "student" && (
                  <Link
                    to="/Student/Dashbord"
                    className="hover:text-blue-600 transition"
                  >
                    Dashboard
                  </Link>
                )}

                {/* Dropdown for logout */}
                <div className="relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-1 hover:text-blue-600 transition"
                  >
                    {user.username || "Profile"} <FaChevronDown size={12} />
                  </button>

                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 text-gray-700">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

     {/* Mobile dropdown menu */}
{isOpen && (
  <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2 font-serif">
    <Link
      to="/"
      className="block hover:text-blue-600"
      onClick={() => setIsOpen(false)}
    >
      Home
    </Link>

    {!user ? (
      <>
        <Link
          to="/get-started"
          className="block hover:text-blue-600"
          onClick={() => setIsOpen(false)}
        >
          Get Started
        </Link>
        <Link
          to="/Register/Page"
          className="block hover:text-blue-600"
          onClick={() => setIsOpen(false)}
        >
          Register
        </Link>
        <Link
          to="/Login"
          className="block hover:text-blue-600"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
      </>
    ) : (
      <>
        {role === "admin" && (
          <Link
            to="/Admin/Dashbord"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        )}
        {role === "student" && (
          <Link
            to="/Student/Dashbord"
            className="block hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        )}

        <button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

    </nav>
  );
}
