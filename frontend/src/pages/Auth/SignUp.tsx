import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export default function SignUp(){
  const {login} = useAuth();

  const navigate = useNavigate();
  const [error,setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); 
    setError(null);
    try{
      const response = await signUp(formData);
      login(response.access_token, response.user);
      navigate("/");
    }catch(error){
      setError("Signup failed. Email may already exist.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 p-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
            Sign Up
          </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Create Account
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?
                <a href="/signin" className="text-blue-600 font-semibold hover:underline ml-1">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    );
}