var validate = require("uuid-validate");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

async function getGameDetail(req, res) {
  try {
    const params = req.params.idVideogame;

    if (validate(params, 4)) {
      const videogame = await Videogame.findByPk(params, {
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      const videogameplatforms = await Videogame.findByPk(params, {
        include: {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const { platforms } = videogameplatforms;

      const data = platforms.map((platform) => {
        return { platform: platform };
      });

      const result = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        background_image: videogame.background_image,
        release: videogame.release,
        rating: videogame.rating,
        genres: videogame.genres,
        platforms: data,
      };

      res.status(200).json(result);
    } else {
      const request = await axios.get(
        `https://api.rawg.io/api/games/${params}?key=4cb6ed0f83f040d0b51868a8195f2d12`
      );
      const {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        platforms,
        genres,
      } = request.data;
      const game = {
        id,
        name,
        description,
        released,
        rating,
        background_image,
        platforms,
        genres,
      };
      res.status(200).json(game);
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}

module.exports = getGameDetail;
