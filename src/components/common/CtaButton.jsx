import React from 'react';
import { Link } from 'react-router-dom';

const CtaButton = ({ 
  children = "Apply Now", 
  to = "/pages/admission", 
  className = "",
  onClick,
  ...rest 
}) => {
  const baseClasses = "inline-block px-[30px] py-[12px] border-none rounded-[5px] text-[1rem] font-bold cursor-pointer transition-all duration-300 no-underline text-center";
  const ctaClasses = "bg-white text-[var(--color-secondary)] shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:bg-gray-100 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(255,255,255,0.4)]";

  const combinedClasses = `${baseClasses} ${ctaClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default CtaButton;
