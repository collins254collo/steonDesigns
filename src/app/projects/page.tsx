import { JSX } from "react";
import ProjectCard from "../../components/portolioCard";

const projects = [
  {
    title: "Modern Living Room",
    description: "A cozy yet elegant living space with natural light.",
    image: "/livingroom.jpg",
  },
  {
    title: "Minimalist Bedroom",
    description: "Clean and calm bedroom design with soft tones.",
    image: "/bedroom.jpg",
  },
  {
    title: "Luxury Kitchen",
    description: "High-end kitchen with premium finishes and smart storage.",
    image: "/kitchen.jpg",
  },
];

export default function Projects(): JSX.Element {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-700 mb-8">Our Projects</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            title={project.title}
            description={project.description}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}
