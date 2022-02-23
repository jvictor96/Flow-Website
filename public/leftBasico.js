let action = "";
let nivel = 0;
let niveis = ["Categorias", "Produtos", "Detalhes", "Detalhe"];
let categoria = "";
let produto = "";
let detalhe = "";
let produtoOK = false;
let editando = false;
let produtos = [];
let pedido = [];
let dicionario = {};

carregarProdutos();
escolherProdutos();
function escolherPedido() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "normal";
    document.querySelector(".escolhaPedido").style.fontWeight = "bold";
    document.querySelector(".escolhaCozinha").style.fontWeight = "normal";

    document.querySelector(".pedido").removeAttribute("hidden");
    document.querySelector(".produtos").setAttribute("hidden", "");
    document.querySelector(".produtos").style.display = "";
    document.querySelector(".cozinhas").setAttribute("hidden", "");

    mostrarPedido();
}

function escolherProdutos() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "bold";
    document.querySelector(".escolhaPedido").style.fontWeight = "normal";
    document.querySelector(".escolhaCozinha").style.fontWeight = "normal";

    document.querySelector(".pedido").setAttribute("hidden", "");
    document.querySelector(".produtos").removeAttribute("hidden");
    document.querySelector(".produtos").style.display = "grid";
    document.querySelector(".cozinhas").setAttribute("hidden", "");
}

function escolherCozinha() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "normal";
    document.querySelector(".escolhaPedido").style.fontWeight = "normal";
    document.querySelector(".escolhaCozinha").style.fontWeight = "bold";

    document.querySelector(".pedido").setAttribute("hidden", "");
    document.querySelector(".produtos").setAttribute("hidden", "");
    document.querySelector(".produtos").style.display = "";
    document.querySelector(".cozinhas").removeAttribute("hidden");

    atualizarCozinha();
}

function mostrarPedido() {
    document.querySelectorAll(".compra").forEach((p) => { p.remove(); });

    let i = 0;
    for (let p of pedido) {
        let cell = document.createElement("p");
        cell.setAttribute("class", "compra");
        //cell.setAttribute("onclick", "proximoNivel('" + produto.rotulo + "')");
        //cell.setAttribute("id", "b" + i);
        //cell.setAttribute("onmouseover", "arredondar(0,'b" + i + "')");
        //cell.setAttribute("onmouseout", "restaurar('b" + i + "')");
        cell.innerHTML = p;
        document.querySelector(".pedido").appendChild(cell);
        i++;
    }
}

function proximoNivel(cat) {
    nivel++;
    if (nivel == 1) {
        categoria = cat;
    }
    if (nivel == 2) {
        produto = cat;
        document.querySelector(".escolhaAdicionar").removeAttribute("hidden");
    }
    if (nivel == 3) {
        detalhe = cat;
        document.querySelector(".escolhaAdicionar").removeAttribute("hidden");
    }
    document.querySelector(".nivel").innerHTML = cat;
    document.querySelector(".escolhaAnterior").removeAttribute("hidden");
    carregarProdutos();
}

function nivelAnterior() {
    nivel--;
    if (nivel == 0) {
        document.querySelector(".nivel").innerHTML = "Categorias";
        document.querySelector(".escolhaAnterior").setAttribute("hidden", "");
        document.querySelector(".escolhaAdicionar").setAttribute("hidden", "");
    }
    if (nivel == 1) {
        document.querySelector(".escolhaAdicionar").setAttribute("hidden", "");
        document.querySelector(".nivel").innerHTML = categoria;
    }
    if (nivel == 2) {
        document.querySelector(".nivel").innerHTML = produto;
    }
    carregarProdutos();
}

function adicionarProduto() {
    if (nivel == 2) {
        pedido.push(produto);
    }
    if (nivel == 3) {
        pedido.push(detalhe);
    }
    nivelAnterior();
}

function removerProduto(pos) {
    return pedido.filter((obj, index) => { index != pos })
}