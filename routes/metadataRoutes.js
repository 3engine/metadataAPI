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
  getKeyTokensByID
} = require("../controllers/tokenController");

router.get("/lootbox/:tokenID", getLootBoxTokenByID);
router.get("/multiple/lootboxes", getLootBoxTokensByID);
router.get("/lootbox", getAllLootBoxes);
router.get("/info/lootbox/:boxID", getAllLootBoxInfo);
router.get("/key/:tokenID", getItemTokenByID);
router.get("/multiple/keys", getKeyTokensByID);
router.get("/key", getAllKeys);
router.get("/info/key/:boxID", getOneKeyInfo);
router.get("/item/:tokenID", getKeyTokenByID);
router.get("/multiple/items", getItemTokensByID);

module.exports = router;
