import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate to navigate after update

const Update = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    attendees: '',
    sponsorshipDetails: '',
    contactDetails: '',
    images: ''
  });

  const { eventid } = useParams(); // Get eventId from URL params
  const navigate = useNavigate(); // Hook to navigate after form submission

  useEffect(() => {
    // Fetch event details by eventId
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/events/${eventid}`);
        const data = await response.json();
        setEventDetails(data);
        setFormData({
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          attendees: data.attendees,
          sponsorshipDetails: data.sponsorshipDetails,
          contactDetails: data.contactDetails,
          images: data.images || ''
        });
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventid]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with only the fields that have been updated
    const updatedFields = {};
  
    if (formData.title !== eventDetails.title) updatedFields.title = formData.title;
    if (formData.date !== eventDetails.date) updatedFields.date = formData.date;
    if (formData.location !== eventDetails.location) updatedFields.location = formData.location;
    if (formData.attendees !== eventDetails.attendees) updatedFields.attendees = formData.attendees;
    if (formData.about !== eventDetails.about) updatedFields.about = formData.about;
    if (formData.sponsorshipDetails !== eventDetails.sponsorshipDetails) updatedFields.sponsorshipDetails = formData.sponsorshipDetails;
    if (formData.contactDetails !== eventDetails.contactDetails) updatedFields.contactDetails = formData.contactDetails;
    if (formData.images !== eventDetails.images) updatedFields.images = formData.images;
  
    try {
      const response = await fetch(`http://localhost:3000/events/events/${eventid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (response.ok) {
        alert("Event updated successfully");
        navigate(`/dashboard`); // Redirect to the updated event page
      } else {
        alert("Failed to update event");
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pt-10 sm:pt-20 pb-10 px-10 bg-style">
      <div className="mb-8">
        <h1 className="text-gray-100 font-extrabold text-4xl mb-2">Update Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-100">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-100">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
           
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-100">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
           
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-100">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
           
          />
        </div>

        <div>
          <label htmlFor="attendees" className="block text-gray-100">Attendees</label>
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
           
          />
        </div>

        <div>
          <label htmlFor="sponsorshipDetails" className="block text-gray-100">Sponsorship Details</label>
          <textarea
            id="sponsorshipDetails"
            name="sponsorshipDetails"
            value={formData.sponsorshipDetails}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          />
        </div>

        <div>
          <label htmlFor="contactDetails" className="block text-gray-100">Contact Details</label>
          <textarea
            id="contactDetails"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-gray-100">Event Image URL</label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Update Event
          </button>
        </div>
      </form>
    </section>
  );
};

export default Update;


