cozinhas = [];
atualizarCozinha();

function atualizarCozinha() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            if ("Erro" != xhr.responseText) {
                let pesquisa = JSON.parse(xhr.responseText);
                cozinhas = pesquisa;
                atualizarBalcao();
            } else {
                console.log("Lamentamos, ocorreu um erro no servidor");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("GET", "http://localhost:3000/refreshKitchen?s=0", true);
    xhr.send();
}

function atualizarBalcao() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("Erro" != xhr.responseText) {
                let pesquisa = JSON.parse(xhr.responseText);
                cozinhas = cozinhas.concat(pesquisa);
                mostrarCozinha();
            } else {
                console.log("Lamentamos, ocorreu um erro no servidor");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("GET", "http://localhost:3000/refreshKitchen?s=1", true);
    xhr.send();
}

function mostrarCozinha() {
    document.querySelectorAll(".comida").forEach((p) => { p.remove(); });

    let i = 0;
    for (let p of cozinhas) {
        let cell = document.createElement("p");
        cell.setAttribute("class", "comida");
        cell.innerHTML = "Mesa " + p.mesa;
        p.itens = p.pedido.split(",")
        for (let pdd of p.itens) { cell.innerHTML += " | " + pdd; }

        let close = document.createElement("span");
        close.setAttribute("class", "label");
        if (p.estado == 0) {
            close.innerHTML = " | Apagar ";
        } else {
            close.innerHTML = " | Entregar ";
        }
        close.setAttribute("onclick", "atualizarPedido('" + p._id + "', " + p.estado + ")");
        cell.append(close);
        document.querySelector(".cozinhas").appendChild(cell);
        i++;
    }
}

function atualizarPedido(id, state) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("OK" == xhr.responseText) {
                atualizarCozinha();
            }
        }
    };


    csrf = document.querySelector("#csrf").value;
    xhr.open("POST", "http://localhost:3000/updateOrder", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&state=" + state + "&_csrf=" + csrf);
}

function salvarPedido() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("OK" == xhr.responseText) {
                pedido = [];
                mostrarPedido();
            }
        }
    };


    csrf = document.querySelector("#csrf").value;
    xhr.open("POST", "http://localhost:3000/saveOrder", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("produtos=" + pedido + "&_csrf=" + csrf);
}

function carregarProdutos() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("Erro" != xhr.responseText) {
                let pesquisa = JSON.parse(xhr.responseText);
                produtos = pesquisa;
                atualizarVisaoProdutos();
            } else {
                console.log("Erro");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("GET", "http://localhost:3000/getProducts?tipo=" + niveis[nivel], true);
    xhr.send();
}

function atualizarVisaoProdutos() {
    let pdts = [];
    document.querySelectorAll(".produto").forEach((p) => { p.remove(); });


    nivel == 0 ? categoria = "" : null;
    nivel == 1 ? produto = "" : null;
    nivel == 2 ? detalhe = "" : null;
    if (nivel == 0) {
        pdts = produtos;
    }
    if (nivel == 1) {
        pdts = produtos.filter((p) => { return p.categoria == categoria });
    }
    if (nivel == 2) {
        pdts = produtos.filter((p) => { return p.produto == produto });
    }

    let i = 0;
    for (let produto of pdts) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "produto grid-cell");
        cell.setAttribute("onclick", "proximoNivel('" + produto.rotulo + "')");
        cell.setAttribute("id", "b" + i);
        cell.setAttribute("onmouseover", "arredondar(0,'b" + i + "')");
        cell.setAttribute("onmouseout", "restaurar('b" + i + "')");
        cell.innerHTML = produto.rotulo;
        document.querySelector(".produtos").appendChild(cell);

        dicionario[produto.rotulo] = produto.preco;
        i++;
    }

}