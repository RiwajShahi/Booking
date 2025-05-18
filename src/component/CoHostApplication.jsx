import React, { useState } from "react";

const CoHostApplication = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or store it
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6">Co-Host Application</h1>
        <div className="bg-green-100 text-green-800 rounded-xl p-6 text-center font-medium">
          Thank you for applying to be a co-host! We will review your
          application and contact you soon.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Co-Host Application</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow border border-gray-100"
      >
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Experience (optional)
          </label>
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Why do you want to be a co-host?
          </label>
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-semibold py-3 rounded-lg hover:bg-sky-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CoHostApplication;
