import React from 'react';


const FloatingIcons = () => {
  return (
    <div className="fixed bottom-5 right-5 md:bottom-[30px] md:right-[30px] flex flex-col gap-[15px] z-[9999]">
      <a 
        href="tel:+919568775222" 
        className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-full flex items-center justify-center text-white text-[22px] md:text-[28px] no-underline shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.4)] hover:text-white bg-[#007bff] animate-[glow-blue_2s_infinite_ease-in-out]" 
        aria-label="Call us"
        title="Call +91 9568775222"
      >
        <i className="fas fa-phone"></i>
      </a>
      <a 
        href="https://wa.me/919568775222" 
        className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] rounded-full flex items-center justify-center text-white text-[22px] md:text-[28px] no-underline shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.4)] hover:text-white bg-[#25d366] animate-[glow-green_2s_infinite_ease-in-out]" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="WhatsApp us"
        title="WhatsApp +91 9568775222"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default FloatingIcons;
