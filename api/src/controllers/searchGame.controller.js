require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const PAGE_SIZE = 15;
const { videogames } = require("./getAllGames.controller.js");

async function searchGame(req, res) {
  try {
    let games = videogames();
    let result = [];
    let searchGame = req.query.name;

    for (let i = 0; i < games.length && result.length < 15; i++) {
      if (games[i].name.toLowerCase().includes(searchGame.toLowerCase())) {
        result.push(games[i]);
      }
    }

    let allUpperCase = searchGame.toUpperCase();
    let lowerCase = searchGame.toLowerCase();
    let upperCase =
      allUpperCase.charAt() + lowerCase.substring(1, lowerCase.length);

    let requestDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
      },
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${lowerCase}%`,
            },
          },
          {
            name: {
              [Op.iLike]: `%${upperCase}%`,
            },
          },
        ],
      },
      limit: PAGE_SIZE,
    });
    await requestDb;
    console.log(requestDb);
    let allGames = result.concat(requestDb);

    if (allGames.length === 0) {
      throw new Error(
        "No se encontraron videojuegos con el término de búsqueda proporcionado"
      );
    } else {
      res.status(200).json(allGames);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = searchGame;
