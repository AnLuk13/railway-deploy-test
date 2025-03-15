const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;

// Gateway Route (Round-Robin Load Balancer)
const servers = ["/server1", "/server2"];
let requestCount = 0;
app.get("/", (req, res) => {
    const targetRoute = servers[requestCount % servers.length];
    requestCount++;
    
    console.log(`🔀 Redirecting / to ${targetRoute}`);
    res.redirect(targetRoute);  // Forward to either /server1 or /server2
});

// Server 1 Route
app.get("/server1", (req, res) => {
    const content = fs.readFileSync("test1.txt", "utf8");
    res.send(`<h1>Server 1 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 1`);
});

// Server 2 Route
app.get("/server2", (req, res) => {
    const content = fs.readFileSync("test2.txt", "utf8");
    res.send(`<h1>Server 2 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 2`);
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Unified Server running on port ${PORT}`);
});
