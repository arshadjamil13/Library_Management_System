import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function SignIn(){
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); 
    setError(null);
    try {
      const response = await signIn(formData);
      login(response.access_token, response.user);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password")
    }


  };
    return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
          Sign In
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
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
          Sign In
        </button>

        <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account? 
            <a href="/signup" className="text-blue-600 font-semibold hover:underline ml-1">Sign Up</a>
        </p>
        </form>
      </div>
      </div>
    );
}