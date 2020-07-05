window.addEventListener('load', function () {

    class Varianza {

        stringToR_i(data) {
            return data.split(",").map(Number);
        }

        normalizar(n_i) {
            let min = this.getMin(n_i);
            let max = this.getMax(n_i);
            let nor = [];
            n_i.forEach(element => {
                nor.push((element - min) / (max - min));
            });
            return nor;
        }

        //obtener el valor minimo
        getMin(list) {
            return Math.min(...list);
        }

        // Obtener el valor maximo
        getMax(list) {
            return Math.max(...list);
        }
        //Obtener la media
        getMedia(data) {
            return data.reduce((previus, current) => current += previus) / data.length;
        }

        //
        getPrueba(libertad, probabilidad) {
            var raiz = Math.sqrt(2 / (9 * libertad));
            var z = this.calculateNormInv(1 - probabilidad);
            return libertad * Math.pow(1 - (2 / (9 * libertad)) + (z * raiz), 3);
        }

        calculateNormInv(v) { // Funcion de distribucion de probabilidad normal inversa
            var acumulador = 0.00000028666;
            var i;
            for (i = -5; acumulador < v; i = i + 0.00001) {
                acumulador = acumulador + (0.00001 * this.calculaz(i - 0.000005));
            }
            return i;
        }

        calculaz(v) { // funcion de densidad de probabilidad normal
            let n = Math.exp(-Math.pow(v, 2) / 2) / Math.sqrt(2 * Math.PI);
            return n;
        }

        getL(x, n) {
            return (x) / (12 * (n - 1));
        }

        prueba(r, li, ls) {
            return (r >= li && r < ls);
        }

        createMatrix(aceptacion, a, n, media, aa, aux, x1, x2, li, ls) {
            return [[aceptacion, a, n, media, aa, aux, x1, x2, li, ls]];
        }
    }

    document.querySelector("#pruebas_play").addEventListener('click', function () {
        var va = new Varianza();
        //let r_i = me.normalizar(n_i);

        let data = document.querySelector("#pruebas_r_i").value;
        let r_i = [];
        if (data) {
            r_i = va.stringToR_i(data);
        } else {
            r_i = JSON.parse(sessionStorage.getItem("ri"));
        }
        let aceptacion = 0.95;
        let a = (1 - aceptacion).toFixed(3);
        // # de datos
        let n = r_i.length;
        //Media
        let media = va.getMedia(r_i).toFixed(5);

        //a/2
        let aa = a / 2;

        // 1 - (a/2);
        let aux = 1 - (a / 2);

        // x^2 a/2
        let x1 = va.getPrueba((n - 1), aa).toFixed(8);

        // x^2 1-(a/2)
        let x2 = va.getPrueba((n - 1), aux).toFixed(8);

        //limite inferior
        let li = va.getL(x1, n).toFixed(8);
        //limite superior
        let ls = va.getL(x2, n).toFixed(8);

        let prueba = va.prueba(media, li, ls);

        var table = document.querySelector("#table-pv");
        createTable(table, va.createMatrix(aceptacion, a, n, media, aa, aux, x1, x2, li, ls), "#table-pv>tbody");

        let textResult = "NO ha pasado la prueba de Varianza";

        if (prueba) {
            textResult = "SI ha pasado la prueba de Varianza";
        }
        document.querySelector("#result_varianza").innerHTML = textResult;
    });

    function createTable(table, data, replace) {
        var body = document.createElement("tbody");
        for (let i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < data[i].length; j++) {
                var td = document.createElement("td");
                var value = document.createTextNode(data[i][j])
                td.appendChild(value);
                tr.appendChild(td);
            }
            body.appendChild(tr);
        }
        //var new_tbody = document.createElement('tbody');
        table.replaceChild(body, document.querySelector(replace))
    }
});