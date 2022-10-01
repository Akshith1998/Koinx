const mongoose = require("mongoose");

const EthereumPriceSchema = {
  name: String,
  inr: Number,
};

const EthereumPriceModal = new mongoose.model("ethereum", EthereumPriceSchema);
module.exports = EthereumPriceModal;
