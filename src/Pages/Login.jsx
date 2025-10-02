import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navabar from "../Components/Navabar";
import Footer from "../Components/Footer";

const API = "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch(`${API}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Use snake_case consistently
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Save student_id if role is student
      if (data.user?.role === "student") {
        localStorage.setItem("student_id", data.user.id);
        navigate("/Student/Dashbord");
      } else if (data.user?.role === "admin") {
        navigate("/Admin/Dashbord");
      } else {
        navigate("/home");
      }
    } else {
      setError(data.detail || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navabar />
      <div className="bg-[url(/AdminImage.jpg)] bg-cover bg-center mt-15 mb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur items-center justify-center rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
            Welcome Back
          </h1>

          {/* Role toggle */}
          <div className="mb-6 flex justify-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              <span className="font-medium">Student</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span className="font-medium">Admin</span>
            </label>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <p className="text-red-600 text-sm bg-red-100 p-2 rounded">
                {error}
              </p>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : `Login as ${role}`}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
