import React from "react";
import ApplyNow from "../components/ApplyNow";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/common/Button";
import coursesHeroImg from "../assets/images/courses-hero.webp";

import {
  engineeringCourses,
  computerApplicationCourses,
  polytechnicCourses,
  managementCourses,
  pharmacyCourses
} from "../data/coursesData";
import FeatureCard from "../components/FeatureCard";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("engineering");

  const tabData = [
    { id: "engineering", label: "Engineering" },
    { id: "computer_application", label: "Computer Application" },
    { id: "polytechnic", label: "Polytechnic" },
    { id: "management", label: "Management" },
    { id: "pharmacy", label: "Pharmacy" },
  ];



  const getTabContent = () => {
    switch (activeTab) {
      case "engineering":
        return {
          title: "College of Engineering DBGI, Saharanpur",
          subtitle:
            "Offering B.Tech programs in various engineering disciplines",
          courses: engineeringCourses,
        };
      case "computer_application":
        return {
          title: "College of Computer Application DBGI, Saharanpur",
          subtitle:
            "Offering Computer Application courses in both Undergraduate and Postgraduate level",
          courses: computerApplicationCourses,
        };
      case "polytechnic":
        return {
          title: "Dev Bhoomi Institute of Polytechnic, Saharanpur",
          subtitle:
            "Offering diploma programs in various engineering disciplines with industry-focused curriculum",
          courses: polytechnicCourses,
        };
      case "management":
        return {
          title: "Dev Bhoomi School of Professional Studies, Saharanpur",
          subtitle:
            "Offering undergraduate and postgraduate programs in business, computer applications, and commerce",
          courses: managementCourses,
        };
      case "pharmacy":
        return {
          title: "Dev Bhoomi College of Pharmacy, Saharanpur",
          subtitle:
            "Offering diploma and degree programs in pharmaceutical sciences",
          courses: pharmacyCourses,
        };
      default:
        return {
          title: "",
          subtitle: "",
          courses: [],
        };
    }
  };

  const { title, subtitle, courses } = getTabContent();

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
      <section 
        className="h-[90vh] bg-cover bg-center pt-[120px] pb-[60px] relative text-white mt-[70px] flex items-center justify-center text-center before:content-[''] before:absolute before:inset-0 before:z-[1] supports-[padding:max(0px)]:pt-[max(120px,calc(120px+env(safe-area-inset-top)))] max-lg:pt-[130px] max-lg:pb-[70px] max-md:h-[60vh] max-md:pt-[120px] max-md:pb-[40px] max-md:before:bg-[rgba(0,0,0,0.15)] max-sm:h-[50vh] max-sm:pt-[100px] max-sm:pb-[30px]"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,255,0.0), rgba(0,0,255,0.35)), url(${coursesHeroImg})` }}
      >
        <div className="flex w-full justify-center items-center relative z-[2]">
          <div className="relative z-[2] text-white text-center px-[20px] max-w-[900px]">
            <h1 className="text-[3.5rem] font-bold mb-[10px] leading-[1.2] max-lg:text-[2.8rem] max-md:text-[2rem] max-md:mb-[15px] max-sm:text-[1.75rem] max-sm:leading-[1.3] max-sm:mb-[12px]">Courses we are Offering</h1>
            <p className="text-[clamp(0.9rem,2.5vw,1.2rem)] max-w-[600px] mx-auto leading-[1.5] max-md:block max-md:text-[1rem] max-sm:text-[0.95rem] max-sm:mb-[20px] max-sm:max-w-full">
              Explore our diverse range of undergraduate, postgraduate, and
              diploma programs designed to shape future leaders and innovators
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f8f9fa] py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Our Institutions & Programs</h2>
            <p>
              Discover the wide range of academic programs offered across our
              constituent institutions
            </p>
          </div>

          <div className="flex justify-center mb-[40px] flex-wrap gap-[10px]">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`p-[12px_25px] border-none rounded-[5px] text-[1rem] font-semibold cursor-pointer transition-all duration-300 shadow-[var(--shadow)] ${activeTab === tab.id ? "bg-[var(--color-primary)] text-white" : "bg-white hover:bg-[#e2e8f0]"}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="block animate-[fadeIn_0.5s_ease]">
            <div className="text-center mb-[40px]">
              <h3 className="text-[2rem] text-[var(--color-primary)] mb-[10px]">{title}</h3>
              <p className="text-[#666] max-w-[800px] mx-auto">{subtitle}</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] group flex flex-col h-full">
                  <div className="h-[200px] overflow-hidden bg-[#e2e8f0] shrink-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <div className="p-[25px] flex flex-col flex-1">
                    <h4 className="text-[1.5rem] text-[var(--color-primary)] mb-[10px]">{course.title}</h4>
                    <span className="text-[var(--color-secondary)] font-semibold mb-[15px] block">{course.duration}</span>
                    <p className="mb-[15px] text-[#666]">{course.description}</p>
                    <ul className="list-none mb-[20px] pl-0">
                      {course.features.map((feature, index) => (
                        <li key={index} className="py-[5px] relative pl-[25px] before:content-['✓'] before:absolute before:left-0 before:text-[var(--color-accent)] before:font-bold">{feature}</li>
                      ))}
                    </ul>
                    <div className="flex gap-[10px] mt-auto pt-[20px]">
                      <Button to={`/pages/course/${course.slug}`} className="flex-1 text-center whitespace-nowrap !bg-transparent !bg-none !shadow-none !text-red-600 hover:!text-red-700 border-2 border-red-600 hover:bg-red-50">
                        View Details
                      </Button>
                      <Button to="/pages/admission/" className="flex-1 text-center whitespace-nowrap !bg-transparent !bg-none !shadow-none !text-red-600 hover:!text-red-700 border-2 border-red-600 hover:bg-red-50">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose DBGI?</h2>
            <p>
              Discover what makes Dev Bhoomi Group of Institutions the preferred
              choice for quality education
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px]">
            <FeatureCard 
              iconImage= "fas fa-graduation-cap"
              title= "Experienced Faculty Members"
              description= "Learn from highly qualified and experienced faculty members dedicated to student success."
            />
            <FeatureCard 
              iconImage= "fas fa-flask"
              title= "Modern Laboratories"
              description= "State-of-the-art labs equipped with latest technology for practical learning and research."
            />
            <FeatureCard 
              iconImage= "fas fa-book"
              title= "Comprehensive Library"
              description= "Well-stocked library with extensive collection of books, journals, and digital resources."
            />
            <FeatureCard 
              iconImage= "fas fa-briefcase"
              title= "Industry Connections"
              description= "Strong industry partnerships for internships, projects, and placement opportunities."
            />
          </div>
        </div>
      </section>

      {/* Our Teaching Pedagogy */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Our Teaching Pedagogy</h2>
            <p>We believe in experiential learning and industry-aligned education</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px] mt-[40px]">
            <div className="bg-[#f0f4ff] p-[30px] rounded-[12px] text-center transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[5px]">
              <div className="w-[70px] h-[70px] bg-white text-[var(--color-primary)] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px] shadow-sm">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[15px] font-semibold">Project-Based Learning</h4>
              <p className="text-[#666] leading-[1.6]">Hands-on projects in every semester to ensure students can apply theoretical knowledge to real-world problems.</p>
            </div>
            <div className="bg-[#fff0f0] p-[30px] rounded-[12px] text-center transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[5px]">
              <div className="w-[70px] h-[70px] bg-white text-[var(--color-primary)] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px] shadow-sm">
                <i className="fas fa-industry"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[15px] font-semibold">Industry Integration</h4>
              <p className="text-[#666] leading-[1.6]">Regular guest lectures, industrial visits, and workshops conducted by experts from leading corporate sectors.</p>
            </div>
            <div className="bg-[#f0fff4] p-[30px] rounded-[12px] text-center transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[5px]">
              <div className="w-[70px] h-[70px] bg-white text-[var(--color-primary)] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px] shadow-sm">
                <i className="fas fa-users"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[15px] font-semibold">Peer Learning</h4>
              <p className="text-[#666] leading-[1.6]">Collaborative group assignments and technical clubs that foster teamwork, leadership, and communication skills.</p>
            </div>
            <div className="bg-[#fffbf0] p-[30px] rounded-[12px] text-center transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[5px]">
              <div className="w-[70px] h-[70px] bg-white text-[var(--color-primary)] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px] shadow-sm">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[15px] font-semibold">Modern Tech Stack</h4>
              <p className="text-[#666] leading-[1.6]">Curriculum updated regularly to include the latest technologies like AI, IoT, Blockchain, and Data Science.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Pathways */}
      <section className="bg-[#f8f9fa] py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Career Pathways</h2>
            <p>Where our graduates go after completing their studies</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] mt-[40px]">
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-[#2196f3] transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
              <h3 className="text-[1.4rem] text-[#333] mb-[20px] flex items-center gap-[10px] font-semibold"><i className="fas fa-building text-[#2196f3]"></i> Corporate Sector</h3>
              <p className="text-[#666] mb-[15px] leading-[1.6]">Over 70% of our students secure placements in top MNCs, tech giants, and leading core engineering firms across India and abroad.</p>
              <ul className="list-none pl-[20px] [&>li]:py-[5px] [&>li]:text-[#555] [&>li]:list-disc marker:text-[#2196f3]">
                <li>Software Development Engineer</li>
                <li>Business Analyst</li>
                <li>Design Engineer</li>
              </ul>
            </div>
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-[#4caf50] transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
              <h3 className="text-[1.4rem] text-[#333] mb-[20px] flex items-center gap-[10px] font-semibold"><i className="fas fa-university text-[#4caf50]"></i> Higher Education</h3>
              <p className="text-[#666] mb-[15px] leading-[1.6]">Many students pursue Master's or Ph.D. programs at premier institutes like IITs, NITs, and top international universities.</p>
              <ul className="list-none pl-[20px] [&>li]:py-[5px] [&>li]:text-[#555] [&>li]:list-disc marker:text-[#4caf50]">
                <li>M.Tech / ME</li>
                <li>MBA / PGDM</li>
                <li>MS Abroad</li>
              </ul>
            </div>
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-[#ff9800] transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
              <h3 className="text-[1.4rem] text-[#333] mb-[20px] flex items-center gap-[10px] font-semibold"><i className="fas fa-rocket text-[#ff9800]"></i> Entrepreneurship</h3>
              <p className="text-[#666] mb-[15px] leading-[1.6]">With our in-house incubation center, we support student startups with mentorship, funding guidance, and workspace.</p>
              <ul className="list-none pl-[20px] [&>li]:py-[5px] [&>li]:text-[#555] [&>li]:list-disc marker:text-[#ff9800]">
                <li>Tech Startups</li>
                <li>Consulting Firms</li>
                <li>Freelance Agencies</li>
              </ul>
            </div>
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

export default Courses;
