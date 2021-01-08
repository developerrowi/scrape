const express = require("express");
const router = express.Router();
const saveJson = require("../saveFile/saveJson");

router.get("/", async function(req, res, next) {
  const result = await saveJson(req.query);
  res.send(result);
});

module.exports = router;
