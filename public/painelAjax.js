function checkGroup() {
    document.querySelector(".criticaGrupo").innerHTML = "";
}

function salvarGrupo() {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("OK" == xhr.responseText) {
                    document.querySelector(".criticaGrupo").innerHTML = "O grupo foi salvo com sucesso";
                }  else {
                    document.querySelector(".criticaGrupo").innerHTML = "Ops, ocorreu um erro no servidor";
                }
            }
        };

        nome = document.querySelector(".campoNome").value;
        senha = document.querySelector(".campoSenha").value;
        csrf = document.querySelector("#csrf").value;
        xhr.open("POST", "http://localhost:3000/saveGroup", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("nome=" + nome + "&senha=" + senha + "&_csrf=" + csrf);
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
        cell.setAttribute("id", "b"+i);
        cell.setAttribute("onmouseover", "arredondar(0,'b" + i + "')");
        cell.setAttribute("onmouseout", "restaurar('b" + i + "')");
        cell.innerHTML = produto.rotulo;
        document.querySelector(".produtosBox").appendChild(cell);

        dicionario[produto.rotulo] = produto.preco;
        i++;
    }

}

function apagarProduto() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("OK" == xhr.responseText) {
                console.log("Sucesso");
                nivelAnterior();
            } else {
                console.log("Lamentamos, ocorreu um erro no servidor");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("POST", "http://localhost:3000/eraseProduct", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("categoria=" + categoria + "&produto=" + produto + "&detalhe=" + detalhe + "&_csrf=" + csrf);
}

function gravarProduto() {
    if (produtoOK) {
        let xhr = new XMLHttpRequest();
        if (!editando) {
            nivel == 0 ? categoria = document.querySelector(".campoProduto").value : null;
            nivel == 1 ? produto = document.querySelector(".campoProduto").value : null;
            nivel == 2 ? detalhe = document.querySelector(".campoProduto").value : null;
        }

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("OK" == xhr.responseText) {
                    console.log("Sucesso");
                    fechaJanela();
                    editando ? nivelAnterior() : carregarProdutos();
                    produtoOK = false;
                } else {
                    document.querySelector(".criticaProduto").innerHTML = "Lamentamos, ocorreu um erro no servidor";
                }
            }
        };

        csrf = document.querySelector("#csrf").value;
        preco = document.querySelector(".campoPreco").value.replace(",", ".");
        xhr.open("POST", "http://localhost:3000/saveProduct", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("categoria=" + categoria + "&produto=" + produto + "&detalhe=" + detalhe + "&preco=" + preco + "&editando=" + editando + "&_csrf=" + csrf);
    }
}

function checkProduct() {
    if (!editando) {
        let xhr = new XMLHttpRequest();
        nivel == 0 ? categoria = document.querySelector(".campoProduto").value : null;
        nivel == 1 ? produto = document.querySelector(".campoProduto").value : null;
        nivel == 2 ? detalhe = document.querySelector(".campoProduto").value : null;
        produtoOK = false;

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("OK" == xhr.responseText) {
                    produtoOK = true;
                    document.querySelector(".criticaProduto").setAttribute("hidden", "");
                    document.querySelector(".criticaProduto").innerHTML = "";
                } else if ("DUPLICIDADE" == xhr.responseText) {
                    document.querySelector(".criticaProduto").removeAttribute("hidden");
                    document.querySelector(".criticaProduto").innerHTML = "Já existe um registro semelhante a este";
                } else {
                    document.querySelector(".criticaProduto").innerHTML = "Lamentamos, ocorreu um erro no servidor";
                }
            }
        };

        csrf = document.querySelector("#csrf").value;
        xhr.open("POST", "http://localhost:3000/checkProduct", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("categoria=" + categoria + "&produto=" + produto + "&detalhe=" + detalhe + "&_csrf=" + csrf);
    }
}