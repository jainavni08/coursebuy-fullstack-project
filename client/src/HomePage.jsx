import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./assets/home-image.png";

const testimonials = [];

const MainPage = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        {/* Welcome Page */}
        <div className="flex flex-col justify-center items-center bg-style py-48 px-10">
          <div className="text-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-100 ring-1 ring-gray-300/50 hover:ring-gray-300/70">
                Connect, Collaborate, Create Memorable Experiences{" "}
              </div>
            </div>
            <h1 className="text-3xl text-gray-100 font-extrabold sm:text-6xl">
              Welcome to,
              <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                SponsorHub{" "}
              </span>
              !
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
              Are you ready to take your events to the next level or find the perfect sponsorship opportunity?
            </p>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
              Start now:
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {/* Add buttons for Event Organizer and Sponsor 
              <Link
                to="/event-organizer"
                className="block w-full rounded-full border border-green-300 px-12 py-3 text-sm font-medium text-white hover:text-black hover:bg-green-300 focus:outline-none focus:ring sm:w-auto"
              >
                Event Organizer
              </Link>

              <Link
                to="/event-sponser" // Add the correct route for sponsor once implemented
                className="block w-full rounded-full border border-blue-500 px-12 py-3 text-sm font-medium text-white hover:text-black hover:bg-blue-500 focus:outline-none focus:ring sm:w-auto"
              >
                Event Sponsor
              </Link>*/}
              <div>
                {/*<Link to="/gig">GIG PAGE</Link>
                <Link to="/event-form">EVENT form</Link>*/}
                <Link to="/event-list" className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-100 ring-1 ring-gray-300/50 hover:ring-gray-300/70">EVENT PAGE</Link>
              </div>
            </div>
          </div>
        </div>

        
      </section>
    </>
  );
};

export default MainPage;

