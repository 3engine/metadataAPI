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
  getItemTokensByID,
  getLootBoxTokensByID,
} = require("../controllers/tokenController");

router.get("/lootbox/:tokenID", getLootBoxTokenByID);
router.get("/multiple/lootboxes", getLootBoxTokensByID);
router.get("/lootbox", getAllLootBoxes);
router.get("/info/lootbox/:boxID", getAllLootBoxInfo);
router.get("/key/:tokenID", getItemTokenByID);
router.get("/multiple/keys", getItemTokensByID);
router.get("/key", getAllKeys);
router.get("/info/key/:boxID", getOneKeyInfo);
router.get("/item/:tokenID", getKeyTokenByID);

module.exports = router;
