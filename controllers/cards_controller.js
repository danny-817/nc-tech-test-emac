const express = require("express");

const { retrieveAllCards } = require("../models/cards_model");
const { retrieveAllTemplates } = require("../models/templates_model");

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
  const cardId = req.params.cardId;
  const allCards = await retrieveAllCards();
  const singleCard = allCards.find((card) => cardId === card.id);
  console.log(singleCard, "singleCard");
}

module.exports = { getAllCards, getSingleCard };
