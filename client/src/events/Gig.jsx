import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get eventId from the URL

const Gig = () => {
  const [eventDetails, setEventDetails] = useState(null);
  
  // Get eventId from the URL params
  const { eventid } = useParams();

  useEffect(() => {
    // Fetch event details based on the eventId from the URL
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/events/${eventid}`); // Fetch event details by eventId
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventid]);

  if (!eventDetails) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <section className="pt-10 sm:pt-20 pb-10 px-10 bg-style">
      <div className="mb-8">
        <h1 className="text-gray-100 font-extrabold text-4xl mb-2">
          {eventDetails.title} {/* Event title */}
        </h1>
        <p className="text-gray-300 text-xl">Organized by: {eventDetails.organizerName}</p>
      </div>

      <div className="flex flex-col sm:flex-row mb-10">
        <div className="relative flex-none w-full sm:w-2/4 pr-4">
          <img
            src={eventDetails.images || 'default-image.jpg'}
            alt="Event"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 pl-4">
          <div className="text-gray-200 space-y-4">
            <div className="text-lg sm:text-xl lg:text-2xl">
              <span className="font-bold">Date: </span>
              <span>{new Date(eventDetails.date).toLocaleDateString()}</span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl">
              <span className="font-bold">Location: </span>
              <span>{eventDetails.location}</span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl">
              <span className="font-bold">Attendees: </span>
              <span>{eventDetails.attendees}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-gray-100 font-bold text-2xl">About This Event</h2>
        <p className="mt-4 text-gray-200">
          {eventDetails.about} {/* Event details */}
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-gray-100 font-bold text-2xl">Sponsership Details</h2>
        <p className="mt-4 text-gray-200">
          {eventDetails.sponsershipdetails} {/* Event details */}
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-gray-100 font-bold text-2xl">Contact the event</h2>
        <p className="mt-4 text-gray-200">
          {eventDetails.contactdetails} {/* Event details */}
        </p>
      </div>
    </section>
  );
};

export default Gig;

