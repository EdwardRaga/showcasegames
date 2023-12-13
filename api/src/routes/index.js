const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js')

//controllers
const { getAllGames } = require("../controllers/getAllGames.controller");
const getAllGenres = require("../controllers/getAllGenres.controller");
const getPlatforms = require("../controllers/getPlatforms.controller");
const addVideoGame = require("../controllers/addVideoGame.controller");
const getGameDetail = require("../controllers/getGameDetail.controller");
const searchGame = require("../controllers/searchGame.controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getAllGames);
router.get("/genres", getAllGenres);
router.get("/platforms", getPlatforms);
router.post("/videogames", addVideoGame);
router.get("/videogames/:idVideogame", getGameDetail);
router.get("/videogames/games/search", searchGame);

module.exports = router;
