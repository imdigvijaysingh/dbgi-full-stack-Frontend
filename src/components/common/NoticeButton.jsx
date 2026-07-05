import React from 'react';
import { Link } from 'react-router-dom';

const NoticeButton = ({ 
  children, 
  className = '', 
  to,
  href,
  onClick, 
  type = 'button', 
  disabled = false,
  ...rest
}) => {
  const baseClasses = "inline-block px-[30px] py-[12px] border-none rounded-[5px] text-[1rem] font-semibold cursor-pointer transition-all duration-300 no-underline text-center";
  const whiteVariantClasses = "bg-white text-blue-600 shadow-[0_2px_10px_rgba(255,255,255,0.2)] hover:bg-gray-100 hover:text-blue-700 hover:-translate-y-[3px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]";

  const combinedClasses = `${baseClasses} ${whiteVariantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={combinedClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default NoticeButton;
