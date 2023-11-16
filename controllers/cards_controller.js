const express = require("express");

const { retrieveAllCards } = require("../models/cards_model");
const { retrieveAllTemplates } = require("../models/templates_model");
//const { getImageUrl } = require("../utilities/getImageUrl");

async function getAllCards(req, res, next) {
  try {
    const allCards = await retrieveAllCards();
    const allTemplates = await retrieveAllTemplates();
    const responseObject = allCards.map((card) => {
      const correctTemplate = allTemplates.find((template) => {
        return template.id === card.pages[0].templateId;
      });

      return {
        title: card.title,
        imageUrl: correctTemplate.imageUrl,
        card_id: card.id,
      };
    });

    res.status(200).send(responseObject);
  } catch (error) {
    next(error);
  }
}

async function getSingleCard(req, res, next) {
  try {
    const cardId = req.params.cardId;
    const cardIdRegex = /^card\d{3}$/;
    const cardIdCheck = cardIdRegex.test(cardId);
    if (!cardIdCheck) {
      res.status(400).send({ msg: "Invalid card ID" });
    }
    const allCards = await retrieveAllCards();
    const singleCard = allCards.find((card) => cardId === card.id);
    if (!singleCard) {
      res.status(404).send({ msg: "No card exists under this ID" });
    } else {
      const allTemplates = await retrieveAllTemplates();
      const correctTemplate = allTemplates.find((template) => {
        return template.id === singleCard.pages[0].templateId;
      });
      const availableSizes = singleCard.sizes.map((size) => {
        if (size === "sm") {
          return { id: "sm", title: "Small" };
        } else if (size === "md") {
          return { id: "md", title: "Medium" };
        } else if (size === "lg") {
          return { id: "lg", title: "Large" };
        } else if (size === "gt") {
          return { id: "gt", title: "Giant" };
        }
      });

      const singleCardResponse = {
        ...singleCard,
        card_id: singleCard.id,
        imageUrl: correctTemplate.imageUrl,
        base_price: singleCard.basePrice,
        availableSizes: availableSizes,
      };

      res.status(200).send(singleCardResponse);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllCards, getSingleCard };
