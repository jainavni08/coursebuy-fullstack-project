import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEventDetails] = useState([]);

  useEffect(() => {
    const eventFiles = [
      { 
        id: 'generate-jwt', 
        title: 'FEWV Seconds of Learning How to Generate a JWT?', 
        description: 'Learn how to generate a JSON Web Token (JWT) in just a few seconds.',
        organizer: 'John Doe',
        date: 'October 10, 2024',
        location: 'New York, USA',
        image: 'https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tags: ['React', 'JavaScript'] 
      },
      { 
        id: 'learn-docker', 
        title: 'FEWV Seconds of Learning How to Containerize?', 
        description: 'Learn how to containerize your applications using Docker.',
        organizer: 'Jane Smith',
        date: 'November 5, 2024',
        location: 'San Francisco, USA',
        image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600',
        tags: ['Docker', 'Node.js'] 
      },
      // Add more events as needed
    ];
    setEventDetails(eventFiles);
  }, []);

  return (
    <div className="event-list container mx-auto p-4">
      <div className="py-36">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-200">Our Events</h1>
        <p className="mt-6 text-gray-300 text-center">
          Explore our latest events and learn new skills.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {events.map((event) => ( 
            <li key={event.id} className="bg-[#001313] rounded-lg shadow-sm shadow-green-300 hover:shadow-green-400">
              <img src={event.image} alt={event.title} className="w-full h-48 rounded-t-lg object-cover" />
              <div className="p-4">
                <h2 className="text-gray-100 text-lg font-bold">{event.title}</h2>
                <p className="text-gray-300 mt-1">Organized by: {event.organizer}</p>
                <p className="text-gray-300 mt-1">Date: {event.date}</p>
                <p className="text-gray-300 mt-1">Location: {event.location}</p>
                <p className="text-gray-400 mt-2">{event.description}</p>
                <div className="mt-2">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="mr-2 bg-gray-300 text-black p-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <Link to={`/events/${event.id}`} className="bg-blue-600 text-white py-2 px-4 rounded">
                    View Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
