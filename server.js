const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8080;

// Route for "Server 1"
app.get("/server1", (req, res) => {
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>Server 1 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 1`);
});

// Route for "Server 2"
app.get("/server2", (req, res) => {
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>Server 2 Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by Server 2`);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
