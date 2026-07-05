import React from "react";

const ContactCards = () => {
  return (
    <div>
      <section className="py-[80px] bg-white">
        <div className="container mx-auto px-[20px]">
          <div className="grid grid-cols-[1fr_300px] max-lg:grid-cols-1 bg-[#f8f9fa] rounded-[15px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-[1px] border-[#eee]">
            <div className="p-[40px] max-md:p-[25px] flex flex-col gap-[30px]">
              <div className="flex gap-[20px] max-sm:flex-col">
                <i className="fas fa-map-marker-alt text-[2rem] text-[var(--color-primary)] mt-[5px]"></i>
                <div>
                  <h4 className="text-[1.3rem] text-[var(--color-primary)] mb-[5px] font-semibold">Address</h4>
                  <p className="text-[#666] leading-[1.6]">
                    7 Km. Milestone Dabki Road,
                    <br />
                    Village Beri Jamapur Ahtemal Via Civil Hospital Xing,
                    <br />
                    Saharanpur (Uttar Pradesh) 247001
                  </p>
                </div>
              </div>

              <div className="flex gap-[20px] max-sm:flex-col">
                <i className="fas fa-envelope text-[2rem] text-[var(--color-primary)] mt-[5px]"></i>
                <div>
                  <h4 className="text-[1.3rem] text-[var(--color-primary)] mb-[5px] font-semibold">Email</h4>
                  <p className="text-[#666] leading-[1.6]">dbgi@dbgisre.edu.in</p>
                </div>
              </div>

              <div className="flex gap-[20px] max-sm:flex-col">
                <i className="fas fa-phone text-[2rem] text-[var(--color-primary)] mt-[5px]"></i>
                <div>
                  <h4 className="text-[1.3rem] text-[var(--color-primary)] mb-[5px] font-semibold">Contact Numbers</h4>
                  <p className="text-[#666] leading-[1.6]">+91 9568775222, +91 9568776222</p>
                </div>
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] text-white p-[40px] flex flex-col justify-center max-md:p-[30px] max-md:text-center">
              <h4 className="text-[1.5rem] mb-[20px] font-semibold relative pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[40px] after:h-[3px] after:bg-white max-md:after:left-1/2 max-md:after:-translate-x-1/2">Office Hours</h4>
              <p className="mb-[15px] opacity-90 leading-[1.6] border-b-[1px] border-[rgba(255,255,255,0.1)] pb-[15px]">Monday - Friday: 10:00 AM - 4:00 PM</p>
              <p className="opacity-90 leading-[1.6]">Saturday - Sunday: 12:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactCards;
