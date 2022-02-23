const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        login: { type: String, required: true },
        senha: { type: String, required: true },
        nome: { type: String, required: true },
        sexo: { type: String, required: true },
    }
);

const group = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        senha: { type: String, required: true },
        dono: { type: String, required: true },
        ultimaPegada: { type: String, required: false }
    }
);

const usuario = new mongoose.model("usuario", user);
const grupo = new mongoose.model("grupo", group);

module.exports = [usuario, grupo];