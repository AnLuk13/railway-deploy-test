const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
    const content = fs.readFileSync("test.txt", "utf8");
    res.send(`<h1>File Content:</h1><pre>${content}</pre>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
