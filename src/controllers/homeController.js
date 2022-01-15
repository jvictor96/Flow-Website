const [usuario, grupo] = require("../models/usuario");

exports.homePage = (req, res) => {
    if (typeof req.session === "undefined") {
        res.render("home");
    } else {
        if ("usuario" in req.session) {
            res.redirect("/pannel");
        } else {
            res.render("home");
        }
    }
}

exports.checkName = async (req, res) => {
    const inputs = req.body;
    let pesquisa = [];


    await usuario.find({ nome: inputs.nome }).then((dados) => { pesquisa = dados });

    if (pesquisa.length == 0) {
        res.send("OK");
    } else {
        res.send("Não OK");
    }

}

exports.tryLogin = async (req, res) => {
    const inputs = req.body;
    let pesquisa = [];

    console.log(inputs);
    await usuario.find({ nome: inputs.nome, senha: inputs.senha }).then((dados) => { pesquisa = dados });

    if (pesquisa.length == 0) {
        req.flash("errors", "Nome de usuário e senha não coincidem");
        res.redirect("/");
    } else {
        req.session.usuario = pesquisa[0];
        req.session.save(() => {
            res.redirect("back");
        });
        console.log("a");
    }
}

exports.logOut = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

exports.tryRegister = async (req, res) => {
    const inputs = req.body;

    await usuario.create({ nome: inputs.nome, senha: inputs.senha });

    res.send("OK");
}