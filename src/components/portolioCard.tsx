import { JSX } from "react";

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string; // optional image URL
};

export default function ProjectCard({
  title,
  description,
  image,
}: ProjectCardProps): JSX.Element {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
