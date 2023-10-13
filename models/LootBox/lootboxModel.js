const mongoose = require("mongoose");

const lootBoxSchema = new mongoose.Schema({
  boxID: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
  supply: { type: Number, default: 0 },
  items: [Number],
});

const LootBox = mongoose.model("LootBox", lootBoxSchema);
module.exports = LootBox;
