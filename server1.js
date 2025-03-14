const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 8081;
const INSTANCE_NAME = "Server 1";

app.get("/", (req, res) => {  // Must listen on `/`, not `/server1`
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>${INSTANCE_NAME} Response</h1><pre>${content}</pre>`);
    console.log(`✅ Request handled by ${INSTANCE_NAME}`);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 ${INSTANCE_NAME} running on port ${PORT}`);
});
