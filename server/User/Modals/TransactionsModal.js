const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  address: String,
  result: [
    {
      blockNumber: String,
      timeStamp: String,
      hash: String,
      nonce: String,
      blockHash: String,
      transactionIndex: String,
      from: String,
      to: String,
      value: String,
      gas: String,
      gasPrice: String,
      isError: String,
      txreceipt_status: String,
      input: String,
      contractAddress: String,
      cumulativeGasUsed: String,
      gasUsed: String,
      confirmations: String,
      methodId: String,
      functionName: String,
    },
  ],
});

const TransactionModal = mongoose.model("Transactions", TransactionSchema);
module.exports = TransactionModal;
