// controllers/eventController.js
const { initializeConnection } = require("../config/database");

exports.getAllEvents = async (req, res) => {
  const sql = `
    SELECT e.eventid, e.title, e.date, e.location, e.attendees, e.about, e.sponsershipdetails, e.images, u.username AS organizername
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


// eventController.js
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

exports.createEvent = async (req, res) => {
const sql = " INSERT INTO SPONSERHUB.EVENTS(`title`,`date`,`location`,`about`,`sponsershipdetails`) VALUES(?)"
 const values = [
  req.body.title,
  req.body.date,
  req.body.location,
  req.body.about,
  req.body.sponsershipdetails
 ];
 
  try {
    const connection = await initializeConnection();
    await connection.query(sql, [values],(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
    });
    console.log("Event created successfully.");
    res.status(201).send("Event created successfully.");
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).send("Error creating event.");
  }
};
