require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const personRoutes = require("./routes/persons");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

//routes
app.use("/api/persons/", personRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
      console.log(process.env.MONGO_URI);
    });
  })
  .catch((error) => {
    console.log(error);
  });
