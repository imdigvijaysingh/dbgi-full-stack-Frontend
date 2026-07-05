import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import "../styles/Placement.css";

import IMG1 from "../assets/placements_images/1.webp";
import IMG2 from "../assets/placements_images/2.webp";
import IMG3 from "../assets/placements_images/3.webp";
import IMG4 from "../assets/placements_images/4.webp";
import PIC1 from "../assets/recruiters_images/1.webp";
import PIC2 from "../assets/recruiters_images/2.webp";
import PIC3 from "../assets/recruiters_images/3.webp";
import ApplyNow from "../components/ApplyNow";

const Placements = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching academics for:", searchQuery);
      // Implement search functionality
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 80;
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div>
      <Hero
        heading="Placements Records"
        description="Few highlights of some of our students getting placed in their respective fields and some of our Recruitment partners."
      />

      {/* Placement Statistics & Highlights */}
      <section className="py-[80px] bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Placement Highlights</h2>
            <p>Our students' success is a testament to our quality education</p>
          </div>
          <div className="flex flex-wrap justify-center gap-[30px] mt-[40px]">
            <div className="bg-[#f8f9fa] w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-[5px] border-[var(--color-primary)] transition-transform duration-300 hover:scale-105">
              <span className="text-[2.5rem] font-bold text-[#333]">42 LPA</span>
              <span className="text-[#666] font-medium text-[0.95rem]">Highest Package</span>
            </div>
            <div className="bg-[#f8f9fa] w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-[5px] border-[#ffd200] transition-transform duration-300 hover:scale-105">
              <span className="text-[2.5rem] font-bold text-[#333]">8.5 LPA</span>
              <span className="text-[#666] font-medium text-[0.95rem]">Average Package</span>
            </div>
            <div className="bg-[#f8f9fa] w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-[5px] border-[var(--color-primary)] transition-transform duration-300 hover:scale-105">
              <span className="text-[2.5rem] font-bold text-[#333]">250+</span>
              <span className="text-[#666] font-medium text-[0.95rem]">Top Recruiters</span>
            </div>
            <div className="bg-[#f8f9fa] w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-[5px] border-[#ffd200] transition-transform duration-300 hover:scale-105">
              <span className="text-[2.5rem] font-bold text-[#333]">85%</span>
              <span className="text-[#666] font-medium text-[0.95rem]">Placement Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Placement Process */}
      <section className="py-[80px] bg-[#f8f9fa]">
        <div className="container">
          <div className="section-title">
            <h2>The Placement Process</h2>
            <p>How we prepare you for the corporate world</p>
          </div>
          <div className="max-w-[900px] mx-auto mt-[50px] relative before:content-[''] before:absolute before:left-[50px] max-md:before:left-[30px] before:top-0 before:bottom-0 before:w-[4px] before:bg-[var(--color-primary)] before:-translate-x-1/2">
            {[
              { step: "01", title: "Aptitude & Soft Skills Training", desc: "Rigorous training sessions starting from pre-final year focusing on quantitative aptitude, logical reasoning, and communication skills." },
              { step: "02", title: "Technical Mock Interviews", desc: "Industry experts conduct mock technical interviews to give students real-world experience and detailed feedback." },
              { step: "03", title: "Pre-Placement Talks", desc: "Companies visit the campus to interact with students, discussing job profiles, company culture, and expectations." },
              { step: "04", title: "Campus Recruitment Drive", desc: "Final selection process including written tests, group discussions, and personal interviews by recruiting companies." }
            ].map((item, index) => (
              <div key={index} className="relative pl-[100px] max-md:pl-[70px] mb-[40px] last:mb-0">
                <div className="absolute left-[50px] max-md:left-[30px] top-0 w-[50px] h-[50px] max-md:w-[40px] max-md:h-[40px] bg-white border-[4px] border-[var(--color-primary)] rounded-full flex items-center justify-center font-bold text-[1.2rem] text-[var(--color-primary)] -translate-x-1/2 shadow-[0_0_0_5px_rgba(254,11,0,0.1)]">
                  {item.step}
                </div>
                <div className="bg-white p-[25px] rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] transition-transform duration-300">
                  <h4 className="text-[1.3rem] text-[#333] mb-[10px] font-semibold">{item.title}</h4>
                  <p className="text-[#666] leading-[1.6] m-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-title">
            <h2>Placements Track Record</h2>
          </div>
        </div>

        <div className="container-main">
          <div className="section">
            <img src={IMG1} alt="Placement 1" />
          </div>

          <div className="section">
            <img src={IMG2} alt="Placement 2" />
          </div>

          <div className="section">
            <img src={IMG3} alt="Placement 3" />
          </div>

          <div className="section">
            <img src={IMG4} alt="Placement 4" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-title">
            <h2>Our Recruiters</h2>
          </div>
        </div>

        <div className="container-main">
          <div className="section">
            <img src={PIC1} alt="Recruiter 1" />
          </div>
          <div className="section">
            <img src={PIC2} alt="Recruiter 2" />
          </div>
          <div className="section">
            <img src={PIC3} alt="Recruiter 3" />
          </div>
        </div>
      </section>

      <ApplyNow
        heading="Ready to Start Your Academic Journey?"
        description="Take the first step toward your future at Dev Bhoomi Group of Institutions. Applications for the next academic year are now open."
        btnText="Join DBGI"
      />

      </div>
  );
};

export default Placements;
