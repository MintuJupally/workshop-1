const express = require("express");
const app = express();

const userRouter = require("./userRoutes");

app.use(express.json());

app.use("/api/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("Could not find the requested route on the server");
});

app.use((err, req, res) => {
  console.error(err);

  if (process.env.NODE_ENV === "development") {
    res.status(err.status || err.statusCode || 500).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
});

module.exports = app;
