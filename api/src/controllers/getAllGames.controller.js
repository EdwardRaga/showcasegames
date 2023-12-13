require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

let videogames = [];

const fetchVideogames = async () => {
  try {
    const pageSize = 40;
    const pages = Math.ceil(100 / pageSize);
    for (let page = 1; page <= pages; page++) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
      );
      const games = response.data.results.map((data) => {
        const {
          id,
          name,
          description,
          platforms,
          background_image,
          released,
          rating,
          genres,
        } = data;
        const game = {
          id,
          name,
          background_image,
          genres,
          rating,
        };
        return game;
      });
      videogames = videogames.concat(games);
    }
    videogames = videogames.slice(0, 100);
    console.log("Videogames loaded successfully", videogames.length);
  } catch (e) {
    console.log("Error loading videogames:", e);
  }
};

const getAllGames = async (req, res) => {
  try {
    const videoGamesdb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["id", "name", "image_background"],
        through: {
          attributes: [],
        },
      },
    });
    const games = videogames.concat(videoGamesdb);

    console.log(games.length);
    res.status(200).json(games);
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
};

module.exports = {
  getAllGames,
  fetchVideogames,
  videogames: () => videogames,
};
