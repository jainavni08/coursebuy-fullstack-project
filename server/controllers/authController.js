const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { initializeConnection } = require("../config/database");

// Load environment variables
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;

// Registration handler with role
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // Role is expected from the request
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await initializeConnection();
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    await connection.query(sql, [username, email, hashedPassword, role]); // Role added to query

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Error registering user");
  }
};

// Login handler with role in JWT
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const connection = await initializeConnection();
    const sql = "SELECT * FROM sponserhub.users WHERE username = ?";
    const [results] = await connection.query(sql, [username]);

    if (results.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate JWT and refresh tokens
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: "24h" });
    const refreshToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, refreshSecretKey);

    // Store the refresh token in the database
    const updateTokenSql = "UPDATE sponserhub.users SET refresh_token = ? WHERE id = ?";
    await connection.query(updateTokenSql, [refreshToken, user.id]);

    // Return token, refreshToken, and user details to the frontend
    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error logging in");
  }
};

// Token refresh handler
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecretKey);
    const connection = await initializeConnection();
    const sql = "SELECT * FROM sponserhub.users WHERE id = ? AND refresh_token = ?";
    const [results] = await connection.query(sql, [decoded.id, refreshToken]);

    if (results.length === 0) {
      return res.status(403).send("Invalid refresh token");
    }

    const user = results[0];
    const newToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: "24h" });

    res.json({ token: newToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(403).send("Invalid refresh token");
  }
};

// Protected route example
exports.protected = (req, res) => {
  const { username, role } = req.user; // Role is included in the token
  res.send(`Welcome ${username}! Your role is ${role}. This is a protected route.`);
};

// Fetch user role for authenticated users
exports.getUserRole = async (req, res) => {
  const userId = req.user.id; // Assumes that the user is authenticated and the token middleware attaches user info
  const connection = await initializeConnection();

  try {
    const sql = "SELECT role FROM sponserhub.users WHERE id = ?";
    const [results] = await connection.query(sql, [userId]);

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const { role } = results[0];
    res.json({ role });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send("Error fetching user role");
  }
};

exports.getUserData = async (req, res) => {
  const userId = req.user.id; // Assumes that the user is authenticated and the token middleware attaches user info

  try {
    const connection = await initializeConnection();
    const sql = "SELECT id, username, email, role FROM sponserhub.users WHERE id = ?";
    const [results] = await connection.query(sql, [userId]);

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json({
      id: results[0].id,
      username: results[0].username,
      email: results[0].email,
      role: results[0].role,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Error fetching user data");
  }
};

exports.getUserEvents = async (req, res) => {
  const userId = req.user.id; // assuming `req.user` is populated by your `authenticateToken` middleware

  try {
    const connection = await initializeConnection();
    const sql = "SELECT * FROM sponserhub.events e join sponserhub.users u on e.organizerid = u.id and u.id = ?"; // assuming `createdBy` is the column storing the user ID who created the event
    const [results] = await connection.query(sql, [userId]);

    res.json({ events: results });
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).send("Error fetching user events");
  }
};




