import {useState, useEffect} from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ApplyNow from "../components/ApplyNow";
import api from "../utils/api";

import LeaderCard from "../components/LeaderCard";
import chairman from "../assets/images/chairman.webp";
import managingDirector from "../assets/images/managing_director.webp";
import director from "../assets/images/director.webp";

const AboutUs = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");  
    const [headerScrolled, setHeaderScrolled] = useState(false);
    const [affiliations, setAffiliations] = useState([]);
  
  useEffect(() => {
      const handleScroll = () => {
        setHeaderScrolled(window.scrollY > 100);
      };
      window.addEventListener("scroll", handleScroll);

      // Fetch affiliations
      const fetchAffiliations = async () => {
        try {
          const res = await api.get('/affiliations');
          setAffiliations(res.data.data);
        } catch (error) {
          console.error("Failed to fetch affiliations", error);
        }
      };
      fetchAffiliations();

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
        heading="About Dev Bhoomi Group of Institutions"
        description="Discover our legacy of excellence in education, innovation, and community development"
        showButtons={false}
        singleLineTitle={true}
      />
      <About
        titleHeading="Our Story"
        titleDescription="Dev Bhoomi Group Of Institutions (DBGI) Saharanpur campus
            established in the year 2009 is a premier group of institutions of
            Uttarakhand Uthan Samiti, a non-profit Society, professionally
            managed by the Eminent Academicians, Industrialists and Scientists."
        contentHeading="Our Legacy of Excellence"
        contentDescription="Keeping in tune with the upsurge in technical developments, the
              Samiti being committed to the cause of quality education and has
              established Six Temples of Learning and Innovations. DBGI is one
              of the best developing engineering colleges of Saharanpur
              district.
              The Campus is about 4 Km from Civil Hospital towards D.M.
              Residence at Beri Jama, Saharanpur. The nearest Airport is
              Jollygrant about 95 KMs from the Institute. The sprawling mainP
              campus is spread in one piece of land of 150 Bighas (22 acres), in
              the surroundings of greeneries, flora & fauna besides the National
              Forest.
              We believe in education that goes beyond the classroom, preparing
              students to make meaningful contributions to society in their
              chosen fields."
        btnText="Explore Our Campus"
        btnRoute="/pages/about-us"
      />

      <section className="bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Our Leadership</h2>
            <p>
              Meet the visionary leaders who guide DBGI towards academic
              excellence
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px]">
            <LeaderCard
              leaderImg={chairman}
              leaderImgAlt="chairman"
              leaderName="Mr. Sanjay Bansal"
              leaderPosition="Chairman"
              leaderQuote="“Success is sweet but its secret is sweat”"
            />
            <LeaderCard
              leaderImg={managingDirector}
              leaderImgAlt="managing director"
              leaderName="Mr. Aman Bansal"
              leaderPosition="Managing Director"
              leaderQuote="“Every student could be transformed into a competent Professional”"
            />
            <LeaderCard
              leaderImg={director}
              leaderImgAlt="director"
              leaderName="Dr. Deepak Raj Thakur"
              leaderPosition="Director"
              leaderQuote="“Empowering progress with disciplined leadership and strategic direction”"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-[#f8f9fa] py-[80px]">
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[40px]">
            <div className="bg-white p-[40px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-t-[5px] border-[var(--color-primary)] transition-transform duration-300 hover:-translate-y-[10px]">
              <div className="text-[3rem] text-[var(--color-primary)] mb-[20px]"><i className="fas fa-eye"></i></div>
              <h3 className="text-[1.8rem] text-[var(--color-primary)] mb-[15px] font-bold">Our Vision</h3>
              <p className="text-[1.1rem] text-[#555] leading-[1.8]">
                To be a world-class center of academic excellence that fosters innovation, ethical values, and holistic development, preparing students to be global leaders who make a positive impact on society.
              </p>
            </div>
            <div className="bg-white p-[40px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-t-[5px] border-[#ffd200] transition-transform duration-300 hover:-translate-y-[10px]">
              <div className="text-[3rem] text-[#ffd200] mb-[20px]"><i className="fas fa-bullseye"></i></div>
              <h3 className="text-[1.8rem] text-[var(--color-primary)] mb-[15px] font-bold">Our Mission</h3>
              <p className="text-[1.1rem] text-[#555] leading-[1.8]">
                To provide quality education through practical learning, industry collaboration, and research. We strive to nurture talent, encourage critical thinking, and build a community where diverse minds can thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Accreditations & Recognitions</h2>
            <p>Our commitment to quality education is recognized by leading bodies</p>
          </div>
          <div className="flex flex-wrap justify-center gap-[30px] mt-[40px]">
            {affiliations.length > 0 ? (
              affiliations.map((item, index) => (
                <div key={index} className="bg-[#f8f9fa] border border-[#eee] p-[30px] rounded-[12px] text-center w-[250px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(254,11,0,0.15)] transition-all duration-300 hover:-translate-y-[5px]">
                  <div className="w-[80px] h-[80px] bg-[linear-gradient(135deg,rgba(255,210,0,0.1),rgba(254,11,0,0.1))] border border-[rgba(254,11,0,0.2)] text-[var(--color-primary)] rounded-full flex items-center justify-center text-[1.5rem] font-bold mx-auto mb-[20px]">
                    {item.title}
                  </div>
                  <h4 className="font-semibold text-[1.2rem] text-[#333] mb-[10px]">{item.title}</h4>
                  <p className="text-[#666] text-[0.95rem] leading-[1.5]">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full py-8">
                <i className="fas fa-circle-notch fa-spin text-2xl text-[var(--color-primary)]"></i>
              </div>
            )}
          </div>
        </div>
      </section>

      <ApplyNow
        heading="Ready to Join the DBGI Family?"
        description="Take the first step toward your future at Dev Bhoomi Group of
          Institutions. Applications for the next academic year are now open."
        showButtons={false}
        btnText="Apply Now"
      />
      </div>
  );
};

export default AboutUs;
