import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Event Sponsor'); // Default role as Event Sponsor
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, role }) // Send role in request body
      });
      if (response.ok) {
        alert('Registratiion successful!');
        //onLogin();
        navigate('/login');
      } else {
        alert('Error registering');
      }
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <div className="flex items-center justify-center px-8 py-32">
      <form onSubmit={handleRegister} className="bg-[#001313] shadow-green-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-100 mb-6 text-center">{`Register as ${role}`}</h2>
        
        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-200 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-200 mb-2">Register as:</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="event-sponsor"
              name="role"
              value="Event Sponsor"
              checked={role === 'Event Sponsor'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="event-sponsor" className="text-gray-200 mr-4">Event Sponsor</label>
            <input
              type="radio"
              id="event-organizer"
              name="role"
              value="Event Organizer"
              checked={role === 'Event Organizer'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="event-organizer" className="text-gray-200">Event Organizer</label>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full hover:bg-green-300 border border-green-300 text-white hover:text-gray-900 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

