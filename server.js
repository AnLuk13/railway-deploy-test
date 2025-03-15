const express = require("express");
const axios = require("axios"); // Use axios to fetch data
const fs = require("fs");
const app = express();

const PORT = 8080;

// Backend routes
const servers = ["/server1", "/server2"];
let requestCount = 0;

// Handle `/` and fetch from `/server1` or `/server2`
app.get("/", async (req, res) => {
    const targetRoute = servers[requestCount % servers.length]; // Alternate between servers
    requestCount++;

    try {
        console.log(`🔀 Fetching response from: ${targetRoute}`);
        // Simulate fetching response from internal API
        const response = await axios.get(`http://localhost:${PORT}${targetRoute}`);
        
        // Add info about which server handled the request
        res.send(`<h2>Response from ${targetRoute}</h2>${response.data}`);
    } catch (error) {
        console.error("❌ Error fetching from backend:", error.message);
        res.status(500).send("Error fetching response from backend");
    }
});

// Server 1 Route
app.get("/server1", (req, res) => {
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>Server 1 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 1`);
});

// Server 2 Route
app.get("/server2", (req, res) => {
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>Server 2 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 2`);
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Unified Server running on port ${PORT}`);
});
