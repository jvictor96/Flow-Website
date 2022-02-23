const [usuario, grupo] = require("../models/usuario");
const [pedido, categoria, produto, detalhe] = require("../models/pedido");

exports.left = async (req, res) => {
    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            res.render("left");
        } else {
            res.redirect("/");
        }
    }
}

exports.refreshKitchen = async (req, res) => {
    let inputs = req.query;
    pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            await pedido.find({ grupo: req.session.grupo[0].nome, estado: inputs.s }).then((dados) => { pesquisa = dados });
            res.send(pesquisa);
        } else {
            res.send("Erro");
        }
    }
}

exports.saveOrder = async (req, res) => {
    let inputs = req.body;
    let pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            pedido.create({ grupo: req.session.grupo[0].nome, pedido: inputs.produtos, mesa: 1, estado: 0 });
            res.send("OK");
        } else {
            res.redirect("/");
        }
    }
}

exports.updateOrder = async (req, res) => {
    let inputs = req.body;

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            inputs.state == 0 ? 
                await pedido.deleteOne({ _id: inputs.id })
            :
                await pedido.updateOne({ _id: inputs.id }, { estado: 2 })
            ;
            res.send("OK");
        } else {
            res.redirect("/");
        }
    }
}