// controllers/eventController.js
const { initializeConnection } = require("../config/database");

exports.getUserEvents = async (req, res) => {
  const userId = req.user.id; 

  const sql = `SELECT * FROM events WHERE organizerid = ?`;
  
  try {
    const connection = await initializeConnection();
    const [results] = await connection.query(sql, [userId]);

    if (results.length === 0) {
      return res.status(404).send("No events created yet.");
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching user-specific events:", error);
    res.status(500).send("Error fetching user-specific events");
  }
};

exports.getAllEvents = async (req, res) => {
  const sql = `
    SELECT e.eventid, e.title, e.date, e.location, e.attendees, e.about, e.sponsorshipdetails, e.images, u.username AS organizername
    FROM sponserhub.events e
    JOIN sponserhub.users u ON e.organizerid = u.id;
  `;

  try {
    const connection = await initializeConnection();
    const [results] = await connection.query(sql);

    if (results.length === 0) {
      console.warn("No events found.");
      return res.status(404).send("No events found");
    }

    console.log("All events fetched successfully.");
    res.json(results);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Error fetching events");
  }
};



exports.getEventById = async (req, res) => {
  const eventId = req.params.eventid; 
  const sql = "SELECT * FROM sponserhub.events e JOIN sponserhub.users u ON e.organizerid = u.id WHERE eventid = ?"; 

  try {
    const connection = await initializeConnection();
    const [results] = await connection.query(sql, [eventId]);
    if (results.length === 0) {
      res.status(404).send("Event not found");
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).send("Error fetching course details");
  }
};



exports.create = async (req, res) => { 
  try {
    const { 
      title, 
      date, 
      location, 
      attendees, 
      about, 
      sponsorshipDetails, 
      images, 
      contactDetails, 
      organizerid 
    } = req.body;

   
    if (!title || !date || !location || !attendees || !about || !sponsorshipDetails || !images || !contactDetails) {
      return res.status(400).send("Invalid input: All fields are required.");
    }

    const organizerIdInt = parseInt(organizerid, 10);

   
    const connection = await initializeConnection();
  
    const sql = `
      INSERT INTO events 
      (title, date, location, attendees, about, sponsorshipDetails, images, contactDetails, organizerid) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await connection.query(sql, [
      title, 
      date, 
      location, 
      attendees, 
      about, 
      sponsorshipDetails, 
      images, 
      contactDetails, 
      organizerIdInt
    ]);

    
    res.status(201).send("Event created successfully");
  } catch (error) {
    console.error("Error during creation:", error);
    res.status(500).send("Error creating event");
  }
};





exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventid; // Get event ID from URL params
  const updates = req.body; // Get the updated fields from the request body

  if (Object.keys(updates).length === 0) {
    return res.status(400).send("No fields to update");
  }

  // Build the SET part of the query dynamically based on provided fields
  const updateFields = [];
  const values = [];

  Object.keys(updates).forEach((field) => {
    updateFields.push(`${field} = ?`);
    values.push(updates[field]);
  });

  // Append the eventId to the values array for the WHERE clause
  values.push(eventId);

  // Construct the SQL query
  const sqlQuery = `UPDATE sponserhub.events SET ${updateFields.join(', ')} WHERE eventid = ?`;

  try {
    const connection = await initializeConnection();
    const [result] = await connection.query(sqlQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).send("Event not found");
    }

    console.log("Event updated successfully.");
    res.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send("Error updating event");
  }
};

// eventController.js
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventid;  // Get the eventId from the URL parameters

  const sql = `DELETE FROM sponserhub.events WHERE eventid = ?`;

  try {
    const connection = await initializeConnection();
    const [result] = await connection.query(sql, [eventId]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Event not found");
    }

    res.status(200).send("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Error deleting event");
  }
};
