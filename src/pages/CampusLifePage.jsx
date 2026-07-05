import React from 'react';
import CampusLife from './CampusLifeOverlay';
import Hero from '../components/Hero';

const CampusLifePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero
        heading="Life at DBGI"
        description="Discover the vibrant campus life, diverse student communities, and endless opportunities that make Dev Bhoomi Group of Institutions a home away from home."
        showButtons={false}
      />
      <div className="container py-12">
        <CampusLife />
      </div>
    </div>
  );
};

export default CampusLifePage;
