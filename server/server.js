require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeConnection } = require("./config/database");


const app = express();
app.use(express.json());

app.use(cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE" ],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

const authRoutes = require("./routes/authRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const courseRoutes = require("./routes/courseRoutes");
const purchasedCoursesRoutes = require("./routes/purchasedCoursesRoutes");
const storePurchaseRoutes = require("./routes/storePurchaseRoutes");
const courseContentRoutes = require("./routes/courseContentRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/auth", authRoutes); 
app.use("/checkout", checkoutRoutes);
app.use("/courses", courseRoutes);
app.use("/purchased", purchasedCoursesRoutes);
app.use("/store-purchase", storePurchaseRoutes);
app.use("/course-content", courseContentRoutes);
app.use("/events",eventRoutes);
app.use(express.json());



initializeConnection()
  .then((connection) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }) 
  .catch((err) => {
    console.error("Error initializing database connection:", err);
  });
