const { retrieveAllTemplates } = require("../models/templates_model");

async function getImageUrl(card) {
  const allTemplates = await retrieveAllTemplates();
  const correctTemplate = allTemplates.find((template) => {
    return template.id === card.pages[0].templateId;
  });

  return correctTemplate.getImageUrl;
}

module.exports = { getImageUrl };
