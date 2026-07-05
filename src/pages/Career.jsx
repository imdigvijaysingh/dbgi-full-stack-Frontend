import React, { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import IMG from "../assets/career/1.JPG";

const Career = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmittingCareerForm, setIsSubmittingCareerForm] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    positionCategory: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const navLinksRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const careerFormRef = useRef(null);
  const headerRef = useRef(null);
  const printBtnRef = useRef(null);

  // Mobile Menu Toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Search Form Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
      setSearchTerm("");
    }
  };

  // Career Form Submission
  const handleCareerFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingCareerForm(true);

    // Simulate API call/email submission
    setTimeout(() => {
      alert(
        `Thank you ${formData.name}! Your inquiry has been submitted successfully. Our HR team will contact you at ${formData.email} within 48 hours. For immediate consideration, please send your CV to job@dbgisre.edu.in`,
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        positionCategory: "",
        message: "",
      });
      setSelectedPosition("");

      setIsSubmittingCareerForm(false);
    }, 2000);
  };

  // Position Card Click Effect
  const handlePositionCardClick = (positionTitle, isSpecial = false) => {
    // Scroll to form
    const applySection = document.querySelector("#apply");
    if (applySection) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const targetPosition =
        applySection.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Auto-fill position in form
    const positionText = isSpecial
      ? `Interested in: ${positionTitle}`
      : `Interested in: ${positionTitle} position`;
    setFormData((prev) => ({
      ...prev,
      message: prev.message
        ? `${prev.message}\n\n${positionText}`
        : positionText,
    }));
  };

  // Copy Email Address
  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("job@dbgisre.edu.in");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  // Smooth scroll for anchor links
  const handleAnchorClick = (e, href) => {
    if (href === "#") return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();

      // Close mobile menu if open
      setMobileMenuOpen(false);

      // Calculate header height offset
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Feature toggle for position cards
  useEffect(() => {
    let interval;

    const featureToggle = () => {
      let isFeatured = true;

      interval = setInterval(() => {
        const featuredCards = document.querySelectorAll(
          ".position-card.featured",
        );
        featuredCards.forEach((card) => {
          if (isFeatured) {
            card.style.boxShadow = "0 0 20px rgba(255, 210, 0, 0.5)";
          } else {
            card.style.boxShadow = "";
          }
        });
        isFeatured = !isFeatured;
      }, 5000);
    };

    const timer = setTimeout(featureToggle, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Add page load animation
  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.add("loaded");

      const heroContent = document.querySelector(".career-hero-content");
      if (heroContent) {
        heroContent.style.animation = "fadeIn 1s ease-out";
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Add CSS animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .print-btn {
                background: linear-gradient(135deg, #ffd200, #fe0b00) !important;
                padding: 12px 24px !important;
                border-radius: 25px !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
                color: white !important;
                border: none !important;
                cursor: pointer !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                transition: all 0.3s ease !important;
            }
            
            .print-btn:hover {
                transform: translateY(-3px) !important;
                box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
            }
            
            @media print {
                header, .btn, .mobile-menu, .search-container, .print-btn, nav, .navbar, .hero {
                    display: none !important;
                }
                
                body {
                    padding-top: 0 !important;
                    margin: 0 !important;
                }
                
                .position-card, .admin-card {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                section {
                    page-break-before: auto;
                }
            }
        `;
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  // Add smooth scroll to all anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href === "#") return;

        // Handle external links
        if (anchor.getAttribute("target") === "_blank") return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();

          // Close mobile menu if open
          setMobileMenuOpen(false);

          // Calculate header height offset
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);

  return (
    <div>
      <Hero
        heading="Career @DBGI"
        description="Shape futures while building your own legacy. Join one of the fastest-growing engineering and management institutes in western U.P."
      />
      <section className="bg-[#f8f9fa] py-[80px]" id="positions">
        <div className="container">
          <div className="section-title">
            <h2>Available Positions</h2>
            <p>Join our team of exceptional educators and administrators</p>
          </div>

          <div className="mb-[60px]">
            <h3 className="text-[var(--color-primary)] text-[1.8rem] mb-[30px] flex items-center gap-[10px] border-b-[3px] border-[var(--color-secondary)] pb-[10px]">
              <i className="fas fa-chalkboard-teacher"></i> Faculty Positions
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[30px]">
              <div
                className="position-card bg-white rounded-[15px] p-[30px] shadow-[0_5px_20px_rgba(255,0,0,0.1)] transition-all duration-300 border-t-[4px] border-[var(--color-primary)] relative hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.15)] featured"
                onClick={() => handlePositionCardClick("HOD/Professor")}
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-[2px] border-[#f0f0f0]">
                  <h4 className="text-[var(--color-primary)] text-[1.5rem] font-bold">
                    HOD/Professor
                  </h4>
                  <span className="p-[5px_15px] rounded-[20px] text-[0.8rem] font-semibold uppercase bg-[#ffebee] text-[#d32f2f]">
                    Urgent Hiring
                  </span>
                </div>
                <div className="position-departments">
                  <h5 className="text-[#555] mb-[15px] text-[1.1rem]">
                    Departments:
                  </h5>
                  <ul className="list-none pl-0">
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Tech &
                      Polytechnic (Civil/EEE/ME/ECE/CS/IT)
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> MBA, MCA
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> BBA, BCA, B.Com
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Pharm, D.Pharm
                    </li>
                  </ul>
                </div>
                <div className="mt-[20px] pt-[15px] border-t border-[#eee]">
                  <span className="inline-flex items-center gap-[8px] text-[var(--color-primary)] font-semibold text-[0.95rem]">
                    <i className="fas fa-user-graduate"></i> PhD/M.Tech Required
                  </span>
                </div>
              </div>

              <div
                className="position-card bg-white rounded-[15px] p-[30px] shadow-[0_5px_20px_rgba(255,0,0,0.1)] transition-all duration-300 border-t-[4px] border-[var(--color-primary)] relative hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.15)]"
                onClick={() => handlePositionCardClick("Associate Professor")}
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-[2px] border-[#f0f0f0]">
                  <h4 className="text-[var(--color-primary)] text-[1.5rem] font-bold">
                    Associate Professor
                  </h4>
                  <span className="p-[5px_15px] rounded-[20px] text-[0.8rem] font-semibold uppercase bg-[#e3f2fd] text-[#1976d2]">
                    Multiple Positions
                  </span>
                </div>
                <div className="position-departments">
                  <h5 className="text-[#555] mb-[15px] text-[1.1rem]">
                    Departments:
                  </h5>
                  <ul className="list-none pl-0">
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Tech
                      (Civil/EEE/ME/ECE/CS/IT)
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> MBA, MCA
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> BBA, BCA, B.Com
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Pharm, D.Pharm
                    </li>
                  </ul>
                </div>
                <div className="mt-[20px] pt-[15px] border-t border-[#eee]">
                  <span className="inline-flex items-center gap-[8px] text-[var(--color-primary)] font-semibold text-[0.95rem]">
                    <i className="fas fa-user-graduate"></i> PhD/M.Tech Required
                  </span>
                </div>
              </div>

              <div
                className="position-card bg-white rounded-[15px] p-[30px] shadow-[0_5px_20px_rgba(255,0,0,0.1)] transition-all duration-300 border-t-[4px] border-[var(--color-primary)] relative hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.15)]"
                onClick={() => handlePositionCardClick("Assistant Professor")}
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-[2px] border-[#f0f0f0]">
                  <h4 className="text-[var(--color-primary)] text-[1.5rem] font-bold">
                    Assistant Professor
                  </h4>
                  <span className="p-[5px_15px] rounded-[20px] text-[0.8rem] font-semibold uppercase bg-[#e3f2fd] text-[#1976d2]">
                    Multiple Positions
                  </span>
                </div>
                <div className="position-departments">
                  <h5 className="text-[#555] mb-[15px] text-[1.1rem]">
                    Departments:
                  </h5>
                  <ul className="list-none pl-0">
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Tech
                      (Civil/EEE/ME/ECE/CS/IT)
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> MBA, MCA
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> BBA, BCA, B.Com
                    </li>
                    <li className="py-[8px] border-b border-dashed border-[#eee] text-[#666] flex items-center gap-[10px] last:border-b-0">
                      <i className="fas fa-graduation-cap"></i> B.Pharm, D.Pharm
                    </li>
                  </ul>
                </div>
                <div className="mt-[20px] pt-[15px] border-t border-[#eee]">
                  <span className="inline-flex items-center gap-[8px] text-[var(--color-primary)] font-semibold text-[0.95rem]">
                    <i className="fas fa-user-graduate"></i> M.Tech/MBA/MCA
                    Required
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-[60px]">
            <h3 className="text-[var(--color-primary)] text-[1.8rem] mb-[30px] flex items-center gap-[10px] border-b-[3px] border-[var(--color-secondary)] pb-[10px]">
              <i className="fas fa-star"></i> Special Positions
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
              <div
                className="position-card bg-white rounded-[15px] p-[30px] shadow-[0_5px_20px_rgba(255,0,0,0.1)] transition-all duration-300 border-t-[4px] border-[var(--color-primary)] relative hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.15)]"
                onClick={() =>
                  handlePositionCardClick("Applied Science Faculty", true)
                }
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-[2px] border-[#f0f0f0]">
                  <h4 className="text-[var(--color-primary)] text-[1.5rem] font-bold">
                    Applied Science Faculty
                  </h4>
                  <span className="p-[5px_15px] rounded-[20px] text-[0.8rem] font-semibold uppercase bg-[#e8f5e9] text-[#388e3c]">
                    Academic
                  </span>
                </div>
                <div className="mt-[15px]">
                  <p className="mb-[10px] text-[#555] leading-[1.6]">
                    <strong>Subjects:</strong> Physics/Maths/Chemistry/English
                  </p>
                  <p className="mb-[10px] text-[#555] leading-[1.6]">
                    <strong>Requirement:</strong> Ph.D. in relevant field
                  </p>
                  <p className="mb-[10px] text-[#555] leading-[1.6]">
                    <strong>Positions:</strong> Professor/Assoc.Prof./Asst.Prof.
                  </p>
                </div>
              </div>

              <div
                className="position-card bg-white rounded-[15px] p-[30px] shadow-[0_5px_20px_rgba(255,0,0,0.1)] transition-all duration-300 border-t-[4px] border-[var(--color-primary)] relative hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.15)]"
                onClick={() =>
                  handlePositionCardClick(
                    "Principal for Polytechnic Institute",
                    true,
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between items-center mb-[20px] pb-[15px] border-b-[2px] border-[#f0f0f0]">
                  <h4 className="text-[var(--color-primary)] text-[1.5rem] font-bold">
                    Principal for Polytechnic Institute
                  </h4>
                  <span className="p-[5px_15px] rounded-[20px] text-[0.8rem] font-semibold uppercase bg-[#f3e5f5] text-[#7b1fa2]">
                    Leadership
                  </span>
                </div>
                <div className="mt-[15px]">
                  <p className="mb-[10px] text-[#555] leading-[1.6]">
                    <strong>Qualification:</strong> B.Tech with M.Tech Degree
                  </p>
                  <p className="mb-[10px] text-[#555] leading-[1.6]">
                    <strong>Experience:</strong> Relevant experience required
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-[60px]">
            <h3 className="text-[var(--color-primary)] text-[1.8rem] mb-[30px] flex items-center gap-[10px] border-b-[3px] border-[var(--color-secondary)] pb-[10px]">
              <i className="fas fa-users-cog"></i> Administrative Positions
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[25px]">
              <div
                className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(255,0,0,0.05)] transition-all duration-300 border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(255,0,0,0.1)]"
                onClick={() => handlePositionCardClick("Registrar")}
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-[var(--color-primary)] mb-[10px] text-[1.3rem]">
                  Registrar
                </h4>
                <p className="text-[#666] text-[1rem] leading-[1.6]">
                  Post Graduate with minimum 6 years of relevant experience
                </p>
              </div>
              <div
                className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(255,0,0,0.05)] transition-all duration-300 border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(255,0,0,0.1)]"
                onClick={() => handlePositionCardClick("Sub Registrar")}
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-[var(--color-primary)] mb-[10px] text-[1.3rem]">
                  Sub Registrar
                </h4>
                <p className="text-[#666] text-[1rem] leading-[1.6]">
                  Post Graduate with minimum 3 years of experience
                </p>
              </div>
              <div
                className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(255,0,0,0.05)] transition-all duration-300 border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(255,0,0,0.1)]"
                onClick={() => handlePositionCardClick("Examination Head")}
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-[var(--color-primary)] mb-[10px] text-[1.3rem]">
                  Examination Head
                </h4>
                <p className="text-[#666] text-[1rem] leading-[1.6]">
                  A Professor with relevant experience of 10 years
                </p>
              </div>
              <div
                className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(255,0,0,0.05)] transition-all duration-300 border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(255,0,0,0.1)]"
                onClick={() => handlePositionCardClick("Admin Officer")}
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-[var(--color-primary)] mb-[10px] text-[1.3rem]">
                  Admin Officer
                </h4>
                <p className="text-[#666] text-[1rem] leading-[1.6]">
                  A well-spoken graduate with basic knowledge of computer (MBA
                  preferred)
                </p>
              </div>
              <div
                className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(255,0,0,0.05)] transition-all duration-300 border-l-[4px] border-[var(--color-primary)] hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(255,0,0,0.1)]"
                onClick={() =>
                  handlePositionCardClick("Mechanical Transport Officer")
                }
                style={{ cursor: "pointer" }}
              >
                <h4 className="text-[var(--color-primary)] mb-[10px] text-[1.3rem]">
                  Mechanical Transport Officer
                </h4>
                <p className="text-[#666] text-[1rem] leading-[1.6]">
                  Well experienced (Man with Army background preferred)
                </p>
              </div>
            </div>
          </div>

          <div className="mb-[60px]">
            <h3 className="text-[var(--color-primary)] text-[1.8rem] mb-[30px] flex items-center gap-[10px] border-b-[3px] border-[var(--color-secondary)] pb-[10px]">
              <i className="fas fa-tools"></i> Technical / Support Staff
            </h3>
            <div className="flex flex-wrap gap-[15px] bg-white p-[30px] rounded-[10px] shadow-[0_3px_15px_rgba(0,0,0,0.05)]">
              {[
                "Lab Technicians",
                "Hostel Warden",
                "Clerks/Office Assistants",
                "Front Desk Executive/Receptionist (Female)",
                "System Administrator",
                "Networking Engineers",
                "Computer Lab Technicians",
                "Peons",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#f0f4ff] text-[var(--color-primary)] p-[12px_25px] rounded-[25px] text-[0.95rem] font-medium border-[2px] border-[#e0e7ff] transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-[2px]"
                  onClick={() => handlePositionCardClick(tag)}
                  style={{ cursor: "pointer" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Core Values Section */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p>What we look for in our faculty and staff</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px] mt-[40px]">
            <div className="text-center p-[30px] rounded-[15px] border border-[#eee] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]">
              <div className="w-[80px] h-[80px] bg-[#f0f4ff] text-[#2196f3] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px]">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[10px] font-bold">
                Innovation
              </h4>
              <p className="text-[#666] leading-[1.6]">
                We value creative teaching methods and innovative approaches to
                problem-solving.
              </p>
            </div>
            <div className="text-center p-[30px] rounded-[15px] border border-[#eee] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]">
              <div className="w-[80px] h-[80px] bg-[#fff0f0] text-[#f44336] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px]">
                <i className="fas fa-heart"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[10px] font-bold">
                Dedication
              </h4>
              <p className="text-[#666] leading-[1.6]">
                A genuine passion for education and mentoring students to
                achieve their full potential.
              </p>
            </div>
            <div className="text-center p-[30px] rounded-[15px] border border-[#eee] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]">
              <div className="w-[80px] h-[80px] bg-[#f0fff4] text-[#4caf50] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px]">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[10px] font-bold">
                Integrity
              </h4>
              <p className="text-[#666] leading-[1.6]">
                Upholding the highest standards of professional ethics and
                intellectual honesty.
              </p>
            </div>
            <div className="text-center p-[30px] rounded-[15px] border border-[#eee] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px]">
              <div className="w-[80px] h-[80px] bg-[#fffbf0] text-[#ff9800] rounded-full flex items-center justify-center text-[2rem] mx-auto mb-[20px]">
                <i className="fas fa-users"></i>
              </div>
              <h4 className="text-[1.3rem] text-[#333] mb-[10px] font-bold">
                Collaboration
              </h4>
              <p className="text-[#666] leading-[1.6]">
                Working together as a cohesive team to achieve our institutional
                goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Life at DBGI (Work Culture) */}
      <section className="bg-[linear-gradient(135deg,#f8f9fa_0%,#e9ecef_100%)] py-[80px]">
        <div className="container">
          <div className="flex max-lg:flex-col items-center gap-[50px]">
            <div className="flex-1">
              <h2 className="text-[2.2rem] text-[var(--color-primary)] mb-[20px] font-bold">
                Life at DBGI
              </h2>
              <p className="text-[#555] text-[1.1rem] leading-[1.8] mb-[20px]">
                We believe that a happy and motivated faculty translates into
                successful students. At DBGI, we foster a supportive work
                environment that encourages continuous learning, research, and
                professional development.
              </p>
              <ul className="list-none pl-0 [&>li]:py-[8px] [&>li]:flex [&>li]:items-center [&>li]:gap-[15px] [&>li]:text-[#555] [&>li]:text-[1.05rem]">
                <li>
                  <i className="fas fa-check-circle text-[var(--color-primary)]"></i>{" "}
                  Faculty Development Programs (FDPs)
                </li>
                <li>
                  <i className="fas fa-check-circle text-[var(--color-primary)]"></i>{" "}
                  Funding for Research and Publications
                </li>
                <li>
                  <i className="fas fa-check-circle text-[var(--color-primary)]"></i>{" "}
                  Vibrant Campus Life and Cultural Events
                </li>
                <li>
                  <i className="fas fa-check-circle text-[var(--color-primary)]"></i>{" "}
                  Recreational Facilities and Sports Infrastructure
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-[-20px] right-[-20px] w-full h-full border-[5px] border-[#ffd200] rounded-[20px] z-[1]"></div>
              <img
                src={IMG}
                alt="Work Culture at DBGI"
                className="w-full rounded-[20px] relative z-[2] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Benefits & Perks</h2>
            <p>Why join DBGI? Here's what we offer our team members</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] max-w-[1200px] mx-auto">
            <div className="text-center p-[40px_25px] rounded-[15px] bg-[#f8f9fa] transition-all duration-300 border-[2px] border-transparent hover:bg-white hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.1)] hover:border-[var(--color-primary)]">
              <i className="fas fa-money-bill-wave text-[3rem] text-[var(--color-primary)] mb-[1.5rem]"></i>
              <h4 className="text-[var(--color-primary)] mb-[1rem] text-[1.4rem]">
                Competitive Salary
              </h4>
              <p className="text-[#666] text-[1rem] leading-[1.7]">
                As Per the Latest AICTE norms and scales. Salary shall not be a
                constraint for deserving candidates.
              </p>
            </div>
            <div className="text-center p-[40px_25px] rounded-[15px] bg-[#f8f9fa] transition-all duration-300 border-[2px] border-transparent hover:bg-white hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.1)] hover:border-[var(--color-primary)]">
              <i className="fas fa-home text-[3rem] text-[var(--color-primary)] mb-[1.5rem]"></i>
              <h4 className="text-[var(--color-primary)] mb-[1rem] text-[1.4rem]">
                Campus Residence
              </h4>
              <p className="text-[#666] text-[1rem] leading-[1.7]">
                Campus residence facility is available for candidates from other
                states (limited).
              </p>
            </div>
            <div className="text-center p-[40px_25px] rounded-[15px] bg-[#f8f9fa] transition-all duration-300 border-[2px] border-transparent hover:bg-white hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.1)] hover:border-[var(--color-primary)]">
              <i className="fas fa-industry text-[3rem] text-[var(--color-primary)] mb-[1.5rem]"></i>
              <h4 className="text-[var(--color-primary)] mb-[1rem] text-[1.4rem]">
                Industry Welcome
              </h4>
              <p className="text-[#666] text-[1rem] leading-[1.7]">
                Industry personnel meeting AICTE norms are also welcome to
                apply.
              </p>
            </div>
            <div className="text-center p-[40px_25px] rounded-[15px] bg-[#f8f9fa] transition-all duration-300 border-[2px] border-transparent hover:bg-white hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(255,0,0,0.1)] hover:border-[var(--color-primary)]">
              <i className="fas fa-chart-line text-[3rem] text-[var(--color-primary)] mb-[1.5rem]"></i>
              <h4 className="text-[var(--color-primary)] mb-[1rem] text-[1.4rem]">
                Career Growth
              </h4>
              <p className="text-[#666] text-[1rem] leading-[1.7]">
                Opportunities for vertical growth and professional development.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-[80px] bg-[linear-gradient(135deg,#f8f9fa_0%,#e9ecef_100%)]"
        id="apply"
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-[50px] bg-white p-[50px] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] lg:grid-cols-2">
            <div>
              <h2 className="text-[var(--color-primary)] mb-[2rem] flex items-center gap-[10px] text-[2.2rem]">
                <i className="fas fa-file-upload"></i> How to Apply
              </h2>
              <div className="flex flex-col gap-[30px]">
                <div className="flex gap-[20px] items-start">
                  <div className="bg-[linear-gradient(135deg,#ffd200_0%,#fe0b00_100%)] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.5rem] font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-[var(--color-primary)] mb-[0.5rem] text-[1.3rem]">
                      Prepare Your Documents
                    </h4>
                    <p className="text-[#666] leading-[1.7]">
                      Individuals with relevant qualification and experience may
                      contact in person, otherwise forward / email / post your
                      CV, credentials with latest passport size photograph.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px] items-start">
                  <div className="bg-[linear-gradient(135deg,#ffd200_0%,#fe0b00_100%)] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.5rem] font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-[var(--color-primary)] mb-[0.5rem] text-[1.3rem]">
                      Contact Information
                    </h4>
                    <p className="text-[#666] leading-[1.7]">
                      All related correspondence must be done with{" "}
                      <strong
                        className="bg-[#f0f4ff] p-[15px] rounded-[8px] my-[20px] font-semibold text-[var(--color-dark)] flex items-center gap-[10px] hover:text-black cursor-pointer text-[#fe0b00] underline"
                        onClick={copyEmailToClipboard}
                      >
                        {copiedEmail ? (
                          <>
                            <i className="fas fa-check"></i> Email copied!
                          </>
                        ) : (
                          "job@dbgisre.edu.in"
                        )}
                      </strong>{" "}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[20px] items-start">
                  <div className="bg-[linear-gradient(135deg,#ffd200_0%,#fe0b00_100%)] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.5rem] font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-[var(--color-primary)] mb-[0.5rem] text-[1.3rem]">
                      Apply Now
                    </h4>
                    <p className="text-[#666] leading-[1.7]">
                      Submit your application for immediate consideration. We
                      review applications on a rolling basis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fa] p-[40px] rounded-[15px]">
              <h3 className="text-[var(--color-primary)] mb-[2rem] text-center text-[1.8rem]">
                Quick Application Inquiry
              </h3>
              <form
                id="careerForm"
                onSubmit={handleCareerFormSubmit}
                ref={careerFormRef}
              >
                <div className="mb-[1.5rem]">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-[15px] border-[2px] border-[#e0e0e0] rounded-[10px] text-[1rem] transition-all duration-300 bg-white focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,0,0,0.1)]"
                  />
                </div>
                <div className="mb-[1.5rem]">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-[15px] border-[2px] border-[#e0e0e0] rounded-[10px] text-[1rem] transition-all duration-300 bg-white focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,0,0,0.1)]"
                  />
                </div>
                <div className="mb-[1.5rem]">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-[15px] border-[2px] border-[#e0e0e0] rounded-[10px] text-[1rem] transition-all duration-300 bg-white focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,0,0,0.1)]"
                  />
                </div>
                <div className="mb-[1.5rem]">
                  <select
                    required
                    value={formData.positionCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        positionCategory: e.target.value,
                      })
                    }
                    className="w-full p-[15px] border-[2px] border-[#e0e0e0] rounded-[10px] text-[1rem] transition-all duration-300 bg-white focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,0,0,0.1)]"
                  >
                    <option value="">Select Position Category</option>
                    <option value="faculty">Faculty Positions</option>
                    <option value="admin">Administrative Positions</option>
                    <option value="support">Support Staff</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-[1.5rem]">
                  <textarea
                    placeholder="Brief about your qualifications and experience"
                    rows="3"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full p-[15px] border-[2px] border-[#e0e0e0] rounded-[10px] text-[1rem] transition-all duration-300 bg-white focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,0,0,0.1)]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full p-[15px] bg-[linear-gradient(135deg,#ffd200_0%,#fe0b00_100%)] text-white border-none rounded-[10px] text-[1.1rem] font-semibold cursor-pointer flex items-center justify-center gap-[10px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(255,0,0,0.3)]"
                  disabled={isSubmittingCareerForm}
                >
                  {isSubmittingCareerForm ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Submit Inquiry
                    </>
                  )}
                </button>
                <p className="text-center mt-[1rem] text-[#666] text-[0.9rem]">
                  We'll contact you within 48 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
