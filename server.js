const express = require("express");
const axios = require("axios"); // Used to fetch responses from other servers
const app = express();

const PORT = 8080;  // Keep 8080 for the main gateway

// Correct backend ports
const servers = ["http://localhost:8081", "http://localhost:8082"];  // Fix: Use correct ports
let requestCount = 0;

// Handle `/` and fetch response from `server1` or `server2`
app.get("/", async (req, res) => {
    const targetServer = servers[requestCount % servers.length]; // Alternate between services
    requestCount++;

    try {
        console.log(`🔀 Fetching response from: ${targetServer}`);
        const response = await axios.get(`${targetServer}/`);  // Fix: Use `/` instead of `/server1`
        res.send(response.data); // Return data without redirecting
    } catch (error) {
        console.error("❌ Error fetching from backend:", error.message);
        res.status(500).send("Error fetching response from backend");
    }
});

// Start the main gateway server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Gateway Server running on port ${PORT}`);
});
