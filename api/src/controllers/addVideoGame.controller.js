const { Videogame } = require("../db");

async function addVideoGame(req, res) {
  try {
    const { name, description, platforms, release, rating, genres } = req.body;

    let url = `https://showcasegames-dev-xkqb.3.us-1.fl0.io/uploads/${req.file.filename}`;

    const newGame = await Videogame.create({
      name,
      description,
      background_image: url,
      release,
      rating,
    });
    await newGame.addGenre(genres.split(","));
    await newGame.addPlatform(platforms.split(","));
    res.status(201).send({ msg: "video game added successfully" });
  } catch (e) {
    res.status(400).json({ err: e });
  }
}

module.exports = addVideoGame;
