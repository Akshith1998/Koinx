const express = require("express");
const router = express.Router();
const TransactionModal = require("../Modals/TransactionsModal");

router.get("/", (req, res) => {
  let query = req.query.address; //pass address as query parameter for get request
  TransactionModal.find({ address: query })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/", (req, res) => {
  //data is received from frontend as an object containing address and array of objects containing transactions
  TransactionModal.find({ contact: req.body.result.contractAddress }).then(
    (isUserExist) => {
      TransactionModal.updateOne(
        //update the transaction model according to address as index
        { address: req.body.result.contractAddress },
        { $push: { result: req.body.result } },
        { upsert: true }
      )
        .then(() => {
          res.status(200).send("transaction updated");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  );
});

module.exports = router;
