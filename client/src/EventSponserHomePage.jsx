import React from 'react';
import { Link } from 'react-router-dom';

function EventSponsorHomePage() {
  return (
    <section className="flex flex-col justify-center items-center">
    {/* Welcome Page */}
    <div className="flex flex-col justify-center items-center bg-style py-48 px-10">
      <div className="text-center">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          
        </div>
        <h1 className="text-3xl text-gray-100 font-extrabold sm:text-6xl">
        Hey,
          <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {" "}
            Event Sponser{" "}
          </span>
          !
        </h1>

        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
        Explore a wide range of events that align with your brand’s goals. Connect with event organizers, discover sponsorship opportunities, and create meaningful partnerships that drive visibility and engagement for your brand.
        </p>
        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
        Start exploring sponsorship opportunities and connect with event organizers today!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* Add buttons for Event Organizer and Sponsor */}
          
        </div>
        

      </div>
    </div>

    
  </section>
  );
}

export default EventSponsorHomePage;
