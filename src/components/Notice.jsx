import React from "react";
import { Link } from "react-router-dom";
import NoticeButton from "./common/NoticeButton";

const Notice = ({
  noticeSlides,
  currentNoticeSlide,
  setCurrentNoticeSlide,
}) => {
  return (
    <div>
      <section className="py-[30px] md:py-[80px] rounded-[2rem] bg-[linear-gradient(rgba(0,0,255,0.9),rgba(0,0,255,0.7))] text-white text-center mx-auto my-[2rem] md:my-[4rem] w-[90%] md:w-[85%] max-w-[1000px] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)] scroll-animation" id="notice">
        <div className="container px-[5px]">
          <div className="text-center mb-[20px] md:mb-[50px] relative [&>h2]:text-white [&>p]:text-white [&::after]:bg-[var(--color-accent)] [&::after]:content-[''] [&::after]:block [&::after]:w-[80px] [&::after]:h-[4px] [&::after]:mx-auto [&::after]:mt-[10px] md:[&::after]:mt-[15px] [&::after]:rounded-[2px]">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] mb-[10px] md:mb-[15px]">Notice Board</h2>
            <p className="text-[clamp(0.85rem,2vw,1.1rem)] max-w-[800px] mx-auto leading-[1.6]">Stay updated with the latest announcements and events</p>
          </div>
          <div className="max-w-[800px] mx-auto relative overflow-hidden min-h-[180px] md:min-h-[250px]">
            {noticeSlides.map((slide, index) => (
              <div
                key={index}
                className={`p-[20px] animate-[fade_1s_ease] ${
                  currentNoticeSlide === index ? "block" : "hidden"
                }`}
              >
                <div>
                  <h3 className="text-[clamp(1.2rem,3vw,2.2rem)] mb-[10px] md:mb-[15px] text-white font-bold">{slide.title}</h3>
                  <p className="text-[clamp(0.9rem,2vw,1.3rem)] mb-[15px] md:mb-[25px] leading-[1.6] opacity-90">{slide.description}</p>
                  {slide.buttonText && slide.buttonText.trim() !== "" && (
                    <NoticeButton to={slide.link}>
                      {slide.buttonText}
                    </NoticeButton>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-[30px] gap-[15px]">
            {noticeSlides.map((_, index) => (
              <span
                key={index}
                className={`w-[12px] h-[12px] rounded-full cursor-pointer transition-all duration-300 border-2 ${
                  currentNoticeSlide === index ? "bg-white scale-[1.2] border-[var(--color-accent)]" : "bg-white/40 border-transparent hover:bg-white/70"
                }`}
                onClick={() => setCurrentNoticeSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notice;
