import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ContactCards from "../components/ContactCards";
import ApplyNow from "../components/ApplyNow";

const ContactUs = () => {
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
      <Hero heading="Contact Details" />
      <ContactCards />
      {/* Department Contacts */}
      <section className="bg-[#f8f9fa] py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Department Directory</h2>
            <p>Reach out to specific departments for quick assistance</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] mt-[40px]">
            {[
              { icon: "fa-user-graduate", name: "Admissions Office", email: "admissions@dbgisre.edu.in", phone: "+91 123-456-7891" },
              { icon: "fa-file-invoice-dollar", name: "Accounts & Fees", email: "accounts@dbgisre.edu.in", phone: "+91 123-456-7892" },
              { icon: "fa-building", name: "HR Department", email: "hr@dbgisre.edu.in", phone: "+91 123-456-7893" },
              { icon: "fa-book-reader", name: "Examination Cell", email: "exam@dbgisre.edu.in", phone: "+91 123-456-7894" },
              { icon: "fa-bed", name: "Hostel Administration", email: "hostel@dbgisre.edu.in", phone: "+91 123-456-7895" },
              { icon: "fa-briefcase", name: "Placement Cell", email: "placement@dbgisre.edu.in", phone: "+91 123-456-7896" }
            ].map((dept, index) => (
              <div key={index} className="bg-white p-[25px] rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.05)] border-t-[3px] border-[#ffd200] flex items-start gap-[20px] transition-transform hover:-translate-y-[5px]">
                <div className="w-[50px] h-[50px] bg-[#fffbf0] text-[#ff9800] rounded-full flex items-center justify-center text-[1.2rem] shrink-0">
                  <i className={`fas ${dept.icon}`}></i>
                </div>
                <div>
                  <h4 className="text-[1.1rem] text-[#333] font-bold mb-[8px]">{dept.name}</h4>
                  <p className="text-[#666] text-[0.95rem] mb-[5px] flex items-center gap-[8px]"><i className="fas fa-envelope text-[#ccc]"></i> {dept.email}</p>
                  <p className="text-[#666] text-[0.95rem] m-0 flex items-center gap-[8px]"><i className="fas fa-phone-alt text-[#ccc]"></i> {dept.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Campus Map */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <div className="section-title">
            <h2>Find Us on Google Maps</h2>
            <p>Visit our lush green campus situated in the heart of Saharanpur</p>
          </div>
          <div className="mt-[40px] rounded-[20px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.1)] h-[500px] border-[5px] border-[#eee]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.74797059714!2d77.47271447065997!3d29.967664426511226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ec163b785d0ab%3A0xe72fc00213d2f9cc!2sSaharanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714561234567!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="DBGI Campus Location"
            ></iframe>
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

export default ContactUs;
