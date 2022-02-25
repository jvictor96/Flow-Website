let action = "";
let nivel = 0;
let niveis = ["Categorias", "Produtos", "Detalhes", "Detalhe"];
let categoria = "";
let produto = "";
let detalhe = "";
let produtoOK = false;
let editando = false;
let produtos = [];
let dicionario = {};

carregarProdutos();
escolherProdutos();
function escolherProdutos() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "bold";
    document.querySelector(".escolhaConfig").style.fontWeight = "normal";
    document.querySelector(".escolhaStats").style.fontWeight = "normal";

    document.querySelector(".config").setAttribute("hidden", "");
    document.querySelector(".produtosBox").removeAttribute("hidden");
    document.querySelector(".produtosBox").style.display = "grid";
    document.querySelector(".stats").setAttribute("hidden", "");
    action = "produtos";
}

function escolherConfig() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "normal";
    document.querySelector(".escolhaConfig").style.fontWeight = "bold";
    document.querySelector(".escolhaStats").style.fontWeight = "normal";

    document.querySelector(".config").removeAttribute("hidden");
    document.querySelector(".produtosBox").setAttribute("hidden", "");
    document.querySelector(".produtosBox").style.display = "";
    document.querySelector(".stats").setAttribute("hidden", "");

    document.querySelector(".criticaGrupo").innerHTML = "";
    action = "cadastro";
}

function escolherStats() {
    document.querySelector(".escolhaProdutos").style.fontWeight = "normal";
    document.querySelector(".escolhaConfig").style.fontWeight = "normal";
    document.querySelector(".escolhaStats").style.fontWeight = "bold";

    document.querySelector(".config").setAttribute("hidden", "");
    document.querySelector(".produtosBox").setAttribute("hidden", "");
    document.querySelector(".produtosBox").style.display = "";
    document.querySelector(".stats").removeAttribute("hidden");
    action = "stats";
}

function proximoNivel(cat) {
    nivel++;
    if (nivel == 1) {
        categoria = cat;
    }
    if (nivel == 2) {
        produto = cat;
    }
    if (nivel == 3) {
        detalhe = cat;
    }
    document.querySelector(".nivel").innerHTML = cat;
    document.querySelector(".submenu").removeAttribute("hidden");
    carregarProdutos();
}

function nivelAnterior() {
    nivel--;
    if (nivel == 0) {
        document.querySelector(".nivel").innerHTML = "Categorias";
        document.querySelector(".submenu").setAttribute("hidden","");
    }
    if (nivel == 1) {
        document.querySelector(".nivel").innerHTML = categoria;
    }
    if (nivel == 2) {
        document.querySelector(".nivel").innerHTML = produto;
    }
    carregarProdutos();
}

function editar() {
    document.querySelector(".campoPreco").value = "";
    if (detalhe != "") {
        document.querySelector(".campoProduto").value = detalhe;
        typeof dicionario[detalhe] !== "undefined" ? document.querySelector(".campoPreco").value = dicionario[detalhe] : null;
    } else if (produto != "") {
        document.querySelector(".campoProduto").value = produto;
        typeof dicionario[produto] !== "undefined" ? document.querySelector(".campoPreco").value = dicionario[produto] : null;
    } else {
        document.querySelector(".campoProduto").value = categoria;
    }
    document.querySelector(".campoProduto").setAttribute("readonly", "");
    document.querySelector(".itemPopUp").removeAttribute("hidden");
    editando = true;
    produtoOK = true;
}

function abreJanela() {
    document.querySelector(".campoProduto").value = "";
    document.querySelector(".campoPreco").value = "";
    document.querySelector(".campoProduto").removeAttribute("readonly");
    document.querySelector(".itemPopUp").removeAttribute("hidden");
    editando = false;
    produtoOK = false;
}

function fechaJanela() {
    document.querySelector(".criticaProduto").removeAttribute("hidden");
    document.querySelector(".itemPopUp").setAttribute("hidden","");
}