let loop;
let boo = false;

function corA(n) {
    return "rgba(255, 255, 255, " + (0.8 + n / 50.0) + ")";
}

function corB(n) {
    return "rgba(255, 150, 0, " + (0.8 + n / 50.0) + ")";
}

function arredondar(num, id) {
    obj = document.querySelector("#" + id);
    loop = setInterval(lr, 13);
    boo = true;
    function lr() {
        obj.style.borderRadius = num + 5 + "px";
        obj.id == "bn" ? obj.style.backgroundColor = corB(num) : obj.style.backgroundColor = corA(num);
        num++;
        if (num > 10) {
            clearInterval(loop);
        }
    }
}

function restaurar(id) {
    if (boo) {
        boo = false;
        obj = document.querySelector("#" + id);
        obj.style.borderRadius = 5 + "px";
        obj.id == "bn" ? obj.style.backgroundColor = corB(0) : obj.style.backgroundColor = corA(0);
        clearInterval(loop);
    }
}