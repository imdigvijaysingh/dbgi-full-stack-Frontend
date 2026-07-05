import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const Academics = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Academic sections data
  const academicSections = [
    {
      id: "alumni",
      title: "Alumni Registration",
      description:
        "Register as an alumni and stay connected with your alma mater",
      link: "/pages/alumni-registration",
      category: "student",
      icon: "👥",
    },
    {
      id: "job-fair",
      title: "Job Fair",
      description: "Upcoming job fairs and placement opportunities",
      link: "/pages/job-fair",
      category: "career",
      icon: "💼",
    },
    {
      id: "calendar",
      title: "Academic Calendar",
      description: "Important dates, schedules, and academic timelines",
      link: "/pages/academic-calendar",
      category: "academic",
      icon: "📅",
    },
    {
      id: "syllabus",
      title: "Syllabus",
      description: "Course curriculum and detailed syllabus for all programs",
      link: "/pages/syllabus",
      category: "academic",
      icon: "📚",
    },
    {
      id: "results",
      title: "Result",
      description: "Examination results and grade reports",
      link: "/pages/results",
      category: "academic",
      icon: "📊",
    },
    {
      id: "web",
      title: "DBGI Web",
      description: "Access internal web portal and online resources",
      link: "https://erp175.balajisolution.in/",
      external: true,
      category: "resources",
      icon: "🌐",
    },
    {
      id: "papers",
      title: "Previous Year Exam Papers",
      description: "Archive of previous examination question papers",
      link: "/pages/previous-papers",
      category: "academic",
      icon: "📝",
    },
  ];

  // Filter sections by category
  const filteredSections =
    activeTab === "all"
      ? academicSections
      : academicSections.filter((section) => section.category === activeTab);

  // Header scroll effect
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
      <div className="w-full overflow-x-hidden">
        {/* Navigation bar */}
        <Hero
          heading="Academics Page"
          description="Explore all academic resources and services like Student ERP Portal, Previous Year Questions Papers, Results, Curriculum, Academic Calender, Alumni registration and many more."
        />

        {/* Academic Tabs */}
        <section className="mt-[2rem] py-[20px] sticky top-[60px] z-[999] max-md:static max-lg:top-[60px]">
          <div className="container">
            <div className="flex justify-center gap-[10px] flex-wrap max-md:justify-start max-md:overflow-x-auto max-md:py-[10px] max-lg:gap-[8px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              <button
                className={`py-[12px] px-[24px] bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-[0.9rem] whitespace-nowrap hover:bg-[rgba(255,0,0,0.1)] hover:-translate-y-[2px] max-lg:px-[20px] max-lg:py-[10px] max-lg:text-[0.85rem] max-sm:px-[16px] max-sm:py-[8px] max-sm:text-[0.8rem] ${activeTab === "all" ? "!bg-[linear-gradient(135deg,#ffd200,#fe0b00)] !text-white !border-none shadow-[0_4px_15px_rgba(254,11,0,0.3)]" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Resources
              </button>
              <button
                className={`py-[12px] px-[24px] bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-[0.9rem] whitespace-nowrap hover:bg-[rgba(255,0,0,0.1)] hover:-translate-y-[2px] max-lg:px-[20px] max-lg:py-[10px] max-lg:text-[0.85rem] max-sm:px-[16px] max-sm:py-[8px] max-sm:text-[0.8rem] ${activeTab === "academic" ? "!bg-[linear-gradient(135deg,#ffd200,#fe0b00)] !text-white !border-none shadow-[0_4px_15px_rgba(254,11,0,0.3)]" : ""}`}
                onClick={() => setActiveTab("academic")}
              >
                Academic
              </button>
              <button
                className={`py-[12px] px-[24px] bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-[0.9rem] whitespace-nowrap hover:bg-[rgba(255,0,0,0.1)] hover:-translate-y-[2px] max-lg:px-[20px] max-lg:py-[10px] max-lg:text-[0.85rem] max-sm:px-[16px] max-sm:py-[8px] max-sm:text-[0.8rem] ${activeTab === "career" ? "!bg-[linear-gradient(135deg,#ffd200,#fe0b00)] !text-white !border-none shadow-[0_4px_15px_rgba(254,11,0,0.3)]" : ""}`}
                onClick={() => setActiveTab("career")}
              >
                Career
              </button>
              <button
                className={`py-[12px] px-[24px] bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-[0.9rem] whitespace-nowrap hover:bg-[rgba(255,0,0,0.1)] hover:-translate-y-[2px] max-lg:px-[20px] max-lg:py-[10px] max-lg:text-[0.85rem] max-sm:px-[16px] max-sm:py-[8px] max-sm:text-[0.8rem] ${activeTab === "student" ? "!bg-[linear-gradient(135deg,#ffd200,#fe0b00)] !text-white !border-none shadow-[0_4px_15px_rgba(254,11,0,0.3)]" : ""}`}
                onClick={() => setActiveTab("student")}
              >
                Student
              </button>
              <button
                className={`py-[12px] px-[24px] bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-[25px] font-semibold cursor-pointer transition-all duration-300 text-[0.9rem] whitespace-nowrap hover:bg-[rgba(255,0,0,0.1)] hover:-translate-y-[2px] max-lg:px-[20px] max-lg:py-[10px] max-lg:text-[0.85rem] max-sm:px-[16px] max-sm:py-[8px] max-sm:text-[0.8rem] ${activeTab === "resources" ? "!bg-[linear-gradient(135deg,#ffd200,#fe0b00)] !text-white !border-none shadow-[0_4px_15px_rgba(254,11,0,0.3)]" : ""}`}
                onClick={() => setActiveTab("resources")}
              >
                Resources
              </button>
            </div>
          </div>
        </section>

        {/* Academic Sections Grid */}
        <section className="bg-[#f8f9fa] py-[80px]" id="sections">
          <div className="container">
            <div className="section-title">
              <h2>Academic Portal</h2>
              <p>
                Explore all academic resources and services available for DBGI
                students, faculty, and alumni community
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] mt-[40px] max-md:grid-cols-1">
              {filteredSections.map((section) => (
                <div className="bg-white rounded-[12px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col h-full border border-[rgba(0,0,0,0.08)] hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(254,11,0,0.15)] hover:border-[var(--color-primary)] max-md:p-[20px]" key={section.id}>
                  <div className="p-[25px_25px_15px] bg-[linear-gradient(135deg,rgba(255,210,0,0.1),rgba(254,11,0,0.1))] border-b border-[rgba(0,0,0,0.05)]">
                    <div className="text-[2.5rem] mb-[15px] max-sm:text-[2rem]">{section.icon}</div>
                    <h3 className="text-[1.4rem] text-[var(--color-primary)] m-0 max-sm:text-[1.2rem]">{section.title}</h3>
                  </div>
                  <div className="p-[20px_25px] flex-1">
                    <p className="text-[#666] leading-[1.6] m-0">{section.description}</p>
                  </div>
                  <div className="p-[20px_25px] border-t border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.01)]">
                    {section.external ? (
                      <Button
                        href={section.link}
                        className="w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Portal
                      </Button>
                    ) : (
                      <Button to={section.link} className="w-full">
                        Access Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white py-[80px]">
          <div className="container">
            <div className="section-title">
              <h2>Quick Access</h2>
              <p>Most frequently accessed academic resources</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] mt-[40px] max-md:grid-cols-1">
              <div className="bg-[linear-gradient(135deg,rgba(0,0,255,0.05),rgba(254,11,0,0.05))] rounded-[12px] p-[30px] text-center transition-all duration-300 border-2 border-transparent hover:-translate-y-[5px] hover:border-[var(--color-primary)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] max-md:p-[20px]">
                <div className="text-[2.5rem] mb-[20px]">📅</div>
                <h3 className="text-[1.3rem] text-[var(--color-primary)] mb-[10px]">Current Academic Calendar</h3>
                <p className="text-[#666] mb-[20px] text-[0.95rem]">Download the latest academic schedule</p>
                <Button to="/pages/academic-calendar" variant="outline" className="p-[8px_16px]">
                  View Calendar →
                </Button>
              </div>
              <div className="bg-[linear-gradient(135deg,rgba(0,0,255,0.05),rgba(254,11,0,0.05))] rounded-[12px] p-[30px] text-center transition-all duration-300 border-2 border-transparent hover:-translate-y-[5px] hover:border-[var(--color-primary)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] max-md:p-[20px]">
                <div className="text-[2.5rem] mb-[20px]">📚</div>
                <h3 className="text-[1.3rem] text-[var(--color-primary)] mb-[10px]">Course Syllabi</h3>
                <p className="text-[#666] mb-[20px] text-[0.95rem]">Access curriculum for all programs</p>
                <Button to="/pages/syllabus" variant="outline" className="p-[8px_16px]">
                  Browse Courses →
                </Button>
              </div>
              <div className="bg-[linear-gradient(135deg,rgba(0,0,255,0.05),rgba(254,11,0,0.05))] rounded-[12px] p-[30px] text-center transition-all duration-300 border-2 border-transparent hover:-translate-y-[5px] hover:border-[var(--color-primary)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] max-md:p-[20px]">
                <div className="text-[2.5rem] mb-[20px]">📊</div>
                <h3 className="text-[1.3rem] text-[var(--color-primary)] mb-[10px]">Exam Results</h3>
                <p className="text-[#666] mb-[20px] text-[0.95rem]">Check latest examination results</p>
                <Button to="/pages/results" variant="outline" className="p-[8px_16px]">
                  Check Results →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="bg-[#f8f9fa] py-[80px]">
          <div className="container">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] max-md:grid-cols-1">
              <div className="bg-white rounded-[12px] p-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] max-md:p-[20px] [&>ul]:list-none [&>ul]:p-0 [&>ul]:m-[0_0_25px_0] [&>ul>li]:py-[8px] [&>ul>li]:text-[#666] [&>ul>li]:relative [&>ul>li]:pl-[25px] [&>ul>li]:before:content-['✓'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-[var(--color-primary)] [&>ul>li]:before:font-bold">
                <h3 className="text-[1.4rem] text-[var(--color-primary)] mb-[20px] pb-[15px] border-b-2 border-[rgba(254,11,0,0.2)]">Academic Policies</h3>
                <ul>
                  <li>Examination Guidelines</li>
                  <li>Attendance Policy</li>
                  <li>Academic Integrity</li>
                  <li>Grade Appeals Process</li>
                  <li>Course Registration Rules</li>
                </ul>
                <Button to="/pages/policies" variant="outline">
                  View All Policies
                </Button>
              </div>
              <div className="bg-white rounded-[12px] p-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] max-md:p-[20px] [&>ul]:list-none [&>ul]:p-0 [&>ul]:m-[0_0_25px_0] [&>ul>li]:py-[8px] [&>ul>li]:text-[#666] [&>ul>li]:relative [&>ul>li]:pl-[25px] [&>ul>li]:before:content-['✓'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-[var(--color-primary)] [&>ul>li]:before:font-bold">
                <h3 className="text-[1.4rem] text-[var(--color-primary)] mb-[20px] pb-[15px] border-b-2 border-[rgba(254,11,0,0.2)]">Student Support</h3>
                <ul>
                  <li>Academic Counseling</li>
                  <li>Library Resources</li>
                  <li>Research Support</li>
                  <li>Technical Assistance</li>
                  <li>Career Guidance</li>
                </ul>
                <Button to="/pages/support" variant="outline">
                  Get Support
                </Button>
              </div>
              <div className="bg-white rounded-[12px] p-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] max-md:p-[20px] [&>ul]:list-none [&>ul]:p-0 [&>ul]:m-[0_0_25px_0] [&>ul>li]:py-[8px] [&>ul>li]:text-[#666] [&>ul>li]:relative [&>ul>li]:pl-[25px] [&>ul>li]:before:content-['✓'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-[var(--color-primary)] [&>ul>li]:before:font-bold">
                <h3 className="text-[1.4rem] text-[var(--color-primary)] mb-[20px] pb-[15px] border-b-2 border-[rgba(254,11,0,0.2)]">Important Dates</h3>
                <ul>
                  <li>Mid-Term Examinations: March 15-30</li>
                  <li>Project Submissions: April 10</li>
                  <li>Final Exams: May 20 - June 10</li>
                  <li>Result Declaration: June 25</li>
                  <li>Next Session Starts: July 15</li>
                </ul>
                <Button to="/pages/calendar" variant="outline">
                  Full Calendar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Facilities & Infrastructure */}
        <section className="bg-white py-[80px]">
          <div className="container">
            <div className="section-title">
              <h2>Academic Facilities</h2>
              <p>State-of-the-art infrastructure designed to foster innovation</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[30px] mt-[40px]">
              <div className="group relative overflow-hidden rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] h-[300px]">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))] z-[1]"></div>
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" alt="Central Library" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-full p-[30px] z-[2]">
                  <h3 className="text-white text-[1.5rem] mb-[10px] font-bold">Central Library</h3>
                  <p className="text-[#eee] text-[0.95rem] opacity-0 translate-y-[20px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    A vast collection of over 50,000+ books, journals, digital archives, and comfortable reading spaces open 24/7 during exams.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] h-[300px]">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))] z-[1]"></div>
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt="Research Labs" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-full p-[30px] z-[2]">
                  <h3 className="text-white text-[1.5rem] mb-[10px] font-bold">Advanced Laboratories</h3>
                  <p className="text-[#eee] text-[0.95rem] opacity-0 translate-y-[20px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Industry-sponsored labs for AI, Robotics, and Pharmacy equipped with cutting-edge tools for practical research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Support Section */}
        <section className="bg-[#f8f9fa] py-[80px]">
          <div className="container">
            <div className="bg-[linear-gradient(135deg,var(--color-primary),#b71c1c)] rounded-[20px] p-[50px] text-white flex justify-between items-center max-md:flex-col max-md:text-center max-md:gap-[30px] relative overflow-hidden shadow-[0_15px_30px_rgba(254,11,0,0.2)]">
              <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-[20px]"></div>
              <div className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#ffd200] opacity-20 rounded-full blur-[20px]"></div>
              
              <div className="max-w-[600px] relative z-[2]">
                <h2 className="text-[2.2rem] mb-[15px] font-bold">Need Academic Counseling?</h2>
                <p className="text-[1.1rem] opacity-90 leading-[1.6]">
                  Our dedicated student success team is here to help you with course selection, stress management, and career guidance. We ensure no student is left behind.
                </p>
              </div>
              <div className="relative z-[2]">
                <Button to="/pages/contact-us" className="!bg-white !text-[var(--color-primary)] hover:!bg-[#ffd200] hover:!text-black shadow-[0_5px_15px_rgba(0,0,0,0.2)] whitespace-nowrap">
                  Book an Appointment
                </Button>
              </div>
            </div>
          </div>
        </section>

        </div>
    </div>
  );
};

export default Academics;
