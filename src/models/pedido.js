const mongoose = require("mongoose");

const esquema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        hora: { type: Date, required: true },
        pego: { type: Date, required: false },
        entregue: { type: Date, required: false },
        obs: { type: String, required: false }
    }
);

const pedido = new mongoose.model("pedido", esquema);

module.exports = pedido;