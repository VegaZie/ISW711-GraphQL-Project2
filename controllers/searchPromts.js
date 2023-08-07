const Promt = require("../models/promtModel.js");

const searchPromptsByName = async ({ user_id, name }) => {
  try {
    const prompts = await Promt.find({
      userID: user_id,
      name: { $regex: name, $options: "i" },
    });
    return prompts;
  } catch (err) {
    throw new Error("Hubo un error al buscar el promt por nombre");
  }
};

const searchPromptsByTags = async ({ user_id, tags }) => {
  try {
    const prompts = await Promt.find({ userID: user_id, tags: { $in: tags } });
    return prompts;
  } catch (err) {
    throw new Error("Hubo un error al buscar el promt por tags");
  }
};

module.exports = { searchPromptsByName, searchPromptsByTags };
