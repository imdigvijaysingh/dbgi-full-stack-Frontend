import { useState, useEffect } from 'react';
import api from '../utils/api';
import sports1 from '../assets/campus_life/sports.webp';
import sports2 from '../assets/campus_life/sports-2.webp';
import sports3 from '../assets/campus_life/sports-3.webp';
import sports4 from '../assets/campus_life/sports-4.webp';
import sports5 from '../assets/campus_life/sports-5.webp';

import alumni1 from '../assets/campus_life/almuni.webp';
import alumni2 from '../assets/campus_life/almuni-2.webp';
import alumni3 from '../assets/campus_life/almuni-3.webp';
import alumni4 from '../assets/campus_life/almuni-4.webp';
import alumni5 from '../assets/campus_life/almuni-5.webp';

import fresher1 from '../assets/campus_life/fresher.webp';
import fresher2 from '../assets/campus_life/fresher-2.webp';
import fresher3 from '../assets/campus_life/fresher-3.webp';
import fresher4 from '../assets/campus_life/fresher-4.webp';
import fresher5 from '../assets/campus_life/fresher-5.webp';
import fresher6 from '../assets/campus_life/fresher-6.webp';
import fresher7 from '../assets/campus_life/fresher-7.webp';

import industry_visit1 from '../assets/campus_life/industrial_visit.webp';
import industry_visit2 from '../assets/campus_life/industrial_visit-2.webp';
import industry_visit3 from '../assets/campus_life/industrial_visit-3.webp';
import industry_visit4 from '../assets/campus_life/industrial_visit-4.webp';

import tvaran1 from '../assets/campus_life/tvaran.webp';
import tvaran2 from '../assets/campus_life/tvaran-2.webp';
import tvaran3 from '../assets/campus_life/tvaran-3.webp';
import tvaran4 from '../assets/campus_life/tvaran-4.webp';
import tvaran5 from '../assets/campus_life/tvaran-5.webp';
import tvaran6 from '../assets/campus_life/tvaran-6.webp';
import tvaran7 from '../assets/campus_life/tvaran-7.webp';
import tvaran8 from '../assets/campus_life/tvaran-8.webp';
import tvaran9 from '../assets/campus_life/tvaran-9.webp';
import tvaran10 from '../assets/campus_life/tvaran-10.webp';

import job1 from '../assets/campus_life/job_fair.webp';
import job2 from '../assets/campus_life/job_fair-2.webp';
import job3 from '../assets/campus_life/job_fair-3.webp';
import job4 from '../assets/campus_life/job_fair-4.webp';
import job5 from '../assets/campus_life/job_fair-5.webp';

import trip2 from '../assets/campus_life/trip-2.webp';
import trip3 from '../assets/campus_life/trip-3.webp';
import trip4 from '../assets/campus_life/trip-4.webp';

import girl_game1 from '../assets/campus_life/girls_competition.webp';
import girl_game2 from '../assets/campus_life/girls_competition-2.webp';
import girl_game3 from '../assets/campus_life/girls_competition-3.webp';
import girl_game4 from '../assets/campus_life/girls_competition-4.webp';
import girl_game5 from '../assets/campus_life/girls_competition-5.webp';

import play1 from '../assets/campus_life/nukkad_play.webp';
import play2 from '../assets/campus_life/nukkad_play-2.webp';
import play3 from '../assets/campus_life/nukkad_play-3.webp';
import play4 from '../assets/campus_life/nukkad_play-4.webp';
import play5 from '../assets/campus_life/nukkad_play-5.webp';

import star_night1 from '../assets/campus_life/star_night.webp';
import star_night2 from '../assets/campus_life/star_night-2.webp';
import star_night3 from '../assets/campus_life/star_night-3.webp';
import star_night4 from '../assets/campus_life/star_night-4.webp';
import star_night5 from '../assets/campus_life/star_night-5.webp';

import women_empower1 from '../assets/campus_life/women_empowerment.webp';
import women_empower2 from '../assets/campus_life/women_empowerment-2.webp';
import women_empower3 from '../assets/campus_life/women_empowerment-3.webp';
import women_empower4 from '../assets/campus_life/women_empowerment-4.webp';
import women_empower5 from '../assets/campus_life/women_empowerment-5.webp';

import farewell1 from '../assets/campus_life/farewell_party.webp';
import farewell2 from '../assets/campus_life/farewell_party-2.webp';
import farewell3 from '../assets/campus_life/farewell_party-3.webp';

