import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import campus2 from "../assets/images/campus_2.webp";

const Hero = ({
  heading,
  description,
  showButtons = true,
  primaryBtnText,
  secondaryBtnText,
  onPrimaryClick,
  secondaryBtnLink,
  singleLineTitle = false,
}) => {
  return (
    <section 
      id="home" 
      className="h-[calc(100vh-94px)] min-h-[400px] bg-cover bg-center bg-no-repeat text-white flex items-center text-center mt-[94px] max-md:mt-[60px] max-md:h-[calc(100vh-60px)]"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.75), rgba(0, 0, 255, 0.3)), url(${campus2})` }}
    >
      <div className="container">
        <div className="max-w-[1200px] mx-auto p-[20px]">
          <h1 className={`text-[clamp(2rem,5vw,3.5rem)] mb-[20px] leading-[1.2] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] ${singleLineTitle ? 'whitespace-nowrap max-lg:whitespace-normal' : ''}`}>{heading}</h1>
          <p className="max-w-[800px] mx-auto text-[clamp(1rem,2vw,1.2rem)] mb-[30px] opacity-90 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] leading-[1.6]">{description}</p>

          {showButtons && (
            <div className="flex justify-center gap-[20px] mt-[30px] flex-wrap max-md:flex-col max-md:items-center">
              {primaryBtnText && (
                <Button onClick={onPrimaryClick} className="max-md:w-full max-md:max-w-[250px]">
                  {primaryBtnText}
                </Button>
              )}

              {secondaryBtnText && secondaryBtnLink && (
                <Button
                  to={secondaryBtnLink}
                  variant="outline"
                  className="max-md:w-full max-md:max-w-[250px] !bg-[#fe0b00] !border-[#fe0b00] !text-white hover:!bg-red-700 hover:!border-red-700 shadow-[0_4px_15px_rgba(254,11,0,0.3)]"
                  rel="noopener noreferrer"
                >
                  {secondaryBtnText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero;
