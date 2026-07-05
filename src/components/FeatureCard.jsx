import React from "react";

const FeatureCard = ({
    iconImage,
    title,
    description,
}) => {
  return (
    <div>
      <div className="text-center p-[40px_20px] rounded-[10px] bg-[#f8f9fa] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-[5px] group">
        <i className={`${iconImage} text-[3rem] text-[var(--color-secondary)] mb-[20px] transition-all duration-300 group-hover:text-white`}></i>
        <h3 className="text-[1.5rem] mb-[15px]">{title}</h3>
        <p className="text-[#666] group-hover:text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
