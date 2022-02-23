document.querySelector("form").onsubmit = validate;

async function validate(event) {
    if (action == "cadastro") {
        event.preventDefault();
        register();
    }
}

function checkGroup() {
    if (action == "grupos" && document.querySelector(".campoLogin").value.length > 0 && document.querySelector(".campoSenha").value.length > 0) {
        document.querySelector(".criticaSenha").innerHTML = "Buscando grupo...";

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (data) => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if ("Inexistente" != xhr.responseText) {
                    a = document.createElement("a");
                    a.setAttribute("href", xhr.responseText);
                    a.innerHTML = "Grupo encontrado, entrar"
                    document.querySelector(".criticaSenha").innerHTML = "";
                    document.querySelector(".criticaSenha").appendChild(a);
                    nomeOk = true;
                } else {
                    document.querySelector(".criticaSenha").innerHTML = "O grupo não foi encontrado";
                    nomeOk = false;
                }
            }
        };

        userName = document.querySelector(".campoLogin").value;
        senha = document.querySelector(".campoSenha").value;
        csrf = document.querySelector("#csrf").value;
        xhr.open("POST", "http://localhost:3000/checkGroup", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("login=" + userName + "&_csrf=" + csrf + "&senha=" + senha);
    }
}

function checkName() {
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

        login = document.querySelector(".campoLogin").value;
        csrf = document.querySelector("#csrf").value;
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
        if (xhr.readyState == 4 && xhr.status == 200) {
            if ("OK" == xhr.responseText) {
                document.querySelector(".criticaSenha").innerHTML = "O usuário foi registrado com sucesso!";
            } else {
                document.querySelector(".criticaSenha").innerHTML = "Lamento, ocorreu um erro na conexão";
            }
        }
    };

    csrf = document.querySelector("#csrf").value;
    xhr.open("POST", "http://localhost:3000/tryRegister", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("login=" + login + "&senha=" + senha + "&nome=" + nome + "&sexo=" + sexo + "&_csrf=" + csrf);
}