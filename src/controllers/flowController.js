const [usuario, grupo] = require("../models/usuario");
const pedidos = require("../models/pedido");

exports.new = async (req, res, next) => {
    grupo.create({
        nome: req.query.nome,
        senha: req.query.senha,
    });

    next();
}

exports.pannel = (req, res) => {
    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            res.render("pannel");
        } else {
            res.redirect("/");
        }
    }
}

exports.matchup = (req, res) => {
    res.render("match.ejs");
}

exports.left = (req, res) => {
    res.render("left.ejs");
}

exports.right = (req, res) => {
    res.render("right.ejs");
}

exports.update = (req, res) => {
    res.send();
}

exports.post = (req, res) => {
    res.send();
}

exports.delete = (req, res) => {
    grupo.deleteOne({
        nome: req.query.nome,
        senha: req.query.senha,
    }).then(() => {
        res.redirect("/");
    });
}