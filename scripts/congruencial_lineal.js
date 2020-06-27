$(document).ready(function () {
    $('#congruencial_lineal').click(function () {


    });
});

function getX_i(x0, a, c, m, tam) {
    var x_i = [];
    for (let index = 0; index < tam; index++) {
        x0 = x_i[index] = ((a * x0) + c) % m;
    }
    return x_i;
}

function getR_i(x_i, m) {
    var r_i = [];
    for (let index = 0; index < x_i.length; index++) {
        r_i[index] = (x_i[index] / (m - 1));
    }
    return r_i;
}

function getN_i(r_i, min, max) {
    var n_i = [];
    for (let index = 0; index < r_i.length; index++) {
        n_i[index] = min + (max - min) * r_i[index];
    }
    return n_i;
}
var x0 = 1, k = 4, c = 6, g = 7, tam = 18;
var a = 1 + 2 * k;
var m = Math.pow(2, g);
var x_i = getX_i(x0, a, c, m, tam);
var r_i = getR_i(x_i, 128);

var min= 8, max = 10;

var n_i = getN_i(r_i, min, max);

console.log("X_i: ", x_i);
console.log("R_i: ", r_i);
console.log("N_i: ", n_i);