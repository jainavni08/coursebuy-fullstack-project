import React, { useState } from 'react';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state before submission

    // Check if all fields are filled
    if (!eventName || !eventLocation || !eventDate) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          organizerId: user?.id, // Include the user ID as organizerId
          eventName,
          eventLocation,
          eventDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Event created successfully');
        // Clear form fields after successful submission
        setEventName('');
        setEventLocation('');
        setEventDate('');
      } else {
        setError(data.message || 'Error creating event');
      }
    } catch (error) {
      setError('Error creating event');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="py-32 flex justify-center items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="date"
          placeholder="Event Date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Event...' : 'Create Event'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default EventForm;

