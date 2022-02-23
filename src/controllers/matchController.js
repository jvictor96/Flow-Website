const [usuario, grupo] = require("../models/usuario");
const pedidos = require("../models/pedido");

exports.matchPannel = async (req, res) => {
    if (typeof req.session === "undefined") {
        res.redirect("/");
    } else {
        if ("usuario" in req.session) {
            req.session.usuario.tipo == "gerente" ?
                res.redirect("pannel") :
                res.render("matchUp.ejs");

        } else {
            res.redirect("/");
        }
    }

}