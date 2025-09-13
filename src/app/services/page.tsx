import { JSX } from "react";
import ServiceCard from "../../components/servicesCard";
import { FaCouch, FaBuilding, FaDraftingCompass } from "react-icons/fa";

const services = [
  {
    title: "Residential Design",
    description: "Personalized interiors for your dream home.",
    icon: <FaCouch />,
  },
  {
    title: "Commercial Design",
    description: "Functional yet stylish spaces for businesses.",
    icon: <FaBuilding />,
  },
  {
    title: "Space Planning",
    description: "Maximizing space with smart layouts.",
    icon: <FaDraftingCompass />,
  },
];

export default function Services(): JSX.Element {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-700 mb-8">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  );
}
