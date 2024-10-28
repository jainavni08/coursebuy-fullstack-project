import React, { useState } from 'react';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user's info

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          organizerId: user.id,  // Include the user id as organizerId
          eventName,
          eventLocation,
          eventDate,
        }),
      });

      if (response.ok) {
        alert('Event created successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Error creating event');
      }
    } catch (error) {
      alert('Error creating event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Location"
        value={eventLocation}
        onChange={(e) => setEventLocation(e.target.value)}
      />
      <input
        type="date"
        placeholder="Event Date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;

