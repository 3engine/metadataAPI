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


router.get("/lootbox", getAllLootBoxes);
router.get("/lootbox/:tokenID", getLootBoxTokenByID);
router.get("/multiple/lootboxes", getLootBoxTokensByID);
router.get("/info/lootbox/:boxID", getAllLootBoxInfo);

router.get("/item/:tokenID", getKeyTokenByID);
router.get("/multiple/items", getItemTokensByID);


router.get("/key", getAllKeys);
router.get("/key/:tokenID", getKeyTokenByID);
router.get("/multiple/keys", getKeyTokensByID);
router.get("/info/key/:boxID", getOneKeyInfo);

module.exports = router;
