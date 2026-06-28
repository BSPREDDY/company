require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: [
        process.env.CLIENT_URL || "http://localhost:5173",
        process.env.ADMIN_URL || "http://localhost:5174",
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
    console.log('[v0] Health check requested');
    res.json({ 
        message: "Bhavana Technology API Running",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    console.log('[v0] Health check requested');
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin/auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin/contacts", require("./routes/adminContactRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log("");
    console.log("================================");
    console.log("  Bhavana Technology API Server");
    console.log("================================");
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ CORS enabled for:`);
    console.log(`  - Client: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`  - Admin: ${process.env.ADMIN_URL || 'http://localhost:5174'}`);
    console.log(`✓ Database: ${process.env.MONGODB_URI || process.env.MONGO_URI || 'Not configured'}`);
    console.log("");
    console.log("Available Endpoints:");
    console.log("  GET  http://localhost:5000/");
    console.log("  GET  http://localhost:5000/health");
    console.log("  POST http://localhost:5000/api/admin/auth/register");
    console.log("  POST http://localhost:5000/api/admin/auth/login");
    console.log("  GET  http://localhost:5000/api/admin/auth/verify");
    console.log("  POST http://localhost:5000/api/contact");
    console.log("================================");
    console.log("");
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully...");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
