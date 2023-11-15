import * as express from "express";
export const app = express();

const { getAllCards } = require("../controllers/cards_controller");

app.set("json spaces", 2);

app.get("/cards", getAllCards);

app.get("/cards/:cardId/:sizeId?", () => {
  // respond with card by id
});

app.use((req, res) => {
  res.status(404).send({ msg: "url not found" });
});
