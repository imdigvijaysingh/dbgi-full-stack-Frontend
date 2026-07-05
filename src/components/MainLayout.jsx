import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import FloatingIcons from './FloatingIcons';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const targetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      e.target.reset();
    }, 3000);
  };

  // Extract currentPage from pathname (e.g., /pages/about-us -> about-us)
  const currentPage = location.pathname.split('/').pop() || 'home';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <FloatingIcons />
      <Navbar
        headerScrolled={headerScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        currentPage={currentPage}
      />
      <main className="flex-grow">
        <Outlet context={{ scrollToSection }} />
      </main>
      <Footer
        subscribed={subscribed}
        setSubscribed={setSubscribed}
        scrollToSection={scrollToSection}
        handleNewsletterSubmit={handleNewsletterSubmit}
      />
    </div>
  );
};

export default MainLayout;
