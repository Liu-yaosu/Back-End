const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
  res.json("Hello Anjing");
});
module.exports = router;
