const express = require("express");
const app = express();
const port = 3000;
const { dbConnect } = require("./config/db.Connect");
const productRouter = require("./routes/products.router");
const authRouter = require("./routes/auth.router");
app.use(express.json());

app.use("/products", productRouter);
app.use("/auth", authRouter);

const start = async () => {
  await dbConnect();
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
