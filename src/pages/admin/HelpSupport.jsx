import React from 'react';

const HelpSupport = () => {
  return (
    <div className="animate-[modalFadeIn_0.3s_ease] max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Help & Support</h1>
        <p className="text-gray-500 text-sm">Find answers to common questions and learn how to use the CMS.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">CMS Usage Guide</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="fas fa-bullhorn text-[#fe0b00]"></i> How to manage the Notice Board
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-2">
              Navigate to the <strong>Notice Board</strong> section from the sidebar. You will see a list of currently active notices scrolling on the homepage. 
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              <li>To add a new notice, fill out the form on the left side of the screen and click "Publish Notice".</li>
              <li>To delete an old notice, click the red trash icon next to it in the published list.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="fas fa-comments text-[#fe0b00]"></i> Managing Testimonials
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-2">
              The <strong>Testimonials</strong> section allows you to highlight student and alumni success stories on the homepage.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              <li>Enter the Author's Name, their Role (e.g., B.Tech CSE, 2024), and their Quote.</li>
              <li>Once published, it will immediately appear on the live website's testimonial slider.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="fas fa-images text-[#fe0b00]"></i> Using the Media Library
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm mb-2">
              The <strong>Media Library</strong> is where you upload and manage images that you want to use on the website. 
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              <li>Click the upload button to select images from your computer.</li>
              <li>Once uploaded, you can copy the Image URL to use it in other parts of the website or delete images you no longer need.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#fffbf0] rounded-xl shadow-sm border border-[#ffd200]/30 p-6 sm:p-8 flex items-start gap-4">
        <div className="w-12 h-12 bg-[#ffd200]/20 text-[#ff9800] rounded-full flex items-center justify-center text-xl shrink-0">
          <i className="fas fa-headset"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Need Technical Assistance?</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            If you are experiencing issues with the CMS, database connection errors, or need a new feature implemented, please reach out to the DBGI IT Administration Team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:it-support@dbgisre.edu.in" className="flex items-center gap-2 text-[#fe0b00] hover:text-red-700 font-medium text-sm transition-colors">
              <i className="fas fa-envelope"></i> it-support@dbgisre.edu.in
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <i className="fas fa-phone-alt text-gray-400"></i> Ext: 404
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
