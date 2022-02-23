const [usuario, grupo] = require("../models/usuario");
const [pedidos, categoria, produto, detalhe] = require("../models/pedido");

exports.new = async (req, res, next) => {
    grupo.create({
        nome: req.query.nome,
        senha: req.query.senha,
    });

    next();
}

exports.pannel = async (req, res) => {
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

exports.getProducts = async (req, res) => {
    let pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            if (req.query.tipo == "Categorias") {
                await categoria.find({ dono: req.session.grupo[0].dono }).then((dados) => { pesquisa = dados });
            } else if (req.query.tipo == "Produtos") {
                await produto.find({ dono: req.session.grupo[0].dono }).then((dados) => { pesquisa = dados });
            } else if (req.query.tipo == "Detalhes") {
                await detalhe.find({ dono: req.session.grupo[0].dono }).then((dados) => { pesquisa = dados });
            }
            res.send(pesquisa);
        } else {
            res.redirect("/");
        }
    }
}

exports.eraseProduct = async (req, res) => {
    let inputs = req.body;

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            if (inputs.produto == "") {
                await categoria.deleteOne(
                    { dono: req.session.usuario[0].login, rotulo: inputs.categoria }
                )
            } else if(inputs.detalhe == "") {
                await produto.deleteOne(
                    { dono: req.session.usuario[0].login, categoria: inputs.categoria, rotulo: inputs.produto }
                )
            } else {
                await detalhe.deleteOne(
                    { dono: req.session.usuario[0].login, produto: inputs.produto, rotulo: inputs.detalhe }
                )
            }
            res.send("OK");
        } else {
            res.send("Erro");
        }
    }
}

exports.checkProduct = async (req, res) => {
    let inputs = req.body;
    pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            if (inputs.produto == "") {
                await categoria.find({
                    dono: req.session.usuario[0].login, rotulo: inputs.categoria
                }).then((dados) => { pesquisa = dados; });
            } else if (inputs.detalhe == "") {
                await produto.find({
                    dono: req.session.usuario[0].login, rotulo: inputs.produto
                }).then((dados) => { pesquisa = dados; });
            } else {
                await detalhe.find({
                    dono: req.session.usuario[0].login, rotulo: inputs.detalhe
                }).then((dados) => { pesquisa = dados; });
            }
            pesquisa.length == 0 ? res.send("OK") : res.send("DUPLICIDADE");
        } else {
            res.send("Erro");
        }
    }
}

exports.saveProduct = async (req, res) => {
    let inputs = req.body;
    pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            if (inputs.editando == "false") {
                if (inputs.produto == "") {
                    await categoria.create({ dono: req.session.usuario[0].login, rotulo: inputs.categoria });
                } else if (inputs.detalhe == "") {
                    await produto.create({ dono: req.session.usuario[0].login, categoria: inputs.categoria, rotulo: inputs.produto, preco: inputs.preco });
                } else {
                    await detalhe.create({ dono: req.session.usuario[0].login, produto: inputs.produto, rotulo: inputs.detalhe, preco: inputs.preco });
                }
            } else {
                if (inputs.produto == "") {
                    await categoria.updateOne(
                        { dono: req.session.usuario[0].login, rotulo: inputs.categoria },
                        { dono: req.session.usuario[0].login, rotulo: inputs.categoria }
                    );
                } else if (inputs.detalhe == "") {
                    await produto.updateOne(
                        { dono: req.session.usuario[0].login, rotulo: inputs.produto },
                        { preco: inputs.preco }
                    );
                } else {
                    await detalhe.updateOne(
                        { dono: req.session.usuario[0].login, rotulo: inputs.detalhe },
                        { preco: inputs.preco }
                    );
                }
            }
            res.send("OK");
        } else {
            res.send("Erro");
        }
    }
}

exports.saveGroup = async (req, res) => {
    let inputs = req.body;
    let pesquisa = [];

    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            await grupo.find({ dono: req.session.usuario[0].login }).then((dados) => { pesquisa = dados; });
            if (pesquisa.length == 0) {
                await grupo.create(
                    { dono: req.session.usuario[0].login, nome: inputs.nome, senha: inputs.senha }
                )
                res.send("OK");
            } else {
                await grupo.update(
                    { dono: req.session.usuario[0].login }, { nome: inputs.nome, senha: inputs.senha }
                )
                res.send("OK");
            }
        } else {
            res.redirect("/");
        }
    }
}