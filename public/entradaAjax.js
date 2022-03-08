document.querySelector("form").onsubmit = validate;

async function validate(event) {
    if (action == "cadastro") {
        event.preventDefault();
        register();
    }
}

function checkName() {
    if (action == "cadastro") {
        document.querySelector(".criticaLogin").innerHTML = "Analisando o nome escolhido...";

        var token = document.querySelector('#csrf').value;

        // Make a request using the Fetch API
        fetch('/checkName', {
            credentials: 'same-origin', // <-- includes cookies in the request
            headers: {
                'CSRF-Token': token // <-- is the csrf token as a header
            },
            method: 'POST',
            body: {
                login: document.querySelector(".campoLogin").value,
            }
        }).then((response) => {
            if ("Erro" != response.text()) {
                document.querySelector(".criticaLogin").innerHTML = "O nome de usu�rio escolhido est� ok";
                nomeOk = true;
            } else {
                document.querySelector(".criticaLogin").innerHTML = "O nome de usu�rio escolhido j� existe";
                nomeOk = false;
            }
        });
    }
}

function register() {
    let xhr = new XMLHttpRequest();


    if (login == "" || senha == "" || nome == "" || sexo == "") {
        document.querySelector(".criticaSenha").innerHTML = "Por favor, preencha todos os campos";
        return null;
    }

    var token = document.querySelector('#csrf').value;

    // Make a request using the Fetch API
    fetch('/tryRegister', {
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
            'CSRF-Token': token // <-- is the csrf token as a header
        },
        method: 'POST',
        body: {
            login: document.querySelector(".campoLogin").value,
            senha: document.querySelector(".campoSenha").value,
            nome: document.querySelector(".campoNome").value,
            sexo: document.querySelector(".campoSexo").value
        }
    }).then((response) => {
        if ("Erro" != response.text()) {
            document.querySelector(".criticaSenha").innerHTML = "O usu�rio foi registrado com sucesso!";
        } else {
            document.querySelector(".criticaSenha").innerHTML = "Lamento, ocorreu um erro na conex�o";
        }
    });
}