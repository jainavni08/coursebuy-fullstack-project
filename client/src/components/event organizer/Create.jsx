import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = ({ onLogin }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState('');
  const [about, setAbout] = useState('');
  const [sponsorshipDetails, setSponsorshipDetails] = useState('');
  const [images, setImages] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  
  const navigate = useNavigate();

  // Get the 'user' object from localStorage
  let user = JSON.parse(localStorage.getItem('user'));

  // Check if the user object exists and has an 'id' key
  if (user && user.id) {
    console.log(user.id); // Log the value of the 'id' key
  } else {
    console.log("User or ID not found in localStorage.");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Prepare the data to send in the request body
    const eventData = {
      title,
      date,
      location,
      attendees,
      about,
      sponsorshipDetails,
      images,
      contactDetails,
      organizerid: user ? user.id : null,
    };

    try {
      const response = await fetch('http://localhost:3000/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData), // Pass all event data
      });

      if (response.ok) {
        alert('Event Created successfully!');
        navigate('/dashboard');
      } else {
        alert('Error creating event');
      }
    } catch (error) {
      alert('Error creating event');
    }
  };

  return (
    <div className="flex items-center justify-center px-8 py-32">
      <form onSubmit={handleRegister} className="bg-[#001313] shadow-green-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-100 mb-6 text-center">{`Create Event`}</h2>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="location">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="attendees">
            Attendees:
          </label>
          <input
            type="text"
            id="attendees"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="about">
            About:
          </label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="sponsorshipDetails">
            Sponsorship Details:
          </label>
          <textarea
            id="sponsorshipDetails"
            value={sponsorshipDetails}
            onChange={(e) => setSponsorshipDetails(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="images">
            Images (URLs or file paths):
          </label>
          <input
            type="text"
            id="images"
            value={images}
            onChange={(e) => setImages(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="contactDetails">
            Contact Details:
          </label>
          <input
            type="text"
            id="contactDetails"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)} 
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        <button
          type="submit"
          className="w-full hover:bg-green-300 border border-green-300 text-white hover:text-gray-900 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;




