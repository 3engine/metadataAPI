const mongoose = require("mongoose");

const lootBoxTokensSchema = new mongoose.Schema({
  tokenID: {
    type: String,
    required: true,
    unique: true,
  },
  lootBox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LootBox",
    required: true,
  },
});

const lootBoxTokens = mongoose.model("LootBoxToken", lootBoxTokensSchema);
module.exports = lootBoxTokens;
