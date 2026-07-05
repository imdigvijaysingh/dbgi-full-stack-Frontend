import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { allCourses } from '../data/coursesData';
import Button from '../components/common/Button';
import FeatureCard from '../components/FeatureCard';

const CourseDetails = () => {
  const { slug } = useParams();
  
  const course = allCourses.find(c => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return <Navigate to="/pages/courses" replace />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="h-[60vh] bg-cover bg-center pt-[120px] pb-[60px] relative text-white mt-[70px] flex items-center justify-center text-center before:content-[''] before:absolute before:inset-0 before:z-[1] before:bg-black/60"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="flex w-full justify-center items-center relative z-[2]">
          <div className="text-white px-[20px] max-w-[900px]">
            <span className="inline-block px-4 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold mb-4">
              {course.duration} Program
            </span>
            <h1 className="text-[3.5rem] font-bold mb-[15px] leading-[1.2] max-lg:text-[2.8rem] max-md:text-[2rem] max-sm:text-[1.75rem]">
              {course.title}
            </h1>
            <p className="text-[1.2rem] max-w-[700px] mx-auto mb-8 text-white/90">
              {course.description}
            </p>
            <div className="flex justify-center gap-4">
              <Button to="/pages/admission/">Apply Now</Button>
              <Link to="/pages/courses" className="inline-block px-6 py-3 rounded text-white border-2 border-white font-bold hover:bg-white hover:text-black transition-all">
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-[80px] bg-[#f8f9fa]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px]">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Overview & Features */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i> Program Overview
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>
                <h3 className="text-xl font-semibold mb-4">Key Learning Outcomes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <i className="fas fa-check-circle text-[var(--color-accent)] mt-1"></i>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Approach */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                  <i className="fas fa-chalkboard-teacher"></i> Teaching Approach
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {course.approach}
                </p>
              </div>

              {/* Syllabus / Curriculum */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
                  <i className="fas fa-book-open"></i> Curriculum Structure
                </h2>
                <div className="space-y-6">
                  {course.syllabus.map((year, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h4 className="font-bold text-lg text-gray-800">{year.year}</h4>
                      </div>
                      <div className="p-6">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {year.subjects.map((subject, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-gray-600">
                              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              
              {/* Admission Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-[var(--color-accent)]">
                <h3 className="text-xl font-bold mb-4">Admission Eligibility</h3>
                <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-100">
                  <p className="text-gray-800 font-medium">
                    <i className="fas fa-graduation-cap text-orange-500 mr-2"></i>
                    {course.eligibility}
                  </p>
                </div>
                
                <h4 className="font-bold mb-3 text-gray-700">Documents Required:</h4>
                <ul className="space-y-2 mb-6">
                  {course.documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-file-alt text-gray-400 mt-1"></i>
                      {doc}
                    </li>
                  ))}
                </ul>

                <Button to="/pages/admission/" className="w-full text-center py-3 text-lg">
                  Apply for Admission
                </Button>
              </div>

              {/* Need Help? */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl text-white text-center">
                <i className="fas fa-headset text-4xl mb-4 text-blue-300"></i>
                <h3 className="text-xl font-bold mb-2">Need Assistance?</h3>
                <p className="text-blue-100 text-sm mb-6">
                  Our admission counselors are here to help you choose the right path.
                </p>
                <div className="space-y-3">
                  <a href="tel:9568775222" className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded font-bold transition-colors">
                    <i className="fas fa-phone-alt mr-2"></i> 9568775222
                  </a>
                  <a href="mailto:dbgi@dbgisre.edu.in" className="block w-full py-2 bg-white/10 hover:bg-white/20 rounded font-bold transition-colors">
                    <i className="fas fa-envelope mr-2"></i> Email Us
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
