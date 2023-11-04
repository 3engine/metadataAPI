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

exports.getLootBoxTokenByID = async (req, res) => {
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
      const boxIDBigNumber = await lootBoxContract.boxType(tokenID);
      const boxIDString = boxIDBigNumber.toString();
      const boxID = Number(boxIDString);
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

exports.getAllLootBoxes = async (req, res) => {
  try {
    const lootBoxes = await LootBox.find({ supply: { $gt: 0 } });

    if (lootBoxes.length === 0) {
      return res.status(404).send({ error: "No lootboxes found" });
    }

    const allLootBoxes = await Promise.all(
      lootBoxes.map(async (lootBox) => {
        const itemIDs = lootBox.items;
        const itemDocs = await Item.find({ itemID: { $in: itemIDs } });

        return {
          boxID: lootBox.boxID,
          uri: lootBox.uri,
          name: lootBox.name,
          supply: lootBox.supply,
          items: itemDocs,
        };
      }),
    );

    res.json(allLootBoxes);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};
exports.getLootBoxTokensByID = async (req, res) => {
  let tokenIDs = req.query.tokenIDs;

  if (typeof tokenIDs === "string") {
    try {
      tokenIDs = JSON.parse(tokenIDs);
    } catch (e) {
      return res.status(400).send({ error: "Invalid tokenIDs format" });
    }
  }

  if (!Array.isArray(tokenIDs)) {
    return res.status(400).send({ error: "tokenIDs must be an array" });
  }

  try {
    let tokensData = [];

    for (const tokenID of tokenIDs) {
      const numericTokenID = Number(tokenID);
      const token = await LootBoxToken.findOne({ tokenID: numericTokenID });

      if (token) {
        const lootBox = await LootBox.findById(token.lootBox);
        tokensData.push({
          name: lootBox.name + " #" + numericTokenID,
          image: lootBox.uri,
          attributes: [{ trait_type: "BoxType", value: lootBox.boxID }],
        });
      } else {
        const boxIDBigNumber = await lootBoxContract.boxType(numericTokenID);
        const boxIDString = boxIDBigNumber.toString();
        const boxID = Number(boxIDString);
        const lootBox = await LootBox.findOne({ boxID });

        if (!lootBox) {
          tokensData.push({
            error: `LootBox not found for tokenID ${numericTokenID}`,
          });
          continue;
        }

        const newToken = new LootBoxToken({
          tokenID: numericTokenID,
          lootBox: lootBox._id,
        });
        await newToken.save();

        tokensData.push({
          name: lootBox.name + " #" + numericTokenID,
          image: lootBox.uri,
          attributes: [{ trait_type: "BoxType", value: lootBox.boxID }],
        });
      }
    }

    res.json(tokensData);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getAllLootBoxInfo = async (req, res) => {
  const boxID = req.params.boxID;
  try {
    const lootBox = await LootBox.findOne({ boxID, supply: { $gt: 0 } });

    if (!lootBox) {
      return res.status(404).send({ error: "Lootbox not found" });
    }

    const itemIDs = lootBox.items;
    const itemDocs = await Item.find({ itemID: { $in: itemIDs } });

    lootBox.items = itemDocs;
    const result = {
      boxID: lootBox.boxID,
      name: lootBox.name,
      uri: lootBox.uri,
      supply: lootBox.supply,
      items: itemDocs,
    };

    res.json(result);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getItemTokenByID = async (req, res) => {
  const tokenID = req.params.tokenID;
  try {
    const token = await ItemToken.findOne({ tokenID: tokenID });

    if (token) {
      const item = await Item.findById(token.item);

      return res.json({
        name: item.name + " #" + tokenID,
        image: item.uri,
        attributes: [{ trait_type: "itemType", value: item.itemID }],
      });
    } else {
      const itemIDBigNumber = await itemContract.tokenType(tokenID);
      const itemIDString = itemIDBigNumber.toString();
      const itemID = Number(itemIDString);

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
exports.getItemTokensByID = async (req, res) => {
  let tokenIDs = req.query.tokenIDs;

  if (typeof tokenIDs === "string") {
    try {
      tokenIDs = JSON.parse(tokenIDs);
    } catch (e) {
      return res.status(400).send({ error: "Invalid tokenIDs format" });
    }
  }

  if (!Array.isArray(tokenIDs)) {
    return res.status(400).send({ error: "tokenIDs must be an array" });
  }

  try {
    let tokensData = [];

    for (const tokenID of tokenIDs) {
      const numericTokenID = Number(tokenID);
      const token = await ItemToken.findOne({ tokenID: numericTokenID });

      if (token) {
        const item = await Item.findById(token.item);

        tokensData.push({
          name: item.name + " #" + numericTokenID,
          image: item.uri,
          attributes: [{ trait_type: "itemType", value: item.itemID }],
        });
      } else {
        const itemIDBigNumber = await itemContract.tokenType(numericTokenID);
        const itemIDString = itemIDBigNumber.toString();
        const itemID = Number(itemIDString);

        const item = await Item.findOne({ itemID });
        if (!item) {
          tokensData.push({
            error: `Item not found for tokenID ${numericTokenID}`,
          });
          continue;
        }
        const newToken = new ItemToken({
          tokenID: numericTokenID,
          item: item._id,
        });
        await newToken.save();

        tokensData.push({
          name: item.name + " #" + numericTokenID,
          image: item.uri,
          attributes: [{ trait_type: "itemType", value: item.boxID }],
        });
      }
    }
    res.json(tokensData);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getKeyTokenByID = async (req, res) => {
  const tokenID = req.params.tokenID;
  try {
    const token = await KeyToken.findOne({ tokenID });

    if (token) {
      const key = await Key.findById(token.key);

      return res.json({
        name: key.name + " #" + tokenID,
        image: key.uri,
        attributes: [{ trait_type: "lootBox", value: key.lootBoxID }],
      });
    } else {
      const lootBoxIDBigNumber = await keyContract.keyBoxID(tokenID);
      const lootBoxIDString = lootBoxIDBigNumber.toString();
      const lootBoxID = Number(lootBoxIDString);
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
exports.getKeyTokensByID = async (req, res) => {
  let tokenIDs = req.query.tokenIDs;

  if (typeof tokenIDs === 'string') {
    try {
      tokenIDs = JSON.parse(tokenIDs);
    } catch (e) {
      return res.status(400).send({ error: "Invalid tokenIDs format" });
    }
  }

  if (!Array.isArray(tokenIDs)) {
    return res.status(400).send({ error: "tokenIDs must be an array" });
  }

  try {
    let tokensData = [];

    for (const tokenID of tokenIDs) {
      const numericTokenID = Number(tokenID);
      const token = await KeyToken.findOne({ tokenID: numericTokenID });

      if (token) {
        const key = await Key.findById(token.key);

        tokensData.push({
          name: key.name + " #" + numericTokenID,
          image: key.uri,
          attributes: [{ trait_type: "lootBox", value: key.lootBoxID }],
        });
      } else {
        const lootBoxIDBigNumber = await keyContract.keyBoxID(numericTokenID);
        const lootBoxIDString = lootBoxIDBigNumber.toString();
        const lootBoxID = Number(lootBoxIDString);
        const key = await Key.findOne({ lootBoxID });

        if (!key) {
          tokensData.push({ error: `Key not found for tokenID ${numericTokenID}` });
          continue;
        }

        const newToken = new KeyToken({
          tokenID: numericTokenID,
          key: key._id,
        });
        await newToken.save();

        tokensData.push({
          name: key.name + " #" + numericTokenID,
          image: key.uri,
          attributes: [{ trait_type: "lootBox", value: key.lootBoxID }],
        });
      }
    }

    res.json(tokensData);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getAllKeys = async (req, res) => {
  try {
    const keys = await Key.aggregate([
      {
        $match: { supply: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "lootboxes",
          localField: "lootBoxID",
          foreignField: "boxID",
          as: "lootboxData",
        },
      },
      {
        $unwind: "$lootboxData",
      },
      {
        $project: {
          _id: 0,
          lootBoxID: 1,
          name: 1,
          price: 1,
          uri: 1,
          supply: 1,
          lootBoxName: "$lootboxData.name",
          lootBoxUri: "$lootboxData.uri",
          lootBoxSupply: "$lootboxData.supply",
        },
      },
    ]);

    if (keys.length === 0) {
      return res.status(404).send({ error: "No Key found" });
    }
    res.json(keys);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};

exports.getOneKeyInfo = async (req, res) => {
  const boxID = parseInt(req.params.boxID, 10);
  try {
    const key = await Key.aggregate([
      {
        $match: { lootBoxID: boxID, supply: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "lootboxes",
          localField: "lootBoxID",
          foreignField: "boxID",
          as: "lootboxData",
        },
      },
      {
        $unwind: "$lootboxData",
      },
      {
        $project: {
          _id: 0,
          lootBoxID: 1,
          name: 1,
          price: 1,
          uri: 1,
          supply: 1,
          lootBoxName: "$lootboxData.name",
          lootBoxUri: "$lootboxData.uri",
          lootBoxSupply: "$lootboxData.supply",
          items: "$lootboxData.items",
        },
      },
    ]);
    if (key.length === 0) {
      return res.status(404).send({ error: "Key not found" });
    }
    const itemIDs = key[0].items;
    const itemDocs = await Item.find({ itemID: { $in: itemIDs } });
    key[0].items = itemDocs;
    res.json(key[0]);
  } catch (error) {
    res.status(500).send({ error: "Server Error: " + error.message });
  }
};
