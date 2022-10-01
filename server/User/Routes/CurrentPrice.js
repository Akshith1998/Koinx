const express = require("express");
const router = express.Router();
const TransactionModal = require("../Modals/TransactionsModal");
const EthereumPriceModal = require("../Modals/EthereumPrice");

router.get("/", (req, res) => {
  const query = req.query.address;
  let currentBalance = 0;
  TransactionModal.find({ address: query })
    .then((data) => {
      //iterate through the result array for calculating currentBalance
      data[0].result.forEach((transaction) => {
        if (transaction.to === query) {
          currentBalance += Number(transaction.value);
        } else if (transaction.from === query) {
          currentBalance -= Number(transaction.value);
        }
      });
      EthereumPriceModal.find({ name: "ethereum" })
        .then((price) => {
          //send currentBalance and the ethereum price as an object to frontend
          res.status(200).send({
            currentBalance: currentBalance,
            ethereumPrice: price[0].inr,
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
