const mongoose = require("mongoose");

const itemTokensSchema = new mongoose.Schema({
  tokenID: {
    type: String,
    required: true,
    unique: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
});

const itemTokens = mongoose.model("ItemToken", itemTokensSchema);
module.exports = itemTokens;
