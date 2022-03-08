const express = require("express");
const csrv = require("csurf");
const bodyParser = require("body-parser");
const routes = express.Router();
const mid = require("./src/middlewares/globais");
const homeController = require("./src/controllers/homeController");
const matchController = require("./src/controllers/matchController");
const pannelController = require("./src/controllers/pannelController");
const leftController = require("./src/controllers/leftController");
const rightController = require("./src/controllers/rightController");

var csrfProtection = csrv({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

routes.get("/home", csrfProtection, homeController.homePage);
routes.post("/checkName", parseForm, csrfProtection, homeController.checkName);
routes.post("/tryLogin", parseForm, homeController.tryLogin);
routes.post("/tryRegister", parseForm, homeController.tryRegister);
routes.post("/matchUp", parseForm, homeController.matchUp);
routes.get("/logOut", homeController.logOut);

//------------------------------------------------------------------------------------//

routes.get("/pannel", csrfProtection, pannelController.pannel);
routes.get("/getProducts", csrfProtection, pannelController.getProducts);
routes.post("/eraseProduct", parseForm, csrfProtection, pannelController.eraseProduct);
routes.post("/saveProduct", parseForm, csrfProtection, pannelController.saveProduct);
routes.post("/checkProduct", parseForm, csrfProtection, pannelController.checkProduct);
routes.post("/saveGroup", parseForm, csrfProtection, pannelController.saveGroup);

//------------------------------------------------------------------------------------//

routes.get("/matchPannel", matchController.matchPannel);

routes.get("/left", leftController.left);
routes.post("/saveOrder", leftController.saveOrder);
routes.post("/updateOrder", leftController.updateOrder);
routes.get("/refreshKitchen", leftController.refreshKitchen);

routes.get("/right", rightController.right);
routes.get("/loadOrders", rightController.loadOrders);
routes.post("/deliverOrder", rightController.deliverOrder);

//------------------------------------------------------------------------------------//

module.exports = routes;