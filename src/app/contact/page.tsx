import ContactForm from "../../components/contactForm";
import { JSX } from "react";

export const metadata = {
  title: "Contact | Interior Design Studio",
};

export default function Contact(): JSX.Element {
  return (
    <section className="px-6 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">
        Contact Us
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Have a question or want to start your dream interior project? Fill out the form below and we will get back to you promptly.
      </p>
      <ContactForm />
    </section>
  );
}
