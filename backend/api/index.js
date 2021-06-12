const express = require("express");

const app = express();

app.get("/ping", (req, res) => {
  res.json({
    ping: "pong",
  });
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});
