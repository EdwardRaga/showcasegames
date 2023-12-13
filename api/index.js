//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  saveApiDataGenres,
  saveApiDataPlatforms,
} = require("./src/controllers/saveApiData.controller");
const { fetchVideogames } = require("./src/controllers/getAllGames.controller");
require("dotenv").config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    await fetchVideogames();
    conn.sync({ force: true }).then(() => {
      saveApiDataGenres();
      saveApiDataPlatforms();
      server.listen(port, () => {
        console.log("server listening at " + port); // eslint-disable-line no-console
      });
    });
  } catch (err) {
    console.log(err);
  }
}

main();
