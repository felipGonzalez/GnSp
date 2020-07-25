
window.addEventListener('load', function () {

    class Chi_2 {

        stringToR_i(data) {
            return data.split(",").map(Number);
        }

        getX_i(r_i, a, b) {
            var x_i = [];
            for (let index = 0; index < r_i.length; index++) {
                x_i[index] = parseFloat((a + (b - a) * r_i[index]).toFixed(8));
            }
            return x_i.map(Number);
        }

        //obtener el valor minimo
        getMin(list) {
            return Math.min(...list);
        }

        // Obtener el valor maximo
        getMax(list) {
            return Math.max(...list);
        }

        // Obtener las frecuancias (lista de final)
        getInterval(min, max, numberInterval) {
            var interval = [], aux = min;
            for (let index = 0; index < numberInterval; index++) {
                let number = aux + (max - min) / numberInterval;
                interval[index] = parseFloat(number.toFixed(8));
                aux = interval[index];
            }
            return interval.map(Number);
        }

        isInFrecuency(number, init, final) {
            return number > init && number <= final;
        }

        getFrecuency(x_i, init, list_final) {
            var frec = [];
            var count = 0;
            x_i.forEach(element => {
                if (element >= init && element <= list_final[0]) {
                    count++;
                }
            });

            frec.push(count);
            init = list_final[0];
            for (let index = 1; index < list_final.length; index++) {
                count = 0;
                x_i.forEach(element => {
                    if (this.isInFrecuency(element, init, list_final[index])) {
                        count++;
                    }
                });
                frec.push(count);
                init = list_final[index];
            }
            return frec;
        }

        getChi(frecObtenida, frecEsperada) {
            let chi = [];
            for (let i = 0; i < frecObtenida.length; i++) {
                chi.push(parseFloat((Math.pow((frecObtenida[i] - frecEsperada), 2) / frecEsperada).toFixed(3)));
            }
            return chi;
        }

        sum(listData) {
            let sum = 0;
            listData.forEach(element => {
                sum += element;
            });
            return sum;
        }

        getGl(a, b) {
            return (a - 1) * (b - 1);
        }

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

        getResult(prueba, chi) {
            return prueba > chi;
        }

        createMatrix_1(r_i, x_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, r_i[i], x_i[i]);
                result.push(data);
            }
            return result;
        }

        createMatrix_2(initial, final, frec_oct, frec_esp, chi) {
            let result = [];
            for (let i = 0; i < chi.length; i++) {
                let data = [];
                if (i == 0) {
                    data.push(i + 1, initial, final[i], frec_oct[i], frec_esp, chi[i]);
                } else {
                    data.push(i + 1, final[i - 1], final[i], frec_oct[i], frec_esp, chi[i]);
                }
                result.push(data);
            }
            return result;
        }
    }


    document.querySelector("#pruebas_play").addEventListener('click', function () {
        chi_2 = new Chi_2();

        let data = document.querySelector("#pruebas_r_i").value;
        let r_i = [];
        if (data) {
            r_i = chi_2.stringToR_i(data);
        } else {
            r_i = JSON.parse(sessionStorage.getItem("ri"));
        }
        //cargar el minimo
        let minNumber = document.querySelector("#pruebas_min").value;
        //cargar el Maximo
        let maxNumber = document.querySelector("#pruebas_max").value;
        //obtener x_i
        let x_i = chi_2.getX_i(r_i, parseInt(minNumber), parseInt(maxNumber));
        //obtener el minimo de x_i
        let minData = chi_2.getMin(x_i);
        //obtener el maximo de x_i
        let maxData = chi_2.getMax(x_i);
        // obtener los intervalos finales
        let final = chi_2.getInterval(minData, maxData, 8);
        //Obtener la frecuencia
        let frecObtenida = chi_2.getFrecuency(x_i, minData, final);
        //frecuencia esperada
        let frecEsperada = x_i.length / frecObtenida.length;
        // Obtener chi de cada intervalo
        var chi = chi_2.getChi(frecObtenida, frecEsperada);
        // obtener la sumatoria de chi
        let total_chi = chi_2.sum(chi);
        // Grados de libertas
        var gl = chi_2.getGl(final.length, 2);
        // Obtener la prueva
        var prueba = chi_2.getPrueba(gl, 0.05);
        //Obtener el resultado
        var result = chi_2.getResult(prueba, total_chi);
        let textResult = "No ha pasado la prueba de chi^2";
        if (result) {
            textResult = "Si ha pasado la prueba de chi^2";
        }
        document.querySelector("#result_chi").innerHTML = textResult;
        var table = document.querySelector("#table-chi_1");
        createTable(table, chi_2.createMatrix_1(r_i, x_i), "#table-chi_1>tbody");

        var table_2 = document.querySelector("#table-chi_2");
        createTable(table_2, chi_2.createMatrix_2(minData, final, frecObtenida, frecEsperada, chi), "#table-chi_2>tbody");
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