import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="card-apple hover:scale-105 p-8 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-xl bg-white border border-gray-100">
      <div className="text-5xl text-orange-500 mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#696969]">{title}</h3>
      <p className="text-[#696969]">{description}</p>
    </div>
  );
};

export default ServiceCard;
