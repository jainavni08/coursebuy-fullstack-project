import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // For handling programmatic navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user-data', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user-events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user events');
        }
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserData();
    fetchUserEvents();
  }, [token]);

  const handleDelete = async (eventId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/events/events/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Event deleted successfully');
          // Refresh the events list after deletion
          setEvents(events.filter((event) => event.eventid !== eventId));
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleCreateEvent = () => {
    navigate('/create');  // Navigate to the event creation page
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6 pt-[80px]">User Profile</h1>
  <div className="text-white p-4 rounded-md shadow-md mb-6">
   
    <h2 className="text-xl">Username: {user.username}</h2>
    <h2 className="text-xl">Email: {user.email}</h2>
  </div>

  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-semibold">Your Events</h2>
    <button
      onClick={handleCreateEvent}
      className="bg-green-500 text-white px-6 py-2 rounded-md"
    >
      Create Event
    </button>
  </div>

  {events.length > 0 ? (
    <div className="text-white p-4 rounded-md shadow-md mb-6">
      {events.map((event) => (
        <div key={event.eventid} className="mb-4 p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-white">{event.description}</p>
          <p className="text-white">Date: {new Date(event.date).toLocaleDateString()}</p>
          <div className="flex space-x-2">
            {/* Link to the Update page for this particular event */}
            <Link
              to={`/update/${event.eventid}`}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(event.eventid)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <Link to={`/event/${event.eventid}`} className="text-green-400 hover:text-green-600 mt-4 inline-block">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400">No events found</p>
  )}
</div>
  );
};

export default Dashboard;

   
