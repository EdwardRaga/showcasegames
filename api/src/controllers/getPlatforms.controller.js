const { Platform } = require("../db");

async function getPlatforms(req, res) {
  try {
    const platforms = await Platform.findAll();
    res.status(201).json(platforms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = getPlatforms;
