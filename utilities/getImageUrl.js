const { retrieveAllTemplates } = require("../models/templates_model");

async function getImageUrl(card) {
  console.log(card, "card");
  const allTemplates = await retrieveAllTemplates();
  const correctTemplate = allTemplates.find((template) => {
    return template.id === card.pages[0].templateId;
  });
  return correctTemplate;
}

module.exports = { getImageUrl };
