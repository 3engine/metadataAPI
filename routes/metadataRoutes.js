const express = require("express");
const router = express.Router();
const {
  getLootBoxTokenByID,
  getItemTokenByID,
  getKeyTokenByID,
  getAllKeys,
  getAllLootBoxes,
  getAllLootBoxInfo,
  getOneKeyInfo,
} = require("../controllers/tokenController");

router.get("/lootbox/:tokenID", getLootBoxTokenByID);
router.get("/lootbox", getAllLootBoxes);
router.get("/info/lootbox/:boxID", getAllLootBoxInfo);
router.get("/key/:tokenID", getItemTokenByID);
router.get("/key", getAllKeys);
router.get("/info/key/:boxID", getOneKeyInfo);
router.get("/item/:tokenID", getKeyTokenByID);

module.exports = router;
