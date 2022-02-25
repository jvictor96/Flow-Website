let nomeOk = false;
let action = "";

escolherLogin();
function escolherLogin() {
    document.querySelector(".escolhaLogin").style.fontWeight = "bold";
    document.querySelector(".escolhaCadastro").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "normal";

    document.querySelector("#form").action = "/tryLogin";
    document.querySelector("#botaoSubmit").value = "Fazer Login";
    document.querySelector(".linhaNome").setAttribute("hidden", true);
    document.querySelector(".linhaSexo").setAttribute("hidden", true);

    clearFields();
    action = "login";
}

function escolherCadastro() {
    document.querySelector(".escolhaCadastro").style.fontWeight = "bold";
    document.querySelector(".escolhaLogin").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "normal";

    document.querySelector("#botaoSubmit").value = "Fazer Cadastro";
    document.querySelector(".linhaNome").removeAttribute("hidden");
    document.querySelector(".linhaSexo").removeAttribute("hidden");

    clearFields();
    nomeOk = false;
    action = "cadastro";
}

function escolherGrupos() {
    document.querySelector(".escolhaCadastro").style.fontWeight = "normal";
    document.querySelector(".escolhaLogin").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "bold";

    document.querySelector("#form").action = "/matchUp";
    document.querySelector("#botaoSubmit").value = "Entrar";
    document.querySelector(".linhaNome").setAttribute("hidden", true);
    document.querySelector(".linhaSexo").setAttribute("hidden", true);

    clearFields();
    action = "grupos";
}

function clearFields() {
    document.querySelector(".campoLogin").value = "";
    document.querySelector(".campoSenha").value = "";
    document.querySelector(".campoNome").value = "";
    document.querySelector(".campoSexo").value = "";
    document.querySelector(".criticaSenha").innerHTML = "";
    document.querySelector(".criticaLogin").innerHTML = "";
}