document.querySelector("form").onsubmit = validate;
getcsrf();
let csrf = "";

async function validate(event) {
    if (action == "cadastro") {
        event.preventDefault();
        register();
    }
}

function getcsrf() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            csrf = xhr.responseText;
        }
     };

        xhr.open("GET", "http://localhost:3000/getcsrf", true);
        xhr.send();
}

function checkName() {
    if (action == "cadastro") {
        document.querySelector(".criticaLogin").innerHTML = "Analisando o nome escolhido...";

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4) {
                getcsrf();
            }
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("Erro" != xhr.responseText) {
                    document.querySelector(".criticaLogin").innerHTML = "O nome de usuário escolhido está ok";
                    document.querySelector("#csrf").value = xhr.responseText;
                    nomeOk = true;
                } else {
                    document.querySelector(".criticaLogin").innerHTML = "O nome de usuário escolhido já existe";
                    nomeOk = false;
                }
            }
        };

        login = document.querySelector(".campoLogin").value;
        xhr.open("POST", "http://localhost:3000/checkName", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("login=" + login + "&_csrf=" + csrf);
    }
}

function register() {
    let xhr = new XMLHttpRequest();

    login = document.querySelector(".campoLogin").value;
    senha = document.querySelector(".campoSenha").value;
    nome = document.querySelector(".campoNome").value;
    sexo = document.querySelector(".campoSexo").value;

    if (login == "" || senha == "" || nome == "" || sexo == "") {
        document.querySelector(".criticaSenha").innerHTML = "Por favor, preencha todos os campos";
        return null;
    }

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState == 4) {
            getcsrf();
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("Erro" != xhr.responseText) {
                document.querySelector(".criticaSenha").innerHTML = "O usuário foi registrado com sucesso!";
                document.querySelector("#csrf").value = xhr.responseText;
            } else {
                document.querySelector(".criticaSenha").innerHTML = "Lamento, ocorreu um erro na conexão";
            }
        }
    };

    xhr.open("POST", "http://localhost:3000/tryRegister", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("login=" + login + "&senha=" + senha + "&nome=" + nome + "&sexo=" + sexo + "&_csrf=" + csrf);
}