import winners1 from '../assets/campus_life/winners.webp';
import winners2 from '../assets/campus_life/winners-2.webp';
import winners3 from '../assets/campus_life/winners-3.webp';
import winners4 from '../assets/campus_life/winners-4.webp';
import winners5 from '../assets/campus_life/winners-5.webp';

import guest_visit1 from '../assets/campus_life/guests.webp';
import guest_visit2 from '../assets/campus_life/guests-2.webp';

import jagrukta1 from '../assets/campus_life/jagrukta_karyakram.webp';
import jagrukta2 from '../assets/campus_life/jagrukta_karyakram-2.webp';
import jagrukta3 from '../assets/campus_life/jagrukta_karyakram-3.webp';
import jagrukta4 from '../assets/campus_life/jagrukta_karyakram-4.webp';
import jagrukta5 from '../assets/campus_life/jagrukta_karyakram-5.webp';

import seminar1 from '../assets/campus_life/seminars.webp';
import seminar2 from '../assets/campus_life/seminars-2.webp';
import seminar3 from '../assets/campus_life/seminars-3.webp';

import supportive_faculty1 from '../assets/campus_life/supportive_faculty.webp';
import supportive_faculty2 from '../assets/campus_life/supportive_faculty-2.webp';
import supportive_faculty3 from '../assets/campus_life/supportive_faculty-3.webp';

import yoga1 from '../assets/campus_life/yoga.webp';
import yoga2 from '../assets/campus_life/yoga-2.webp';
import yoga3 from '../assets/campus_life/yoga-3.webp';
import yoga4 from '../assets/campus_life/yoga-4.webp';
import yoga5 from '../assets/campus_life/yoga-5.webp';

import lovely_faculty1 from '../assets/campus_life/lovely_faculty.webp';
import lovely_faculty2 from '../assets/campus_life/lovely_faculty-2.webp';
import lovely_faculty3 from '../assets/campus_life/lovely_faculty-3.webp';
import lovely_faculty4 from '../assets/campus_life/lovely_faculty-4.webp';
import lovely_faculty5 from '../assets/campus_life/lovely_faculty-5.webp';

import parents_felicitation1 from '../assets/campus_life/parents_felicitation_ceremoney.webp';
import parents_felicitation2 from '../assets/campus_life/parents_felicitation_ceremoney-2.webp';
import parents_felicitation3 from '../assets/campus_life/parents_felicitation_ceremoney-3.webp';
import parents_felicitation4 from '../assets/campus_life/parents_felicitation_ceremoney-4.webp';

import moot_court1 from '../assets/campus_life/moot_court_competition.webp';
import moot_court2 from '../assets/campus_life/moot_court_competition-2.webp';
import moot_court3 from '../assets/campus_life/moot_court_competition-3.webp';
import moot_court4 from '../assets/campus_life/moot_court_competition-4.webp';
import moot_court5 from '../assets/campus_life/moot_court_competition-5.webp';

import { Link } from 'react-router-dom';

