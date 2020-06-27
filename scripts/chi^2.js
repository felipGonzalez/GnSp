
$(document).ready(function () {
    $('#play').click(function () {
        var getx_i = getX_i(auxR_i, 8, 10);
        var min = getMin(getx_i);
        var max = getMax(getx_i);
        var final = getInterval(min, max, 8);
        var frecObtenida = getFrecuency(getx_i, min, final);
        var chi = getChi(frecObtenida, getx_i.length);
        var gl = getGl(final.length, 2);
        var prueba = getPrueba(gl, 0.05);
        var result = getResult(prueba, chi);
        console.log(result);
        
    });
});


function getX_i(r_i, a, b) {
    var x_i = [];
    for (let index = 0; index < r_i.length; index++) {
        x_i[index] = a + (b - a) * r_i[index];
    }
    return x_i;
}

//obtener el valor minimo
function getMin(list) {
    return Math.min(...list);
}

// Obtener el valor maximo
function getMax(list) {
    return Math.max(...list);
}

// Obtener las frecuancias (lista de final)
function getInterval(min, max, numberInterval) {
    var interval = [], aux = min;
    for (let index = 0; index < numberInterval; index++) {
        aux = interval[index] = aux + (max - min) / numberInterval;
    }
    return interval;
}

function isInFrecuency(number, init, final) {
    return number > init && number <= final;
}

function getFrecuency(x_i, init, list_final) {
    var frec = [];
    for (let index = 0; index < list_final.length; index++) {
        var count = 0;
        x_i.forEach(element => {
            if (isInFrecuency(element, init, list_final[index])) {
                count++;
            }
        });
        frec[index] = count;
        init = list_final[index];
    }
    return frec;
}

function getChi(frecObtenida, tamX_i) {
    var chi = 0;
    var frecEsperada = tamX_i / frecObtenida.length;
    frecObtenida.forEach(element => {
        chi += ((element - frecEsperada) ^ 2) / frecEsperada;
    });
    return chi;
}

function getGl(a, b) {
    return (a - 1) * (b - 1);
}

function getPrueba(libertad, probabilidad) {
    var raiz = Math.sqrt(2 / (9 * libertad));
    var z = calculateNormInv(1 - probabilidad);
    return libertad * Math.pow(1 - (2 / (9 * libertad)) + (z * raiz), 3);
}

function calculateNormInv(v) { // Funcion de distribucion de probabilidad normal inversa
    var acumulador = 0.00000028666;
    var i;
    for (i = -5; acumulador < v; i = i + 0.00001) {
        acumulador = acumulador + (0.00001 * calculaz(i - 0.000005));
    }
    return i;
}

function calculaz(v) { // funcion de densidad de probabilidad normal
    n = Math.exp(-Math.pow(v, 2) / 2) / Math.sqrt(2 * Math.PI);
    return n;
}

function getResult(prueba, chi) {
    return prueba > chi;
}

var auxR_i = [0.299940023,
    0.250321476,
    0.332375528,
    0.539471736,
    0.813973495,
    0.849057556,
    0.637173087,
    0.520494435,
    0.670272414,
    0.126123286,
    0.068109951,
    0.01477298,
    0.56012157,
    0.435412591,
    0.331350942,


];
/*
var getx_i = getX_i(auxR_i, 8, 10);
var min = getMin(getx_i);
var max = getMax(getx_i);
var final = getInterval(min, max, 8);
var frecObtenida = getFrecuency(getx_i, min, final);
var chi = getChi(frecObtenida, getx_i.length);
var gl = getGl(final.length, 2);
var prueba = getPrueba(gl, 0.05);
var result = getResult(prueba,chi);

console.log("x_i", getx_i);
console.log("minimo: ", min);
console.log("maximo: ", max);
console.log("final", final);

console.log("Frec. Obtenida", frecObtenida);
console.log("chi", chi);
console.log("gl", gl);
console.log("Prueba", prueba);
console.log("Pasa? ", result);
*/