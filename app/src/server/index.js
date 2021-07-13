const express = require("express");
// const serveStatic = require("serve-static");

const app = express();

const PORT = 3001;

app.get("/form", (req, res) => {
  res.sendFile(__dirname, "..", "main.js");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/form`));

// app.use(serveStatic(__dirname, "..", "..", "public", "index.html"));
// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`http://localhost:${port}/`);
// });
