import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-[#2B402B] rounded-lg p-4 sm:p-6 border border-[#4A5D4A] ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default FormSection;
