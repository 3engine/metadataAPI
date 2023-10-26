const express = require("express");
const router = express.Router();
const {
  getlootBoxTokenByID,
  getItemTokenByID,
  getKeyTokenByID,
  getAllKeys,
  getAllLootBoxes,
} = require("../controllers/tokenController");

router.get("/lootbox/:tokenID", getlootBoxTokenByID);
router.get("/lootbox", getAllLootBoxes);
router.get("/key/:tokenID", getItemTokenByID);
router.get("/key", getAllKeys);
router.get("/item/:tokenID", getKeyTokenByID);

module.exports = router;
