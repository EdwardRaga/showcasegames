const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        sslmode: "require",
      },
    },
  }
);
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Videogame, Genre, Platform } = sequelize.models;

//relación muchos a muchos entre juegos y géneros
Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

//relación N:N entre juegos y plataformas
Videogame.belongsToMany(Platform, { through: "videogame_platforms" });
Platform.belongsToMany(Videogame, { through: "videogame_platforms" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
