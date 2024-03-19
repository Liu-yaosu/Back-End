const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./src/router");

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.get("/", (req, res) => {
//   res.send("Homepagee");
// });
app.listen(process.env.PORT, () => {
  console.log("Server is Running on http://localhost:3000");
});
