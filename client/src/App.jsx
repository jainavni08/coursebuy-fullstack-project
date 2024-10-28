import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import HomePage from './HomePage';
import Footer from './components/common/Footer';
import BlogList from './components/blog/BlogList';
import Blog from './components/blog/Blog';
import Team from './Team';
import { AuthProvider } from './components/auth/AuthContext';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Courses from './components/courses/Courses';
import CourseDetails from './components/courses/CourseDetails';
import MyCourses from './components/courses/MyCourses';
import CourseContent from './components/courses/CourseContent';
import CoursePlayer from './components/courses/CoursePlayer';
import Success from './components/auth/Success';
import Cancel from './components/auth/Cancel';
import Dashboard from './components/event organizer/Dashboard';
import EventOrganizerHomePage from './EventOrganizerHomePage';
import EventSponsorHomePage from './EventSponserHomePage';
import Gig from './events/Gig';
import EventPage from './events/eventPage';
import EventList from './events/EventList';
import EventForm from './events/EventForm';
import Books from './books/Books';
import Add from './books/Add';
import Update from './books/Update';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    if (role) setUserRole(role);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the user role during login
    localStorage.setItem('role', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole(null); 
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
          <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/blogs" element={<PrivateRoute element={<BlogList />} />} />
           <Route path="/blog/:blogId" element={<PrivateRoute element={<Blog />} />} />
           <Route path="/team" element={<Team />} />
           <Route path="/register" element={<Register onLogin={handleLogin} />} /> 
           <Route path="/login" element={<Login onLogin={handleLogin} />} />
           <Route path="/courses" element={<Courses />} />
           <Route path="/event/:eventid" element={<Gig />} />
           <Route path="/event-page" element={<EventPage />} />
           <Route path="/event-list" element={<EventList />} />
           <Route path="/event-form" element={<EventForm />} />
           <Route path="/course-details/:id" element={<CourseDetails />} />
           <Route path="/my-courses" element={<PrivateRoute element={<MyCourses />} />} />
           <Route path="/start-course/:id" element={<PrivateRoute element={<CourseContent />} />} />
           <Route path="/course-player/:courseId" element={<PrivateRoute element={<CoursePlayer />} />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
           <Route path="/event-organizer" element={<EventOrganizerHomePage />} />
           <Route path="/event-sponser" element={<EventSponsorHomePage />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/books" element={<Books />} />
           <Route path="/add" element={<Add />} />
           <Route path="/update" element={<Update />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
