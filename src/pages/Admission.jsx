import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import ApplyNow from "../components/ApplyNow";

const Admission = () => {
  const feeData = [
    { id: 1, program: "B. Tech", fee: "₹ 55,000/-" },
    { id: 2, program: "B. Pharma", fee: "₹ 63,300/-" },
    { id: 3, program: "MBA", fee: "₹ 59,700/-" },
    { id: 4, program: "MCA", fee: "₹ 55,000/-" },
    { id: 5, program: "Polytechnic", fee: "₹ 30,150/-" },
    { id: 6, program: "D. Pharma", fee: "₹ 45,000/-" },
    { id: 7, program: "BBA", fee: "₹ 24,500/-" },
    { id: 8, program: "BCA", fee: "₹ 35,500/-" },
    { id: 9, program: "B.COM", fee: "₹ 10,455/-" },
  ];

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
        heading="Begin Your Journey With Us"
        description="Welcome to the Admissions section, designed to guide you through every step of joining our institution. Find detailed information on the admission procedure, online registration, fee structure, and the official prospectus—all in one place."
      />
      <section className="py-[80px] bg-[#f8f9fa]">
        <div className="container">
          <div className="section-title">
            <h2>Admission Procedure</h2>
            <p>Begin your journey towards academic excellence.</p>
          </div>

          <div>
            <div className="bg-white p-[40px] rounded-[10px] shadow-[0_5px_20px_rgba(0,0,0,0.1)] mb-[40px] max-sm:p-[25px]">
              <h3 className="text-[#ff0000] text-[1.8rem] mb-[20px]">ADMISSION PROCEDURE</h3>
              <p className="leading-[1.8] text-[#555] text-[1.1rem]">
                Dev Bhoomi Group Of Institutions (DBGI) accepts admission
                applications to a variety of technologically focused bachelor's,
                master's degree programs. Each year, DBGI attracts thousands of
                applications from prospective students, but admission is given
                only to good students who will meet the minimum eligibility
                criteria set by DBGI and allows only the brightest students to
                have the privilege of taking admission in our group.
              </p>
            </div>

            <div className="grid gap-[30px]">
              <div className="flex gap-[30px] bg-white p-[30px] rounded-[10px] shadow-[0_3px_15px_rgba(0,0,0,0.08)] max-md:flex-col max-md:text-center">
                <div className="bg-[#ff0000] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.5rem] font-bold shrink-0 max-md:mx-auto">1</div>
                <div>
                  <h4 className="text-[#333] text-[1.4rem] mb-[15px]">Online Registration</h4>
                  <p className="text-[#666] leading-[1.7]">
                    For online Admissions process, students must visit our
                    Website and should fill-in the detail available in the free
                    Registration form. On receiving the Registration form, our
                    Admission counselors call the Admission seeker/s in no time.
                    <Link to="https://docs.google.com/forms/d/e/1FAIpQLSdkfLCsYx8-8QY0KX2SdpCdIRzt3J5yQoX1lbZjjQoMWgmyug/viewform?embedded=true&amp;usp=embed_facebook" className="text-[#ff0000] no-underline font-semibold hover:underline">
                      {" "}
                      Register Here
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex gap-[30px] bg-white p-[30px] rounded-[10px] shadow-[0_3px_15px_rgba(0,0,0,0.08)] max-md:flex-col max-md:text-center">
                <div className="bg-[#ff0000] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center text-[1.5rem] font-bold shrink-0 max-md:mx-auto">2</div>
                <div>
                  <h4 className="text-[#333] text-[1.4rem] mb-[15px]">Walk-in Registration</h4>
                  <p className="text-[#666] leading-[1.7]">
                    The Applicant can walk directly into our campus & meet our
                    admission counselor, who will counsel the student regarding
                    the different courses and the eligibility criteria. After
                    all the details received by the student, the applicant can
                    fill the admission form & submit the photocopy of the
                    documents. After scrutiny, the applicant will be informed
                    about admission. On confirmation of admission the candidate
                    is required to deposit the fee as per college norms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="py-[60px] bg-[#f8f9fa] max-md:py-[40px]">
          <div className="container">
            <div className="section-title">
              <h2>Program Fee Structure</h2>
              <p>Annual fee details for various programs at DBGI</p>
            </div>

            <div className="bg-white rounded-[10px] p-[20px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] overflow-x-auto mb-[30px] max-md:p-[15px] max-md:mx-[-15px] max-md:rounded-none">
              <table className="w-full border-collapse min-w-[500px]">
                <thead className="bg-[linear-gradient(135deg,#ff0000,#e60000)]">
                  <tr>
                    <th className="text-white p-[18px_15px] text-left font-semibold text-[1.1rem] uppercase tracking-[0.5px] rounded-tl-[8px] max-md:p-[12px_10px] max-md:text-[1rem]">S.N.</th>
                    <th className="text-white p-[18px_15px] text-left font-semibold text-[1.1rem] uppercase tracking-[0.5px] max-md:p-[12px_10px] max-md:text-[1rem]">Programme</th>
                    <th className="text-white p-[18px_15px] text-left font-semibold text-[1.1rem] uppercase tracking-[0.5px] rounded-tr-[8px] max-md:p-[12px_10px] max-md:text-[1rem]">Fee (Annual)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((item) => (
                    <tr key={item.id} className="border-b border-[#f0f0f0] transition-all duration-300 hover:bg-[#f9f9f9] last:border-b-0">
                      <td className="p-[18px_15px] text-[1rem] text-[#333] max-md:p-[12px_10px] max-md:text-[0.95rem] font-semibold text-[#ff0000] w-[80px] max-sm:w-[60px]">{item.id}.</td>
                      <td className="p-[18px_15px] text-[1rem] text-[#333] max-md:p-[12px_10px] max-md:text-[0.95rem] font-semibold">{item.program}</td>
                      <td className="p-[18px_15px] text-[1rem] text-[#333] max-md:p-[12px_10px] max-md:text-[0.95rem] font-bold text-[#ff0000] text-[1.1rem]">{item.fee}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      <div className="bg-[#f0f7ff] p-[15px] rounded-[6px] mt-[10px] flex items-center gap-[10px] text-[0.95rem] text-[#0066cc] max-sm:text-[0.9rem] max-sm:p-[12px]">
                        <i className="fas fa-info-circle text-[1.2rem]"></i>
                        <span>
                          Fees are subject to change. Additional charges may
                          apply.
                        </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="bg-white p-[25px] rounded-[10px] shadow-[0_3px_15px_rgba(0,0,0,0.05)] border-l-[4px] border-[#ff0000] max-md:p-[20px] [&>ul]:list-none [&>ul]:pl-0 [&>ul]:m-0 [&>ul>li]:py-[8px] [&>ul>li]:text-[#555] [&>ul>li]:relative [&>ul>li]:pl-[25px] [&>ul>li]:before:content-['•'] [&>ul>li]:before:text-[#ff0000] [&>ul>li]:before:text-[1.2rem] [&>ul>li]:before:absolute [&>ul>li]:before:left-[10px] max-sm:[&>ul>li]:text-[0.9rem]">
              <h4 className="text-[#333] mb-[15px] text-[1.2rem] flex items-center gap-[10px]">
                <i className="fas fa-exclamation-triangle text-[#ff0000]"></i> Important Notes:
              </h4>
              <ul>
                <li>Above fees are for one academic year</li>
                <li>Hostel and mess charges are additional</li>
                <li>Examination fee is separate</li>
                <li>Scholarships available for eligible candidates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-[80px] bg-white">
        <div className="container">
          <div className="section-title">
            <h2>Eligibility Criteria</h2>
            <p>Academic requirements for our various programs</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] mt-[40px]">
            <div className="bg-[#f8f9fa] p-[30px] rounded-[15px] border-l-[5px] border-[var(--color-primary)] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px]">
              <h3 className="text-[1.5rem] text-[var(--color-primary)] mb-[15px]"><i className="fas fa-laptop-code mr-[10px]"></i> Undergraduate</h3>
              <ul className="list-none pl-0 [&>li]:py-[8px] [&>li]:border-b border-[#eee] last:[&>li]:border-b-0">
                <li className="text-[#555]"><strong>Qualification:</strong> 10+2 from a recognized board</li>
                <li className="text-[#555]"><strong>Subjects:</strong> Physics, Mathematics/Biology & Chemistry</li>
                <li className="text-[#555]"><strong>Minimum Marks:</strong> 50% (45% for SC/ST)</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-[30px] rounded-[15px] border-l-[5px] border-[#ffd200] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px]">
              <h3 className="text-[1.5rem] text-[var(--color-primary)] mb-[15px]"><i className="fas fa-user-graduate mr-[10px]"></i> Postgraduate</h3>
              <ul className="list-none pl-0 [&>li]:py-[8px] [&>li]:border-b border-[#eee] last:[&>li]:border-b-0">
                <li className="text-[#555]"><strong>Qualification:</strong> Bachelor's Degree (3/4 years)</li>
                <li className="text-[#555]"><strong>Requirement:</strong> Valid score in Entrance Exam</li>
                <li className="text-[#555]"><strong>Minimum Marks:</strong> 50% aggregate</li>
              </ul>
            </div>
            <div className="bg-[#f8f9fa] p-[30px] rounded-[15px] border-l-[5px] border-[var(--color-accent)] shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-[5px]">
              <h3 className="text-[1.5rem] text-[var(--color-primary)] mb-[15px]"><i className="fas fa-tools mr-[10px]"></i> Diploma / Polytechnic</h3>
              <ul className="list-none pl-0 [&>li]:py-[8px] [&>li]:border-b border-[#eee] last:[&>li]:border-b-0">
                <li className="text-[#555]"><strong>Qualification:</strong> 10th Standard (High School)</li>
                <li className="text-[#555]"><strong>Subjects:</strong> Science and Mathematics</li>
                <li className="text-[#555]"><strong>Minimum Marks:</strong> 35% overall</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions FAQ */}
      <section className="py-[80px] bg-[#f8f9fa]">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
            <p>Clear your doubts regarding the admission process</p>
          </div>
          <div className="max-w-[800px] mx-auto mt-[40px] flex flex-col gap-[15px]">
            {[
              { q: "Is there any scholarship available?", a: "Yes, we provide merit-based scholarships, scholarships for state domiciles, and fee concessions for economically weaker sections." },
              { q: "Do you have hostel facilities?", a: "Yes, we have separate, fully-secured hostels for boys and girls with mess facilities, wi-fi, and recreational areas." },
              { q: "Can I apply before my final results are declared?", a: "Yes, provisional admission is granted based on your pre-board or previous semester marks. It will be confirmed once final results are submitted." },
              { q: "Are the degrees recognized?", a: "Absolutely. All our programs are approved by AICTE, PCI, and affiliated with state technical universities and boards." }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-[25px] rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-l-[3px] border-[var(--color-primary)]">
                <h4 className="text-[1.2rem] text-[#333] mb-[10px] font-semibold">{faq.q}</h4>
                <p className="text-[#666] leading-[1.6] m-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Office */}
      <section className="py-[80px] bg-[#f8f9fa]">
        <div className="container">
          <div className="bg-white p-[50px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center max-md:p-[30px_20px]">
            <div className="section-title">
              <h2>Our Admissions Office</h2>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[40px] my-[40px]">
              <div className="flex flex-col items-center text-center gap-[15px] max-sm:text-center">
                <i className="fas fa-map-marker-alt text-[2.5rem] text-[#ff0000]"></i>
                <div>
                  <h4 className="text-[#333] mb-[10px] text-[1.2rem]">Address</h4>
                  <p className="text-[#666] leading-[1.6]">
                    7 Km. Milestone Dabki Road,
                    <br />
                    Village Beri Jamapur Ahtemal Via Civil Hospital Xing,
                    <br />
                    Saharanpur (Uttar Pradesh) 247001
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-[15px] max-sm:text-center">
                <i className="fas fa-envelope text-[2.5rem] text-[#ff0000]"></i>
                <div>
                  <h4 className="text-[#333] mb-[10px] text-[1.2rem]">Email</h4>
                  <p className="text-[#666] leading-[1.6]">dbgi@dbgisre.edu.in</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-[15px] max-sm:text-center">
                <i className="fas fa-phone text-[2.5rem] text-[#ff0000]"></i>
                <div>
                  <h4 className="text-[#333] mb-[10px] text-[1.2rem]">Contact Numbers</h4>
                  <p className="text-[#666] leading-[1.6]">+91 9568775222, +91 9568776222</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f0f7ff] p-[30px] rounded-[10px] mt-[40px]">
              <h4 className="text-[#333] mb-[15px] text-[1.3rem]">Office Hours</h4>
              <p className="text-[#666] my-[5px]">Monday - Friday: 10:00 AM - 4:00 PM</p>
              <p className="text-[#666] my-[5px]">Saturday - Sunday: 12:00 AM - 2:00 PM</p>
            </div>
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

export default Admission;
