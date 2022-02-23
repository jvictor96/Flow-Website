pedidos = [];
setInterval(() => { carregarPedidos() }, 5000);

carregarPedidos();
function carregarPedidos() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("Erro" != xhr.responseText) {
                let pesquisa = JSON.parse(xhr.responseText);
                pedidos = pesquisa;
                atualizarVisaoPedidos();
            } else {
                console.log("Erro");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("GET", "http://localhost:3000/loadOrders", true);
    xhr.send();
}

function atualizarVisaoPedidos() {
    document.querySelectorAll(".pedido").forEach((p) => { p.remove(); });

    let i = 0;
    for (let p of pedidos) {
        let cell = document.createElement("p");
        cell.setAttribute("class", "pedido");
        //cell.setAttribute("id", "b" + i);
        //cell.setAttribute("onmouseover", "arredondar(0,'b" + i + "')");
        //cell.setAttribute("onmouseout", "restaurar('b" + i + "')");
        cell.innerHTML = "Mesa " + p.mesa;
        p.itens = p.pedido.split(",")
        for (let pdd of p.itens) { cell.innerHTML += " | " + pdd; }

        let close = document.createElement("span");
        close.setAttribute("class", "label");
        close.innerHTML = " | Entregar ";
        close.setAttribute("onclick", "entregarPedido('" + p._id + "')");
        cell.append(close);
        document.querySelector(".pedidos").appendChild(cell);
        i++;
    }
}

function entregarPedido(id) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("Erro" != xhr.responseText) {
                carregarPedidos();
            } else {
                console.log("Erro");
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("POST", "http://localhost:3000/deliverOrder", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&_csrf=" + csrf);
}