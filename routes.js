const express = require("express");
const routes = express.Router();
const mid = require("./src/middlewares/globais");
const homeController = require("./src/controllers/homeController");
const flowController = require("./src/controllers/flowController");

routes.get("/", homeController.homePage);
routes.get("/getCsrf", mid.getCsrf);
routes.post("/checkName", homeController.checkName);
routes.post("/tryLogin", homeController.tryLogin);
routes.post("/tryRegister", homeController.tryRegister);
routes.get("/logOut", homeController.logOut);

//------------------------------------------------------------------------------------//

routes.get("/pannel", flowController.pannel);

//------------------------------------------------------------------------------------//

routes.get("/matchUp", flowController.matchup);

module.exports = routes;