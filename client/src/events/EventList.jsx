import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all events from the backend
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events/events'); // API endpoint to get all events
        const data = await response.json();
        setEvents(data); // Set the fetched events into state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-list container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {events.map((event) => (
          <div key={event.eventid} className="bg-[#001313] p-6 rounded-lg shadow-md hover:shadow-green-300 transition-shadow duration-300">
            {/* Image Section */}
            <img
              src={event.images || 'https://via.placeholder.com/400x200'} // Fallback image if none provided
              alt={event.title}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-gray-100 text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-400">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-400">Location: {event.location}</p>
            <p className="text-gray-400">Attendees: {event.attendees}</p>
            {/* Link to the Gig page with eventId in the URL */}
            <Link to={`/event/${event.eventid}`} className="text-green-400 hover:text-green-600 mt-4 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
