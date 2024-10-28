import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Assuming you stored user ID at login
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/user', {
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
        const response = await fetch(`http://localhost:3000/events/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserEvents();
  }, [token, userId]);

  const handleCreateEvent = () => {
    navigate('/events/create'); // Navigate to the create event page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      {user && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
          <h2 className="text-xl">Username: {user.username}</h2>
          <h2 className="text-xl">Email: {user.email}</h2>
          <h2 className="text-xl">Role: {user.role}</h2>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Past Events</h2>
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.eventid} className="border-b py-2">
              <h3 className="text-lg">{event.title}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
            </div>
          ))
        ) : (
          <p>No past events found.</p>
        )}
      </div>

      {user.role === 'Event Organizer' && (
        <button
          onClick={handleCreateEvent}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Create New Event
        </button>
      )}
    </div>
  );
};

export default Dashboard;
