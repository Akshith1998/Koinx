const express = require("express");
const router = express.Router();
const EthereumPriceModal = require("../Modals/EthereumPrice");

router.post("/", (req, res) => {
  //data is passed as an object from frontend containing name and price
  EthereumPriceModal.find({ name: req.body.name })
    .then((isEthereum) => {
      EthereumPriceModal.updateOne(
        //update the price of ethereum
        { name: req.body.name },
        { inr: req.body.price },
        { upsert: true }
      )
        .then(() => {
          res.status(200).send("ethreum price updated");
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
