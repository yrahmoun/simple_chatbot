require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ùongoose = require("mongoose");
const loginRoutes = require("./routes/loginRoutes");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("databse connected");
  })
  .catch((error) => {
    console.error(error);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is up and running on port ${port}.`);
});

app.use(loginRoutes);
