const mongoose = require("mongoose");

const member = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        grupo: { type: String, required: true },
        entrada: { type: String, required: true },
        saida: { type: String, required: true },
    }
);

const membro = new mongoose.model("usuario", member);

module.exports = [member];