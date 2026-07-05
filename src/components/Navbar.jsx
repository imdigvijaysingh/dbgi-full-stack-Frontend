import React, { useRef, useEffect } from "react";

import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = ({
  headerScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  headerRef,
}) => {
  const newsHeadlines = [
    "Admissions Open 2026-27",
    "Enroll Now at DBGI Saharanpur",
    "Shaping Your Future",
    "Best Engineering and Management College",
  ];

  // Duplicate for seamless 50% loop
  const marqueeContent = [...newsHeadlines, ...newsHeadlines];

  const navRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        mobileMenuBtnRef.current &&
        !navRef.current.contains(event.target) &&
        !mobileMenuBtnRef.current.contains(event.target) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle anchor click for smooth scrolling
  const handleAnchorClick = (e, href, isInternalLink = false) => {
    if (href.startsWith("#") && isInternalLink) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        // Close mobile menu if open
        setMobileMenuOpen(false);

        // Calculate header height offset
        const headerHeight = headerRef?.current?.offsetHeight || 0;
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

  return (
    <div>
      {/* Top Bar Section */}
      <div className="bg-orange-500 text-white flex items-center justify-between fixed top-0 max-w-8xl w-full z-[1001] h-9">
        <div className="flex-1 overflow-hidden whitespace-nowrap py-1.5 flex">
          <div className="inline-flex animate-[marquee_20s_linear_infinite] text-sm font-medium tracking-wide">
            {marqueeContent.map((headline, index) => (
              <span key={index} className="mx-5 flex items-center">
                {headline}
                <span className="inline-block w-1.5 h-1.5 bg-yellow-200 rounded-full ml-10 opacity-70"></span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center px-5 bg-transparent z-10 text-sm">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=dbgi@dbgisre.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Us"
            className="flex items-center gap-1.5 text-white no-underline transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <i className="fas fa-envelope"></i>
            <span className="hidden sm:inline">dbgi@dbgisre.edu.in</span>
          </a>
          <div className="w-px h-4 bg-white/30 mx-4"></div>
          <a
            href="https://www.instagram.com/dbgi.saharanpur/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="flex items-center gap-1.5 text-white no-underline transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <i className="fab fa-instagram"></i>
            <span className="hidden sm:inline">@dbgi.saharanpur</span>
          </a>
        </div>
      </div>
      <header
        className={`fixed w-full top-9 z-[1000] shadow-sm transition-all duration-300 ${headerScrolled ? "bg-[linear-gradient(135deg,rgba(255,210,0,0.65),rgba(254,11,0,0.35))] backdrop-blur-[2px] py-2" : "bg-gradient-to-br from-[#ffd200] to-[#fe0b00] py-3"}`}
        ref={headerRef}
      >
        <div className="flex items-center flex-wrap gap-y-2.5 justify-between w-full px-5 relative max-w-8xl mx-auto xl:px-4 max-md:px-2.5">
          {/* Left: Logo */}
          <div className="flex items-center flex-1 justify-start min-w-[150px]">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center text-white no-underline whitespace-nowrap md:text-xl"
              onClick={(e) => {
                // Only handle smooth scroll if we're already on home page
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  handleAnchorClick(e, "#home", true);
                }
              }}
            >
              <img
                src={logo}
                alt="DBGI Logo"
                className="h-10 w-10 mr-2.5 object-contain md:h-8 md:w-8 lg:h-14 lg:w-14"
              />
              <span>DBGI</span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div
            className={`flex items-center justify-center shrink-0 max-lg:order-last max-lg:w-full ${!mobileMenuOpen ? 'max-lg:hidden' : ''}`}
            ref={navRef}
          >

            {/* Navigation */}
            <nav
              className={`flex justify-center ${mobileMenuOpen ? "flex-1 max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:bg-gradient-to-br max-lg:from-[#ffd200] max-lg:to-[#fe0b00] max-lg:p-4 max-lg:shadow-lg" : "max-lg:hidden"}`}
            >
              <ul className="flex m-0 p-0 gap-2 items-center flex-wrap justify-center max-lg:flex-col max-lg:items-start max-lg:gap-0 max-lg:w-full max-md:flex-col max-md:gap-0">
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={(e) => {
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        scrollToSection("home");
                      }
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/about-us"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/admission"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Admissions
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/courses"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Courses
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/academics"
                    rel="noopener noreferrer"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Academics
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/placements"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Placements
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/campus-life"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Campus Life
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/contact-us"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="m-0 max-lg:w-full max-lg:border-b max-lg:border-white/20 max-lg:last:border-none">
                  <Link
                    to="/pages/career"
                    className="text-white no-underline font-semibold transition-all duration-300 px-2.5 py-1.5 whitespace-nowrap text-sm rounded relative hover:text-blue-600 hover:bg-white/10 max-xl:text-xs max-xl:px-2 max-lg:block max-lg:w-full max-lg:py-3 max-lg:px-4 max-lg:text-base max-md:py-4 max-md:px-5 max-md:text-lg"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    Career @DBGI
                  </Link>
                </li>
                {/* Mobile ERP Button */}
                <li className="m-0 lg:hidden max-lg:mt-4 max-lg:w-full max-lg:border-none">
                  <Link
                    to="/erp/login"
                    className="flex items-center gap-2 bg-blue-600 text-white no-underline font-bold transition-all duration-300 px-4 py-2 whitespace-nowrap text-sm rounded-lg hover:bg-blue-700 shadow-md max-xl:text-xs max-xl:px-3 max-lg:justify-center max-lg:w-full max-lg:py-3 max-lg:text-base max-md:py-4 max-md:text-lg border-2 border-blue-500"
                    onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user-graduate"></i> Student ERP
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right: ERP Button & Mobile Menu Toggle */}
          <div className="flex items-center justify-end flex-1 min-w-[150px] gap-2 md:gap-5">
            <Link
              to="/erp/login"
              className="max-lg:hidden flex items-center gap-2 bg-blue-600 text-white no-underline font-bold transition-all duration-300 px-4 py-2 whitespace-nowrap text-sm rounded-lg hover:bg-blue-700 shadow-md border-2 border-blue-500"
            >
              <i className="fas fa-user-graduate"></i> Student ERP
            </Link>

            <button
              ref={mobileMenuBtnRef}
              className="hidden max-lg:block text-2xl cursor-pointer text-white bg-transparent border-none p-1 ml-2 md:ml-2.5 shrink-0"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
