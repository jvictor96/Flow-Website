const [usuario, grupo] = require("../models/usuario");

exports.homePage = (req, res) => {
    if (typeof req.session === "undefined") {
        res.render("home");
    } else {
        if ("usuario" in req.session) {
            req.session.usuario.tipo == "gerente" ?
                res.redirect("/pannel") :
                res.redirect("/matchPannel");
        } else {
            res.render("home");
        }
    }
}

exports.checkName = async (req, res) => {
    const inputs = req.body;
    let pesquisa = [];


    await usuario.find({ login: inputs.login }).then((dados) => { pesquisa = dados });

    if (pesquisa.length == 0) {
        res.send("OK");
    } else {
        res.send("Não OK");
    }

}

exports.matchUp = async (req, res) => {
    const inputs = req.body;
    let pesquisa = [];

    await grupo.find({ nome: inputs.login, senha: inputs.senha }).then((dados) => { pesquisa = dados });

    if (pesquisa.length == 0) {
        req.flash("errors", "Não há grupo com o nome de usuário e senha fornecidos");
        res.redirect("/");
    } else {
        req.session.grupo = pesquisa;
        req.session.usuario = [{ nome: "null", lugar:"null", tipo:"convidado"}];
        req.session.save(() => {
            res.redirect("/matchPannel");
        });
    }

}

exports.tryLogin = async (req, res) => {
    const inputs = req.body;
    let pesquisa = [];

    await usuario.find({ login: inputs.login, senha: inputs.senha }).then((dados) => { pesquisa = dados });

    if (pesquisa.length == 0) {
        req.flash("errors", "Nome de usuário e senha não coincidem");
        res.redirect("/");
    } else {
        req.session.usuario = pesquisa;
        req.session.usuario.tipo = "gerente";
        await grupo.find({ dono: inputs.login }).then((dados) => { req.session.grupo = dados });
        req.session.grupo.length > 0 ? null : req.flash("errors", "Atenção, seu grupo ainda não foi criado!");
        req.session.save(() => {
            res.redirect("/pannel");
        });
    }
}

exports.logOut = async (req, res) => {
    await req.session.destroy();
    res.redirect("/");
}

exports.tryRegister = async (req, res) => {
    const inputs = req.body;

    await usuario.create({ login: inputs.login, senha: inputs.senha, sexo: inputs.sexo, nome: inputs.nome});

    res.send("OK");
}