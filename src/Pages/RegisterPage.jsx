import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navabar from '../Components/Navabar'
import Footer from '../Components/Footer'

const RegisterPage = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '', password: '', firstname: '', lastname: '',
    phone: '', dob: '', address: '', secretKey: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstname,
        last_name: formData.lastname,
        phone: formData.phone,
        date_of_birth: formData.dob,
        address: formData.address,
      };

      if (role === 'admin') {
        requestData.admin_secret = formData.secretKey;
      }

      const response = await fetch(
        'https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/auth/register/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        if (data.access && data.refresh) {
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
        } else {
          setError('Registration succeeded, but tokens are missing.');
          return;
        }

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        if (data.user?.role === 'student') {
          navigate('/Student/Dashbord');
        } else if (data.user?.role === 'admin') {
          navigate('/Admin/Dashbord');
        } else {
          navigate('/Register/page');
        }
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <>
      <div className="bg-[url(/AdminImage.jpg)] bg-cover bg-center mt-15 min-h-screen flex flex-col">
        <Navabar />

        <div className="flex-grow flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-amber-600">
              Create an Account
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md text-center">
                {error}
              </div>
            )}

            {/* Role Selector */}
            <div className="flex justify-center gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className="accent-amber-500"
                />
                <span className="font-medium">Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="accent-amber-500"
                />
                <span className="font-medium">Admin</span>
              </label>
            </div>

            {/* Register Form */}
            <form className="space-y-4" onSubmit={handleRegister}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />

                <input
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              {role === 'admin' && (
                <input
                  name="secretKey"
                  type="password"
                  placeholder="Admin Secret Key"
                  value={formData.secretKey}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
