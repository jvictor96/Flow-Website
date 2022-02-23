const [usuario, grupo] = require("../models/usuario");
const [pedido, categoria, produto, detalhe] = require("../models/pedido");

exports.right = async (req, res) => {
    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            res.render("right");
        } else {
            res.redirect("/");
        }
    }
}


exports.loadOrders = async (req, res) => {
    let pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            await pedido.find({ grupo: req.session.grupo[0].nome, estado: 0 }).then((dados) => { pesquisa = dados });
            res.send(pesquisa);
        } else {
            res.redirect("/");
        }
    }
}


exports.deliverOrder = async (req, res) => {
    let pesquisa = [];
    let inputs = req.body;

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            await pedido.updateOne({ _id: inputs.id }, { estado: 1 });
            res.send("OK");
        } else {
            res.redirect("/");
        }
    }
}