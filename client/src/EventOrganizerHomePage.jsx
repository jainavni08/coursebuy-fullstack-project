import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function EventOrganizerHomePage() {
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
                Event Organizer{" "}
              </span>
              !
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
            As an event organizer, you can create and manage events, attract sponsors, 
            and connect with attendees to make your events successful.
            </p>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
            Start organizing unforgettable experiences today!
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {/* Add buttons for Event Organizer and Sponsor */}
              
            </div>
            

          </div>
        </div>

        
      </section>
  );
}

export default EventOrganizerHomePage;


