import { useState } from "react";

export const Signup = () => {
  const [formdetails, setFormdetails] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formdetails.name ||
      !formdetails.number ||
      !formdetails.email ||
      !formdetails.password
    ) {
      alert("All fields are required");
      return;
    }

    console.log(formdetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formdetails.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none "
        />

        <input
          type="tel"
          name="number"
          placeholder="Mobile Number"
          value={formdetails.number}
          onChange={handleChange}
          maxLength="10"
          className="w-full px-3 py-2 border rounded-md focus:outline-none  "
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formdetails.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdetails.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none "
        />

        <button
          type="submit"
          className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition"
        >
          Signup
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-orange-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};
