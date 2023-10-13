const express = require("express");
const router = express.Router();
const {
  getlootBoxTokenByID,
  getItemTokenByID,
  getKeyTokenByID,
} = require("../controllers/tokenController");

router.get("/lootbox/:tokenID", getlootBoxTokenByID);
router.get("/key/:tokenID", getItemTokenByID);
router.get("/item/:tokenID", getKeyTokenByID);

module.exports = router;
