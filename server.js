const path = require("path");
const csrv = require("csurf");
const helmet = require("helmet");
const flash = require("connect-flash");
const session = require("express-session");
const mongoSeshGetter = require("connect-mongo");

const express = require("express");
const app = express();
const routes = require("./routes");
const middlewares = require("./src/middlewares/globais");

const mongoose = require("mongoose");

const connStr = "mongodb+srv://jvictor96:sidarta96@cluster0.egdsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(connStr).then(() => { app.emit("conectado"); console.log("conectado") });

app.on("conectado", () => {
    app.listen(3000, () => { console.log("escutando na 3000") });
    startAllTheRest();
});


function startAllTheRest() {
    app.use(
        express.urlencoded({
            extended: true
        })
    );

    const sessionOptions = session({
        secret: "jvius987361!@#$VSS!@#!@523523!@#!fsdfsa1@W",
        store: mongoSeshGetter.create({
            mongoUrl: connStr
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        }
    })
    app.use(sessionOptions);
    app.use(csrv());
    app.use(flash());

    app.use(middlewares.csrvMiddleware);
    app.use(middlewares.sessionMiddleware);
    app.use(middlewares.flashMsgsMiddleware);

    app.set("views", path.resolve(__dirname, "src", "views"));
    app.set("view engine", "ejs");
    app.use(express.static("./public"))

    app.use(routes);
}