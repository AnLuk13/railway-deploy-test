const express = require("express");
const app = express();

// Servers to redirect requests to
const servers = ["http://localhost:8080", "http://localhost:8081"];
let requestCount = 0;

// Redirect requests to a different backend each time
app.get("/", (req, res) => {
    const targetServer = servers[requestCount % servers.length];  // Alternate between 8080 & 8081
    requestCount++;
    res.redirect(targetServer);  // Redirect the client to the backend
    console.log(`🔀 Redirecting request to ${targetServer}`);
});

// Start redirect server on port 8082
const PORT = 8082;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Redirect Server running on port ${PORT}`);
});
