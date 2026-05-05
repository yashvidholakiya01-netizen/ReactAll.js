require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const { initSocket } = require("./sockets/socket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/queue", require("./routes/queueRoutes"));

// socket
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});