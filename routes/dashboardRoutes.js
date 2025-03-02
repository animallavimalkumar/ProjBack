const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");

const router = express.Router();

// Route to fetch dashboard analytics
router.get("/", getDashboardStats);

module.exports = router;
