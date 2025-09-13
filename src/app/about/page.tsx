export const metadata = {
  title: "About Us | Interior Design Studio",
};

import React from "react";

export default function About(): React.JSX.Element {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-700 mb-4">About Us</h1>
      <p className="text-gray-700 leading-relaxed">
        At Interior Design Studio, we believe every space has the potential to be
        transformed into something extraordinary. With years of experience, our team
        blends creativity and functionality to create spaces that inspire comfort and style.
      </p>
    </section>
  );
}
