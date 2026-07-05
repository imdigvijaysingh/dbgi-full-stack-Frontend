import React from "react";

const LeaderCard = (
    {
        leaderImg,
        leaderImgAlt,
        leaderName,
        leaderPosition,
        leaderQuote,
    }
) => {
  return (
    <div>
      <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group">
        <div className="h-[250px] overflow-hidden">
          <img src={leaderImg} alt={leaderImgAlt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="p-[25px] text-center">
          <h3 className="text-[1.5rem] text-[var(--color-primary)] mb-[5px]">{leaderName}</h3>
          <div className="text-[var(--color-secondary)] font-semibold mb-[10px]">{leaderPosition}</div>
          <p className="text-[#666] text-[0.9rem]">{leaderQuote}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
