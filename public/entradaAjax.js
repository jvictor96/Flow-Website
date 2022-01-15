let nomeOk = false;
let action = "";

document.querySelector("form").onsubmit = validate;

escolherLogin();
function escolherLogin() {
    document.querySelector(".escolhaLogin").style.fontWeight = "bold";
    document.querySelector(".escolhaCadastro").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "normal";

    document.querySelector(".criticaLogin").innerHTML = "";
    document.querySelector("#botaoSubmit").value = "Fazer Login";

    action = "login";
}

function escolherCadastro() {
    document.querySelector(".escolhaCadastro").style.fontWeight = "bold";
    document.querySelector(".escolhaLogin").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "normal";

    document.querySelector(".campoLogin").value = "";
    document.querySelector(".campoSenha").value = "";
    document.querySelector(".criticaSenha").innerHTML = "";

    document.querySelector("#botaoSubmit").value = "Fazer Cadastro";

    nomeOk = false;
    action = "cadastro";
}

function escolherCadastro() {
    document.querySelector(".escolhaCadastro").style.fontWeight = "normal";
    document.querySelector(".escolhaLogin").style.fontWeight = "normal";
    document.querySelector(".escolhaGrupos").style.fontWeight = "bold";

    document.querySelector(".campoLogin").value = "";
    document.querySelector(".campoSenha").value = "";
    document.querySelector(".criticaSenha").innerHTML = "";
    document.querySelector(".criticaLogin").innerHTML = "";

    document.querySelector("#botaoSubmit").value = "Entrar";

    nomeOk = false;
    action = "grupos";
}

function getCsrf() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.querySelector("#csrf").value = xhr.responseText;
        }
    };

    xhr.open("GET", "http://localhost:3000/getCsrf", true);
    xhr.send();
}

async function validate(event) {
    if (action == "cadastro") {
        event.preventDefault();
        register();
    } else {

    }
}

function check() {
    if (action == "cadastro") {
        document.querySelector(".criticaLogin").innerHTML = "Analisando o nome escolhido...";

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("OK" == xhr.responseText) {
                    document.querySelector(".criticaLogin").innerHTML = "O nome de usuário escolhido está ok";
                    nomeOk = true;
                } else {
                    document.querySelector(".criticaLogin").innerHTML = "O nome de usuário escolhido já existe";
                    nomeOk = false;
                }
            }
        };

        userName = document.querySelector(".campoLogin").value;
        csrf = document.querySelector("#csrf").value;
        xhr.open("POST", "http://localhost:3000/checkName", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("nome=" + userName + "&_csrf=" + csrf);
    }
}

function register() {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = (data) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if ("OK" == xhr.responseText) {
                        document.querySelector(".criticaSenha").innerHTML = "Login OK";
                    } else {
                        document.querySelector(".criticaSenha").innerHTML = "Nome de usuário ou senha estão incorretos";
                    }
                }
            };

        userName = document.querySelector(".campoLogin").value;
        senha = document.querySelector(".campoSenha").value;
            csrf = document.querySelector("#csrf").value;
            xhr.open("POST", "http://localhost:3000/tryLogin", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("nome=" + userName + "&senha=" + senha + "&_csrf=" + csrf);
}