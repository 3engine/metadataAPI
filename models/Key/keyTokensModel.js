const mongoose = require("mongoose");

const keyTokensSchema = new mongoose.Schema({
  tokenID: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "key",
    required: true,
  },
});

const keyTokens = mongoose.model("KeyToken", keyTokensSchema);
module.exports = keyTokens;
