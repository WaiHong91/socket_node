const WebSocket = require("ws");
const os = require("os");

const port = process.argv[2] ? parseInt(process.argv[2]) : 8080;

const wss = new WebSocket.Server({ port }, () => {
  const localIP = getLocalIP();
  console.log(`WebSocket server started on ws://${localIP}:${port}`);
});

wss.on("connection", (ws) => {
  console.log("Client connected: ", ws._socket.remoteAddress);

  ws.send("Welcome to the Node WebSocket server!");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    ws.send(`Message acknowledged`);
  });

  ws.on("close", () => {
    console.log("Client disconnected: ", ws._socket.remoteAddress);
  });
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}
