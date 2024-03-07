const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router");
dotenv.config();
const app = express();

app.use(cors());
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
