import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/Button";
import logo from "../assets/images/logo.png";

const Footer = ({ subscribed, scrollToSection, handleNewsletterSubmit }) => {
  return (
    <footer
      id="contact"
      className="bg-[var(--color-dark)] text-white pt-[60px] pb-[20px] flex flex-col"
    >
      <div className="container flex-grow flex flex-col">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[40px] mb-[40px] flex-grow">
          <div className="footer-column flex flex-col items-center sm:items-start gap-[15px]">
            <div className="flex items-center gap-[15px] mb-[10px]">
              <img
                src={logo}
                alt="DBGI Logo"
                className="h-[60px] object-contain"
              />
              <h3 className="text-[1.3rem] m-0 text-[var(--color-primary)] font-bold text-left leading-tight">
                Dev Bhoomi Group of Institutions
              </h3>
            </div>
            <p className="text-[#ccc] text-sm leading-[1.6] text-center sm:text-left">
              Established in 2009, DBGI Saharanpur is a premier institution
              committed to quality education, innovation, and holistic
              development. We strive to nurture talent, encourage critical
              thinking, and build a community where diverse minds can thrive in
              their chosen fields.
            </p>
          </div>

          <div className="footer-column [&>h3]:text-[1.3rem] [&>h3]:mb-[20px] [&>h3]:text-[var(--color-primary)] [&>a]:text-[#ccc] [&>a]:mb-[10px] [&>a]:block [&>a]:no-underline [&>a]:transition-all [&>a]:duration-300 hover:[&>a]:text-white hover:[&>a]:pl-[5px]">
            <h3>Quick Links</h3>
            {[
              { pathName: "Admissions", path: "/pages/admission" },
              { pathName: "Courses", path: "/pages/courses" },
              { pathName: "Academics", path: "/pages/academics" },
              { pathName: "Placements", path: "/pages/placements" },
              { pathName: "Campus Life", path: "/pages/campus-life" },
              { pathName: "Contact Us", path: "/pages/contact-us" },
              { pathName: "Career @DBGI", path: "/pages/career" },
              { pathName: "Admin Portal", path: "/admin/login" },
            ].map((link, index) => (
              <Link key={index} to={link.path}>
                {link.pathName}
              </Link>
            ))}
          </div>

          <div className="footer-column [&>h3]:text-[1.3rem] [&>h3]:mb-[20px] [&>h3]:text-[var(--color-primary)] [&>a]:text-[#ccc] [&>a]:mb-[10px] [&>a]:block [&>a]:no-underline [&>a]:transition-all [&>a]:duration-300 hover:[&>a]:text-white hover:[&>a]:pl-[5px]">
            <h3>Popular Courses</h3>
            {[
              {
                pathName: "B.Tech Engineering",
                path: "/pages/course/btech-cse",
              },
              { pathName: "BCA & MCA", path: "/pages/course/mca" },
              { pathName: "BBA & MBA", path: "/pages/course/mba" },
              { pathName: "B.Com", path: "/pages/course/bcom" },
              { pathName: "B.Pharm & D.Pharm", path: "/pages/course/bpharm" },
              {
                pathName: "Polytechnic Diplomas",
                path: "/pages/course/diploma-cs",
              },
            ].map((link, index) => (
              <Link key={index} to={link.path}>
                {link.pathName}
              </Link>
            ))}
          </div>

          <div className="footer-column [&>h3]:text-[1.3rem] [&>h3]:mb-[20px] [&>h3]:text-[var(--color-primary)] [&>p]:text-[#ccc] [&>p]:mb-[10px] [&>p]:block [&>p]:transition-all [&>p]:duration-300">
            <h3>DBGI</h3>
            <p>
              Milestone Dabki Road <br />
              Village Beri Jamapur
              <br />
              Saharanpur (Uttar Pradesh) 247001
            </p>
            <p>Phone: 9568775222, 9568776222</p>
            <p>Email: dbgi@dbgisre.edu.in</p>
            <div className="flex gap-[15px] mt-[20px] flex-wrap">
              {[
                {
                  icon: "fa-facebook-f",
                  href: "https://www.facebook.com/dbgisre",
                },
                { icon: "fa-twitter", href: "#" },
                {
                  icon: "fa-instagram",
                  href: "https://www.instagram.com/dbgi.saharanpur/",
                },
                { icon: "fa-linkedin-in", href: "#" },
                {
                  icon: "fa-youtube",
                  href: "https://www.youtube.com/@dbgisaharanpurofficial",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  rel="noopener noreferrer"
                  aria-label={`${social.icon.split("-")[1]} social media`}
                  className="flex items-center justify-center w-[40px] h-[40px] bg-white/10 rounded-full text-white no-underline transition-all duration-300 hover:bg-[var(--color-primary)] hover:-translate-y-[5px]"
                >
                  <i className={`fab ${social.icon}`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center pt-[20px] border-t border-white/10 text-[0.9rem] text-[#999] mt-auto w-full text-center">
          <p className="m-0">
            &copy; {new Date().getFullYear()} DBGI SAHARANPUR
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
