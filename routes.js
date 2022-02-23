const express = require("express");
const routes = express.Router();
const mid = require("./src/middlewares/globais");
const homeController = require("./src/controllers/homeController");
const matchController = require("./src/controllers/matchController");
const pannelController = require("./src/controllers/pannelController");
const leftController = require("./src/controllers/leftController");
const rightController = require("./src/controllers/rightController");

routes.get("/", homeController.homePage);
routes.get("/getCsrf", mid.getCsrf);
routes.post("/checkName", homeController.checkName);
routes.post("/tryLogin", homeController.tryLogin);
routes.post("/tryRegister", homeController.tryRegister);
routes.post("/matchUp", homeController.matchUp);
routes.get("/logOut", homeController.logOut);

//------------------------------------------------------------------------------------//

routes.get("/pannel", pannelController.pannel);
routes.get("/getProducts", pannelController.getProducts);
routes.post("/eraseProduct", pannelController.eraseProduct);
routes.post("/saveProduct", pannelController.saveProduct);
routes.post("/checkProduct", pannelController.checkProduct);
routes.post("/saveGroup", pannelController.saveGroup);

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