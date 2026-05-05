let io;

exports.initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("joinQueue", (queueId) => {
      socket.join(queueId);
    });
  });
};

exports.getIO = () => io;