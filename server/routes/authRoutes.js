const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/protected", authenticateToken, authController.protected);
router.get("/user-role", authenticateToken, authController.getUserRole);
router.get("/user-data", authenticateToken, authController.getUserData);
router.get("/user-events", authenticateToken, authController.getUserEvents);


module.exports = router;
