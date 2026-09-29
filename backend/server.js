const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");

const app = express();
const server = http.createServer(app);

// Extra Add-On: Real-time updates with Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors());
app.use(express.json());

// Attach Socket.io instance to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount API routes
app.use("/api", foodRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "online", service: "L'Atelier Culinaire API Server" });
});

io.on("connection", (socket) => {
  console.log("🔌 POS Terminal connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔌 POS Terminal disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
