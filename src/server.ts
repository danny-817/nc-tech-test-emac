import * as express from "express";
export const app = express();

const {
  getAllCards,
  getSingleCard,
} = require("../controllers/cards_controller");

app.use(express.json());

app.set("json spaces", 2);

app.get("/cards", getAllCards);

app.get("/cards/:cardId/:sizeId?", getSingleCard);

app.use((req, res) => {
  res.status(404).send({ msg: "url not found" });
});
