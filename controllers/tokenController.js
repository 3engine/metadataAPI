const {
  lootBoxContract,
  itemContract,
  keyContract,
} = require("../config/web3");
const LootBox = require("../models/LootBox/lootboxModel");
const LootBoxToken = require("../models/LootBox/lootboxTokensModel");
const Item = require("../models/Item/itemModel");
const ItemToken = require("../models/Item/itemTokensModel");
const Key = require("../models/Key/keyModel");
const KeyToken = require("../models/Key/keyTokensModel");

exports.getlootBoxTokenByID = async (req, res) => {
  const tokenID = req.params.tokenID;
  try {
    const token = await LootBoxToken.findOne({ tokenID });

    if (token) {
      const lootBox = await LootBox.findById(token.lootBox);

      return res.json({
        name: lootBox.name + " #" + tokenID,
        image: lootBox.uri,
        attributes: [{ trait_type: "BoxType", value: lootBox.boxID }],
      });
    } else {
      const boxIDBigNumber  = await lootBoxContract.boxType(tokenID);
const boxIDString = boxIDBigNumber.toString();
const boxID = Number(boxIDString);
console.log("test", boxID)
      const lootBox = await LootBox.findOne({ boxID });
      if (!lootBox) {
        return res.status(404).send({ error: "LootBox not found" });
      }
      const newToken = new LootBoxToken({
        tokenID: tokenID,
        lootBox: lootBox._id,
      });
      await newToken.save();

      res.json({
        name: lootBox.name + " #" + tokenID,
        image: lootBox.uri,
        attributes: [{ trait_type: "BoxType", value: lootBox.boxID }],
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getItemTokenByID = async (req, res) => {
  const tokenID = req.params.tokenID;
  try {
    const token = await ItemToken.findOne({ tokenID: tokenID });

    if (token) {
      const item = await Item.findById(token.lootBox);

      return res.json({
        name: item.name + " #" + tokenID,
        image: item.uri,
        attributes: [{ trait_type: "itemType", value: item.itemID }],
      });
    } else {
      const itemIDBigNumber = await itemContract.tokenType(tokenID);
      const itemID = itemIDBigNumber.toNumber();
      const item = await Item.findOne({ itemID });
      if (!item) {
        return res.status(404).send({ error: "Item not found" });
      }
      const newToken = new ItemToken({
        tokenID: tokenID,
        item: item._id,
      });
      await newToken.save();

      res.json({
        name: item.name + " #" + tokenID,
        image: item.uri,
        attributes: [{ trait_type: "itemType", value: item.boxID }],
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getKeyTokenByID = async (req, res) => {
  const tokenID = req.params.tokenID;
  try {
    const token = await KeyToken.findOne({ tokenID });

    if (token) {
      const key = await Key.findById(token.lootBox);

      return res.json({
        name: key.name + " #" + tokenID,
        image: key.uri,
        attributes: [{ trait_type: "lootBox", value: key.lootBoxID }],
      });
    } else {
      const lootBoxIDBigNumber = await keyContract.keyBoxID(tokenID);
      const lootBoxID = lootBoxIDBigNumber.toNumber();
      const key = await Key.findOne({ lootBoxID });
      if (!key) {
        return res.status(404).send({ error: "Key not found" });
      }
      const newToken = new KeyToken({
        tokenID: tokenID,
        key: key._id,
      });
      await newToken.save();

      res.json({
        name: key.name + " #" + tokenID,
        image: key.uri,
        attributes: [{ trait_type: "lootBox", value: key.lootBoxID }],
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};
