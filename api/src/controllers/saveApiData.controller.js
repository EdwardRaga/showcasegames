require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Platform } = require("../db");

async function saveApiDataGenres() {
  try {
    const request = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = request.data.results.map((genre) => ({
      id: genre.id,
      name: genre.name,
      image_background: genre.image_background,
    }));
    await Genre.bulkCreate(genres);
    console.log("genres added successfully");
  } catch (err) {
    console.log(err);
  }
}
async function saveApiDataPlatforms() {
  try {
    let platforms = [];
    for (let next = 1; next < 3; next++) {
      const response = await axios.get(
        `https://api.rawg.io/api/platforms?key=${API_KEY}&page=${next}`
      );
      response.data?.results.map((plarform) => {
        const { id, name } = plarform;
        const objPlatform = {
          id,
          name,
        };
        platforms.push(objPlatform);
      });
    }
    await Platform.bulkCreate(platforms);
    console.log("platforms added successfully", platforms.length);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  saveApiDataGenres,
  saveApiDataPlatforms,
};
