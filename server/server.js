const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const TransactionController = require("./User/Routes/TransactionsRoute");
const EthereumPriceController = require("./User/Routes/EthereumPriceRoute");
const CurrentPriceController = require("./User/Routes/CurrentPrice");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    console.log(`Database is connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/transactions", TransactionController);
app.use("/ethereum", EthereumPriceController);
app.use("/price", CurrentPriceController);

app.listen(process.env.PORT || 3004, (err) => {
  if (!err) {
    console.log(`server is running at port ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});
