import React from 'react';
import Button from './Button';

const ApplyNowButton = ({ 
  children = "Apply Now", 
  className = "",
  onClick,
  ...rest 
}) => {
  const handleOpenModal = (e) => {
    e.preventDefault();
    if(onClick) onClick(e);
    window.dispatchEvent(new CustomEvent('openAdmissionModal'));
  };

  return (
    <Button
      onClick={handleOpenModal}
      className={`min-w-[200px] !bg-gradient-to-r !from-[#ffd200] !to-[#ff8c00] !border-none !text-white hover:!from-[#ffea00] hover:!to-[#ffa500] shadow-[0_0_20px_rgba(255,210,0,0.6)] hover:shadow-[0_0_25px_rgba(255,210,0,0.8)] hover:-translate-y-1 transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ApplyNowButton;
