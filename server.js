require("dotenv").config(); // Load .env variables
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();

const PORT = 8080;

// Use BASE_URL from environment or fallback to localhost
const BASE_URL = process.env.BASE_URL;

const servers = [`${BASE_URL}/server1`, `${BASE_URL}/server2`];
let requestCount = 0;

// Handle `/` and fetch from `/server1` or `/server2`
app.get("/", async (req, res) => {
    const targetServer = servers[requestCount % servers.length];
    requestCount++;

    try {
        console.log(`🔀 Fetching response from: ${targetServer}`);
        const response = await axios.get(targetServer);
        res.send(`<h2>Response from ${targetServer}</h2>${response.data}`);
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
