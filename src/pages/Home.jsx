import React, { useState, useEffect, useRef } from "react";

import logo from "../assets/images/logo.png";
import campus1 from "../assets/images/campus_1.webp";
import Engineering from "../assets/courses_images/engineering.jpg";
import Business from "../assets/courses_images/business.png";
import Pharmacy from "../assets/courses_images/pharmacy.jpg";
import Hero from "../components/Hero";
import Notice from "../components/Notice";
import About from "../components/About";
import ApplyNow from "../components/ApplyNow";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import CampusLife from "./CampusLifeOverlay";
import axios from "axios";

const Home = () => {
  const [currentNoticeSlide, setCurrentNoticeSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [noticeSlides, setNoticeSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticesRes = await axios.get("/api/v1/notices");
        const testimonialsRes = await axios.get("/api/v1/testimonials");
        const mediaRes = await axios.get("/api/v1/media?category=home_featured");
        
        setNoticeSlides(noticesRes.data.data);
        setTestimonials(testimonialsRes.data.data);
        if (mediaRes.data.data && mediaRes.data.data.length > 0) {
          setFeaturedImage(mediaRes.data.data[0].url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const campusCards = [
    { id: "sports", title: "Sports" },
    { id: "alumni", title: "Alumni Meet" },
    { id: "fresher", title: "Fresher's Competition" },
    { id: "tvaran", title: "Annual Fest" },
    { id: "job", title: "Job Fair" },
    { id: "industry_visit", title: "Industrial Visit" },
    { id: "trip", title: "DBGI Family Visit" },
    { id: "girl_game", title: "Girls Competition" },
    { id: "play", title: "Nukkad Play" },
    { id: "star_night", title: "Star Night" },
    { id: "seminar", title: "Seminar Presentation" },
    { id: "farewell", title: "Seniors Farewell" },
    { id: "winners", title: "Winners" },
    { id: "guest_visit", title: "Guests Visit" },
    { id: "jagrukta", title: "Awareness Program" },
    { id: "supportive_faculty", title: "Supportive Faculty" },
    { id: "yoga", title: "Yoga Divas" },
    { id: "women_empower", title: "Women Empowerment" },
    { id: "lovely_faculty", title: "Lovely Faculty" },
    { id: "parents_felicitation", title: "Parents Felicitation Ceremony" },
    { id: "moot_court", title: "Moot Court Competition" },
  ];

  const statsData = [
    { id: "colleges-count", number: "4+", label: "Colleges", value: 4 },
    { id: "students-count", number: "8,453+", label: "Students", value: 8453 },
    { id: "companies-count", number: "132+", label: "Companies", value: 132 },
    { id: "placement-rate", number: "80%", label: "Placement Rate", value: 80 },
    { id: "package-amount", number: "37L", label: "Highest CTC", value: 37 },
  ];

  const statsSectionRef = useRef(null);
  const statsAnimated = useRef(false);

  // Auto slide for notice board
  useEffect(() => {
    if (noticeSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentNoticeSlide((prev) => (prev + 1) % noticeSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [noticeSlides]);

  // Auto slide for testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated.current) {
          animateStats();
          statsAnimated.current = true;
          observer.unobserve(entry.target);
        }
      });
    });

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (statsSectionRef.current) {
        observer.unobserve(statsSectionRef.current);
      }
    };
  }, []);

  const animateStats = () => {

    // Get all stat elements
    const statElements = document.querySelectorAll(".stat-number");

    if (statElements.length === 0) {
      console.log("No stat elements found");
      return;
    }


    // Get all final values
    const statsData = Array.from(statElements).map((stat) => {
      const finalValue = stat.getAttribute("data-final") || stat.textContent;

      const numericValue = parseFloat(finalValue.replace(/[+,%L]/g, ""));
      const hasPlus = finalValue.includes("+");
      const hasPercent = finalValue.includes("%");
      const hasL = finalValue.includes("L");

      return {
        element: stat,
        finalValue,
        numericValue,
        hasPlus,
        hasPercent,
        hasL,
        current: 0,
      };
    });

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const updateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      statsData.forEach((stat) => {
        if (stat.element) {
          const currentValue = stat.numericValue * progress;

          if (stat.hasPercent) {
            stat.element.textContent = Math.floor(currentValue) + "%";
          } else if (stat.hasL) {
            stat.element.textContent = Math.floor(currentValue) + "L";
          } else if (stat.hasPlus) {
            stat.element.textContent = Math.floor(currentValue) + "+";
          } else {
            stat.element.textContent =
              Math.floor(currentValue).toLocaleString();
          }
        }
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        // Set final values
        statsData.forEach((stat) => {
          if (stat.element) {
            stat.element.textContent = stat.finalValue;
          }
        });
      }
    };

    // Start animation
    requestAnimationFrame(updateCounters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      e.target.reset();
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

  // Main file starts now

  return (
    <div className="home-container">

      {/* Navigation bar */}
      {/* Hero Section */}  
      <Hero
        heading="Shape Your Future With Excellence"
        description="Join our vibrant community of learners and innovators at Dev Bhoomi Group of Institutions, where we nurture talent and foster success through world-class education."
        showButtons={true}
        primaryBtnText="Explore Programs"
        secondaryBtnText="Apply Now"
        onPrimaryClick={() => scrollToSection("programs")}
        secondaryBtnLink="/pages/admission"
        singleLineTitle={true}
      />

      {/* Featured Image Section */}
      {featuredImage && (
        <section className="pt-[40px] pb-[20px] bg-white flex justify-center w-full">
          <div className="container px-[15px] md:px-[20px]">
            <img 
              src={featuredImage} 
              alt="DBGI Featured Highlights" 
              className="w-full max-w-[1200px] mx-auto rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] object-cover" 
            />
          </div>
        </section>
      )}

      {/* About Section */}
      <About 
        titleHeading="About Dev Bhoomi Group of Institutions"
        
        titleDescription="Dev Bhoomi Group Of Institutions(DBGI) Saharanpur campus
          established in the year 2009 is a premier group of 
          institutions of Uttarakhand Uthan Samiti, a non-profit 
          Society, professionally managed by the Eminent Academicians, 
          Industrialists and Scientists."
        
        contentHeading="Our Legacy of Excellence"
        
        contentDescription="Keeping in tune with the upsurge in technical developments, the
          Samiti being committed to the cause of quality education and has
          established Six Temples of Learning and Innovations. DBGI is one
          of the best developing engineering colleges of Saharanpur
          district. The Campus is about 4 Km from Civil Hospital towards
          D.M. Residence at Beri Jama, Saharanpur. The nearest Airport is
          Jollygrant about 95 KMs from the Institute. The sprawling main
          campus is spread in one piece of land of 150 Bighas (22 acres),
          in the surroundings of greeneries, flora & fauna besides the
          National Forest."
        
        showButtons={true}
        btnText="Learn More"
      />

      {/* Stats Section */}
      <section className="py-[80px] px-[20px]" ref={statsSectionRef} id="stats">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[20px]">
          {statsData.map((stat, index) => (
            <div className="bg-white rounded-[12px] p-[30px_20px] text-center shadow-[0_0_10px_1px_rgba(197,48,48,0.43)] transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-br before:from-[#ffd200] before:to-[#fe0b00] hover:-translate-y-[10px] hover:shadow-[0_20px_25px_-5px_rgba(226,7,7,0.29)] scroll-animation" key={index}>
              <div
                className="text-[clamp(2rem,5vw,3rem)] font-bold text-[var(--color-primary)] mb-[10px] transition-all duration-300 stat-number"
                id={stat.id}
                data-final={stat.number}
              >
                {stat.number.includes("+")
                  ? "0+"
                  : stat.number.includes("%")
                  ? "0%"
                  : stat.number.includes("L")
                  ? "0L"
                  : "0"}
              </div>
              <div className="text-[clamp(0.9rem,2vw,1.1rem)] text-[var(--color-secondary)] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Notice Board Section */}
      {!loading && noticeSlides.length > 0 && (
        <Notice
          noticeSlides={noticeSlides}
          currentNoticeSlide={currentNoticeSlide}
          setCurrentNoticeSlide={setCurrentNoticeSlide}
        />
      )}

      {/* Programs Section */}
      <section className="bg-[#f8f9fa]" id="programs">
        <div className="container">
          <div className="section-title">
            <h2>Courses We Are Offering</h2>
            <p>
              We are Offering many Courses in The field of Engineering,
              Management, Computer Application, Pharmacy and Polytechnic
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
            {[
              {
                img: Engineering,
                alt: "Engineering",
                title: "Engineering & Technology",
                description:
                  "Cutting-edge programs in computer science, mechanical, electrical, and civil engineering with industry partnerships.",
              },
              {
                img: Business,
                alt: "Business",
                title: "Business & Management",
                description:
                  "Develop leadership skills and business acumen through our AACSB-accredited business programs.",
              },
              {
                img: Pharmacy,
                alt: "Health Sciences",
                title: "Pharmacy",
                description:
                  "Prepare for careers in medicine, nursing, pharmacy, and public health with our comprehensive health sciences programs.",
              },
            ].map((program, index) => (
              <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all duration-300 h-full hover:-translate-y-[10px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group scroll-animation" key={index}>
                <div className="h-[200px] overflow-hidden">
                  <img src={program.img} alt={program.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.1]" />
                </div>
                <div className="p-[25px] flex flex-col h-[calc(100%-200px)]">
                  <h3 className="text-[1.5rem] text-[var(--color-primary)] mb-[10px]">{program.title}</h3>
                  <p className="mb-[15px] text-[#666] flex-1">{program.description}</p>
                  <Button 
                    to="/pages/courses"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="bg-white" id="campus">
        <CampusLife previewCount={4} showViewMore={true} />
      </section>
      
      {/* Testimonials Section */}
      <section className="py-[30px] md:py-[80px] rounded-[2rem] bg-[linear-gradient(rgba(0,0,255,0.9),rgba(0,0,255,0.7))] text-white text-center mx-auto my-[2rem] md:my-[4rem] w-[90%] md:w-[75%] max-w-[900px] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)] scroll-animation" id="testimonials">
        <div className="container px-[15px] md:px-[20px]">
          <div className="text-center mb-[20px] md:mb-[50px] relative [&>h2]:text-white [&>p]:text-white [&::after]:bg-[var(--color-accent)] [&::after]:content-[''] [&::after]:block [&::after]:w-[80px] [&::after]:h-[4px] [&::after]:mx-auto [&::after]:mt-[10px] md:[&::after]:mt-[15px] [&::after]:rounded-[2px]">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] mb-[10px] md:mb-[15px]">What Our Students Say</h2>
            <p className="text-[clamp(0.85rem,2vw,1.1rem)] max-w-[800px] mx-auto leading-[1.6]">
              Hear from our students and alumni about their experiences at Dev
              Bhoomi Group of Institutions.
            </p>
          </div>
          <div className="max-w-[800px] mx-auto relative overflow-hidden min-h-[160px] md:min-h-[200px]">
            {!loading && testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-[10px] md:p-[20px] animate-[fade_1s_ease] ${
                  currentTestimonialSlide === index ? "block" : "hidden"
                }`}
              >
                <div className="text-[clamp(0.9rem,2vw,1.2rem)] italic mb-[15px] md:mb-[20px] leading-[1.6]">{testimonial.content}</div>
                <div className="font-semibold text-[1rem] md:text-[1.1rem] mb-[5px]">{testimonial.author}</div>
                <div className="text-[var(--color-accent)] text-[0.8rem] md:text-[0.9rem]">{testimonial.role}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-[30px] gap-[15px]">
            {!loading && testimonials.map((_, index) => (
              <span
                key={index}
                className={`w-[12px] h-[12px] rounded-full cursor-pointer transition-all duration-300 border-2 ${
                  currentTestimonialSlide === index ? "bg-white scale-[1.2] border-[var(--color-accent)]" : "bg-white/40 border-transparent hover:bg-white/70"
                }`}
                onClick={() => setCurrentTestimonialSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ApplyNow
        heading="Ready to Begin Your Journey?"
        description="Take the first step toward your future at Dev Bhoomi Group of
        Institutions. Applications for the next academic year are now open."
        btnText="Apply Now"
      />
      
      {/* Footer */}
      </div>
  );
};

export default Home;