const CampusLife = ({ previewCount, showViewMore }) => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [customPhotos, setCustomPhotos] = useState([]);

  useEffect(() => {
    const fetchCustomPhotos = async () => {
      try {
        const res = await api.get('/media');
        if (res.data && res.data.success) {
          const formatted = res.data.data.map(m => ({
            url: m.url,
            categoryId: m.category
          }));
          setCustomPhotos(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch campus life photos', error);
      }
    };
    fetchCustomPhotos();
  }, []);
  
  const campusCards = [
    {
      id: 'sports',
      title: 'Sports Meet',
      images: [sports1, sports2, sports3, sports4, sports5], 
      description: 'Annual sports meet with various competitions including athletics, football, basketball, and more. Our students excel in inter-college tournaments.',
      altTexts: [
        'Sports competition at campus',
        'Football match in progress',
        'Basketball tournament final'
      ]
    },
    {
      id: 'alumni',
      title: 'Alumni Meetups',
      images: [alumni1, alumni2, alumni3, alumni4, alumni5],
      description: 'Active alumni network with regular meetups, mentorship programs, and career guidance sessions for current students.',
      altTexts: [
        'Alumni meet annual gathering',
        'Alumni sharing experiences',
        'Alumni networking event'
      ]
    },
    {
      id: 'fresher',
      title: 'Freshers Party',
      images: [fresher1, fresher2, fresher3, fresher4, fresher5, fresher6, fresher7],
      description: 'Grand welcome ceremony for new students with cultural performances, ice-breaking sessions, and campus orientation.',
      altTexts: [
        'Freshers welcome ceremony',
        'New students orientation',
        'Welcome party for freshers'
      ]
    },
    {
      id: 'industry_visit',
      title: 'Industrial Visits',
      images: [industry_visit1, industry_visit2, industry_visit3, industry_visit4],
      description: 'Regular industrial visits to leading companies for practical exposure and understanding of real-world applications.',
      altTexts: [
        'Students on industrial visit',
        'Factory tour for students',
        'Industrial exposure program'
      ]
    },
    {
      id: 'tvaran',
      title: 'Tvaran Events',
      images: [tvaran1, tvaran2, tvaran3, tvaran4, tvaran5, tvaran6, tvaran7, tvaran8, tvaran9, tvaran10],
      description: 'Annual cultural fest featuring music, dance, drama, art exhibitions, and various competitions.',
      altTexts: [
        'Cultural fest performance',
        'Tvaran event stage show',
        'Cultural festival activities'
      ]
    },
    {
      id: 'job',
      title: 'Job Fair',
      images: [job1, job2, job3, job4, job5],
      description: 'Campus placement drive with top recruiters from various industries offering excellent career opportunities.',
      altTexts: [
        'Campus placement drive',
        'Job fair interaction',
        'Recruitment process'
      ]
    },
    {
      id: 'trip',
      title: 'Educational Trips',
      images: [trip2, trip3, trip4],
      description: 'Educational and recreational trips to historical sites, tech parks, and natural wonders for holistic learning.',
      altTexts: [
        'Educational trip group photo',
        'Students on excursion',
        'Learning outside classroom'
      ]
    },
    {
      id: 'girl_game',
      title: 'Girls Competition',
      images: [girl_game1, girl_game2, girl_game3, girl_game4, girl_game5],
      description: 'Special competitions and events celebrating women empowerment and encouraging female participation in sports.',
      altTexts: [
        'Girls sports competition',
        'Women empowerment event',
        'Female students in competition'
      ]
    },
    {
      id: 'play',
      title: 'Nukkad Natak',
      images: [play1, play2, play3, play4, play5],
      description: 'Street plays addressing social issues, performed by students to create awareness in the community.',
      altTexts: [
        'Street play performance',
        'Nukkad natak on social issues',
        'Theatre group performance'
      ]
    },
    {
      id: 'star_night',
      title: 'Star Night',
      images: [star_night1, star_night2, star_night3, star_night4, star_night5],
      description: 'Musical night featuring popular artists, bands, and student performances under the stars.',
      altTexts: [
        'Star night concert',
        'Musical performance night',
        'Evening cultural program'
      ]
    },
    {
      id: 'women_empower',
      title: 'Women Empowerment',
      images: [women_empower1, women_empower2, women_empower3, women_empower4, women_empower5],
      description: 'Programs and workshops focused on women empowerment, self-defense, and career development.',
      altTexts: [
        'Women empowerment workshop',
        'Self-defense training',
        'Career development for women'
      ]
    },
    {
      id: 'farewell',
      title: 'Farewell Party',
      images: [farewell1, farewell2, farewell3],
      description: 'Emotional farewell ceremony for graduating students with awards, speeches, and cultural performances.',
      altTexts: [
        'Farewell ceremony',
        'Graduating students celebration',
        'Goodbye party'
      ]
    },
    {
      id: 'winners',
      title: 'Achievers',
      images: [winners1, winners2, winners3, winners4, winners5],
      description: 'Celebrating student achievements in academics, sports, and extracurricular activities.',
      altTexts: [
        'Award ceremony',
        'Achievers being felicitated',
        'Prize distribution'
      ]
    },
    {
      id: 'guest_visit',
      title: 'Guest Lectures',
      images: [guest_visit1, guest_visit2],
      description: 'Regular sessions with industry experts, entrepreneurs, and alumni for knowledge sharing.',
      altTexts: [
        'Guest lecture session',
        'Industry expert interaction',
        'Knowledge sharing program'
      ]
    },
    {
      id: 'jagrukta',
      title: 'Awareness Programs',
      images: [jagrukta1, jagrukta2, jagrukta3, jagrukta4, jagrukta5],
      description: 'Social awareness campaigns on important issues like environment, health, and digital literacy.',
      altTexts: [
        'Awareness program',
        'Social campaign',
        'Community service'
      ]
    },
    {
      id: 'seminar',
      title: 'Seminars & Workshops',
      images: [seminar1, seminar2, seminar3],
      description: 'Regular seminars, workshops, and training sessions for skill development and knowledge enhancement.',
      altTexts: [
        'Seminar in progress',
        'Workshop session',
        'Training program'
      ]
    },
    {
      id: 'supportive_faculty',
      title: 'Supportive Faculty',
      images: [supportive_faculty1, supportive_faculty2, supportive_faculty3],
      description: 'Dedicated faculty members providing mentorship, guidance, and support to students.',
      altTexts: [
        'Faculty guidance session',
        'Teacher-student interaction',
        'Mentorship program'
      ]
    },
    {
      id: 'yoga',
      title: 'Yoga & Wellness',
      images: [yoga1, yoga2, yoga3, yoga4, yoga5],
      description: 'Regular yoga sessions, meditation programs, and wellness workshops for students and staff.',
      altTexts: [
        'Yoga session',
        'Meditation program',
        'Wellness workshop'
      ]
    },
    {
      id: 'lovely_faculty',
      title: 'Lovely Faculty',
      images: [lovely_faculty1, lovely_faculty2, lovely_faculty3, lovely_faculty4, lovely_faculty5],
      description: 'Friendly and approachable faculty creating a positive learning environment.',
      altTexts: [
        'Faculty interaction',
        'Informal discussion',
        'Faculty-student bonding'
      ]
    },
    {
      id: 'parents_felicitation',
      title: 'Parents Felicitation',
      images: [parents_felicitation1, parents_felicitation2, parents_felicitation3, parents_felicitation4],
      description: 'Annual parents felicitation ceremony recognizing student achievements and parent involvement.',
      altTexts: [
        'Parents day ceremony',
        'Parent-teacher meeting',
        'Felicitation program'
      ]
    },
    {
      id: 'moot_court',
      title: 'Moot Court',
      images: [moot_court1, moot_court2, moot_court3, moot_court4, moot_court5],
      description: 'Mock court competitions for law students to develop advocacy and legal reasoning skills.',
      altTexts: [
        'Moot court competition',
        'Law students in action',
        'Mock trial session'
      ]
    }
  ];

  // Merge custom photos into the categories
  const finalCampusCards = campusCards.map(card => {
    const categoryCustomPhotos = customPhotos.filter(p => p.categoryId === card.id).map(p => p.url);
    return {
      ...card,
      images: [...categoryCustomPhotos, ...card.images]
    };
  });

  // Open modal with specific card
  const openModal = (index) => {
    setCurrentCardIndex(index);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    setIsLoading(true);
    setProgress(0); 
    document.body.classList.add('modal-open');
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  // Navigate to next image
  const nextImage = () => {
    const currentCard = finalCampusCards[currentCardIndex];
    setIsLoading(true);
    setProgress(0);

    setCurrentImageIndex((prev) => 
      prev === currentCard.images.length - 1 ? 0 : prev + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    const currentCard = finalCampusCards[currentCardIndex];
    setIsLoading(true);
    setProgress(0);

    setCurrentImageIndex((prev) => 
      prev === 0 ? currentCard.images.length - 1 : prev - 1
    );
  };

  // Handle image load
 const handleImageLoad = () => {
  setProgress(100);
  setTimeout(() => {
    setIsLoading(false);
  }, 200);
};

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentCardIndex]);


    useEffect(() => {
      let interval;

      if (isLoading) {
        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + 5;
          });
      }, 150);
    }

      return () => clearInterval(interval);
    }, [isLoading]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <section className="bg-white py-[60px]">
        <div className="container">
          <div className="section-title">
            <h2>Campus Life</h2>
            <p>
              Experience a vibrant campus community with diverse activities,
              clubs, and resources that enrich your college experience.
            </p>
          </div>
          
          <div className={`grid ${previewCount ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'} gap-[25px] justify-center max-md:grid-cols-1`}>
            {(previewCount ? finalCampusCards.slice(0, previewCount) : finalCampusCards).map((card, index) => (
              <div 
                className={`h-[250px] w-full text-center rounded-[12px] transition-all duration-300 relative overflow-hidden flex items-end justify-center p-[20px] bg-cover bg-center bg-no-repeat cursor-pointer before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[60%] before:bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)] before:z-[1] after:content-['Click_to_view_more'] after:absolute after:bottom-[10px] after:left-0 after:right-0 after:text-center after:text-white after:text-[0.8rem] after:opacity-0 after:translate-y-[10px] after:transition-all after:duration-300 after:z-[2] hover:-translate-y-[8px] hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:z-10 hover:after:opacity-100 hover:after:translate-y-0 scroll-animation ${card.id}`}
                key={index} 
                id={card.id}
                onClick={() => openModal(index)}
                style={{ backgroundImage: `url(${card.images[0]})` }}
              >
                <h3 className="text-[1.3rem] color-white relative z-[2] m-0 text-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] text-white">{card.title}</h3>
              </div>
            ))}
          </div>

          {showViewMore && (
            <div className="text-center mt-12">
              <Link 
                to="/pages/campus-life" 
                className="inline-block bg-[#fe0b00] text-white px-8 py-3 rounded-[30px] font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:-translate-y-1"
              >
                View More
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-[10px] flex justify-center items-center z-[2000] p-[20px] animate-[modalFadeIn_0.3s_ease]" 
          onClick={handleOverlayClick}
        >
          <div className="w-[80%] max-w-[1200px] max-h-[85vh] bg-white rounded-[16px] overflow-hidden relative shadow-[0_25px_80px_rgba(0,0,0,0.5)] animate-[modalSlideUp_0.4s_ease] border-[3px] border-[var(--color-primary)] max-lg:w-[90%] max-md:w-[95%] max-md:max-h-[90vh]">
            <button
              className="absolute top-[15px] right-[15px] bg-[linear-gradient(135deg,#ffd200,#fe0b00)] text-white border-none w-[40px] h-[40px] rounded-full text-[24px] cursor-pointer z-10 flex items-center justify-center transition-all duration-300 shadow-[0_2px_10px_rgba(255,208,0,0.33)] font-bold hover:bg-[#fe0b00] max-md:top-[10px] max-md:right-[10px] max-md:w-[35px] max-md:h-[35px] max-md:text-[20px]"
              onClick={closeModal}
            >
              &times;
            </button>
            {/* Image container */}
            <div className="relative h-[85vh] flex items-center justify-center max-lg:h-[55vh] max-md:h-[50vh] max-sm:h-[40vh]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[8px] bg-[rgba(0,0,0,0.35)] z-[5]">
                  <div className="w-[55px] h-[55px] rounded-full border-[4px] border-[rgba(255,255,255,0.2)] border-t-[4px] border-t-white animate-[spin_0.9s_linear_infinite] shadow-[0_0_20px_rgba(255,255,255,0.3)] flex flex-col justify-center">
                  <div
                    className="h-1 bg-[var(--color-primary)] mt-12 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                </div>
              )}
              <img
                src={finalCampusCards[currentCardIndex].images[currentImageIndex]}
                alt={finalCampusCards[currentCardIndex].altTexts[currentImageIndex] || 
                     `${finalCampusCards[currentCardIndex].title} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full object-contain block transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                loading="eager"
              />

              {/* Previous button */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 -translate-y-1/2 bg-[linear-gradient(135deg,#ffd200,#fe0b00)] text-white border-none w-[50px] h-[50px] rounded-full text-[22px] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_2px_10px_rgba(255,208,0,0.33)] font-bold hover:not(:disabled):bg-[#fe0b00] hover:not(:disabled):scale-110 disabled:opacity-50 disabled:cursor-not-allowed left-[20px] max-md:left-[10px] max-md:w-[45px] max-md:h-[45px] max-md:text-[20px] max-sm:w-[40px] max-sm:h-[40px] max-sm:text-[18px]"
                aria-label="Previous image"
                disabled={isLoading}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>

              {/* Next button */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 -translate-y-1/2 bg-[linear-gradient(135deg,#ffd200,#fe0b00)] text-white border-none w-[50px] h-[50px] rounded-full text-[22px] cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[0_2px_10px_rgba(255,208,0,0.33)] font-bold hover:not(:disabled):bg-[#fe0b00] hover:not(:disabled):scale-110 disabled:opacity-50 disabled:cursor-not-allowed right-[20px] max-md:right-[10px] max-md:w-[45px] max-md:h-[45px] max-md:text-[20px] max-sm:w-[40px] max-sm:h-[40px] max-sm:text-[18px]"
                aria-label="Next image"
                disabled={isLoading}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>

              {/* Image counter */}
              <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.7)] text-white py-[6px] px-[15px] rounded-[20px] text-[14px] font-semibold backdrop-blur-[5px] border border-[rgba(255,255,255,0.1)] min-w-[60px] text-center">
                {currentImageIndex + 1} / {finalCampusCards[currentCardIndex].images.length}
              </div>
            </div>           
          </div>
        </div>
      )}
    </>
  );
};

export default CampusLife;