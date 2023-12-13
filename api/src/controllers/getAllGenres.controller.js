const { Genre } = require("../db");

async function getAllGenres(req, res) {
  try {
    const genres = await Genre.findAll();
    res.status(201).json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = getAllGenres;
