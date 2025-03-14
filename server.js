const express = require("express");
const axios = require("axios"); // Used to fetch responses from other servers
const app = express();

const PORT = 8080;

// Backend servers
const servers = ["http://localhost:8080/server1", "http://localhost:8080/server2"];
let requestCount = 0;

// Handle `/` and fetch response from `server1` or `server2`
app.get("/", async (req, res) => {
    const targetServer = servers[requestCount % servers.length]; // Alternate between servers
    requestCount++;

    try {
        const response = await axios.get(`${targetServer}`);
        res.send(response.data); // Return data without redirecting
    } catch (error) {
        res.status(500).send("Error fetching response from backend");
    }
});

// Start the main server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Gateway Server running on port ${PORT}`);
});
