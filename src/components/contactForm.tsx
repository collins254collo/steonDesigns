"use client";

import { JSX, useState } from "react";

export default function ContactForm(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder for sending data (API integration)
    console.log({ name, email, message });
    setSuccess(true);

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md"
    >
      {success && (
        <p className="text-green-600 font-medium text-center">
          Thank you! Your message has been sent.
        </p>
      )}

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        required
      />

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        required
      />

      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 h-32"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-amber-700 text-white p-3 font-medium rounded-lg hover:bg-amber-800 transition"
      >
        Send Message
      </button>
    </form>
  );
}
