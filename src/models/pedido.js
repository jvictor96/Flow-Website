const mongoose = require("mongoose");

const order = new mongoose.Schema(
    {
        mesa: { type: Number, required: true },
        pedido: { type: Object, required: true },
        grupo: { type: String, required: true },
        estado: { type: Number, required: true },
    }
);

const cat = new mongoose.Schema(
    {
        rotulo: { type: String, required: true },
        dono: { type: String, required: true },
    }
);

const product = new mongoose.Schema(
    {
        rotulo: { type: String, required: true },
        preco: { type: Number, required: false },
        categoria: { type: String, required: true },
        dono: { type: String, required: true },
    }
);

const detail = new mongoose.Schema(
    {
        rotulo: { type: String, required: true },
        preco: { type: Number, required: false },
        produto: { type: String, required: true },
        dono: { type: String, required: true },
    }
);

const pedido = new mongoose.model("pedido", order);
const categoria = new mongoose.model("categoria", cat);
const produto = new mongoose.model("produto", product);
const detalhe = new mongoose.model("detalhe", detail);

module.exports = [pedido, categoria, produto, detalhe];