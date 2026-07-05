import React from "react";
import campus1 from "../assets/images/campus_1.webp";
import { Link } from "react-router-dom";
import Button from "./common/Button";
const About = (
  {
    titleHeading, 
    titleDescription,
    contentHeading,
    contentDescription,
    showButtons,
    btnText,
  }
) => {
  return (
    <div>
      <section className="bg-white" id="about">
        <div className="container">
          <div className="section-title max-md:!text-left max-md:[&>p]:!mx-0 max-md:[&::after]:!mx-0">
            <h2>{titleHeading}</h2>
            <p>
              {titleDescription}
            </p>
          </div>
          <div className="flex items-center gap-[50px] max-lg:flex-col max-lg:gap-[25px] scroll-animation">
            <div className="flex-1">
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] text-[var(--color-primary)] mb-[20px]">{contentHeading}</h3>
              <p className="mb-[20px] max-lg:mb-0 leading-[1.6]">
                {contentDescription}
              </p>
              {showButtons && (
                <div className="max-lg:hidden">
                  <Button to="/pages/about-us" className="mt-[20px] scroll-animation">
                    {btnText}
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 rounded-[10px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.1)] group scroll-animation">
              <img src={campus1} alt="DBGI Campus" className="w-full h-auto block transition-transform duration-300 group-hover:scale-105" />
            </div>

            {showButtons && (
              <div className="hidden max-lg:block max-lg:text-center max-lg:w-full">
                <Button to="/pages/about-us" className="scroll-animation">
                  {btnText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
