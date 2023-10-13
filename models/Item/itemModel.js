const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemID: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
