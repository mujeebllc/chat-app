import express from "express";
import mongoose from "mongoose";
import { pubClient } from "../lib/socket.js";

const router = express.Router();

// Liveness probe
router.get("/liveness", (req, res) => {
  res.status(200).json({ status: "alive", timestamp: new Date().toISOString() });
});

// Readiness probe
router.get("/readiness", (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1;
    const redisStatus = pubClient.isOpen;
    
    if (dbStatus && redisStatus) {
      res.status(200).json({
        status: "ready",
        database: "connected",
        redis: "connected"
      });
    } else {
      res.status(503).json({
        status: "not ready",
        database: dbStatus ? "connected" : "disconnected",
        redis: redisStatus ? "connected" : "disconnected"
      });
    }
  } catch (error) {
    res.status(503).json({
      status: "error",
      error: error.message
    });
  }
});

// Keep original / health endpoint routing to readiness
router.get("/", (req, res) => {
  res.redirect("/health/readiness");
});

export default router; 