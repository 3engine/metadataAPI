const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
  lootBoxID: { type: Number, required: true, unique: true },
  price: { type: Number, required: true },
  uri: { type: String, required: true },
  supply: { type: Number, default: 0 },
});

const Key = mongoose.model("Key", keySchema);
module.exports = Key;
