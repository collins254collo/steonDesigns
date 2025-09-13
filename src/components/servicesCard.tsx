import { JSX } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode; // optional icon
};

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps): JSX.Element {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-300">
      {icon && <div className="text-amber-600 mb-4 text-3xl">{icon}</div>}
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
