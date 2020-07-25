window.addEventListener('load', function () {
    
    class Normal {
        
        getN_i(data) {
            let n_i = [];
            data.forEach(element => {
                n_i.push(this.calculateNormInv(element).toFixed(5));
            });
            return n_i;
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
            return Math.exp(-Math.pow(v, 2) / 2) / Math.sqrt(2 * Math.PI);
        }
        
        getMin(list) {
            return Math.min(...list);
        }
        
        // Obtener el valor maximo
        getMax(list) {
            return Math.max(...list);
        }

        getInterval(min, max, numberInterval) {
            var interval = [], aux = min;
            for (let index = 0; index < numberInterval; index++) {
                let number = aux + (max - min) / numberInterval;
                interval[index] = parseFloat(number.toFixed(8));
                aux = interval[index];
            }
            return interval.map(Number);
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

        isInFrecuency(number, init, final) {
            return number > init && number <= final;
        }


        createMatrix(r_i, n_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, r_i[i], n_i[i]);
                result.push(data);
            }
            return result;
        }

        createMatrix2(min, max) {
            return [[min,max]];
        }
    }

    document.querySelector("#nor_play").addEventListener('click', function () {
        let n = new Normal();
        let r_i = JSON.parse(sessionStorage.getItem("ri"));
        let n_i = n.getN_i(r_i);
        var table1 = document.querySelector("#table-nor1");
        createTable(table1, n.createMatrix(r_i, n_i), "#table-nor1>tbody");
        // minimo
        let min = n.getMin(n_i);
        //maximo
        let max = n.getMax(n_i);
        //Intervalos
        let intervalos = n.getInterval(min, max, 15);
        //Frecuencias
        let frecuencias = n.getFrecuency(n_i, min, intervalos);

        var table2 = document.querySelector("#table-nor2");
        createTable(table2, n.createMatrix(intervalos, frecuencias), "#table-nor2>tbody");

        var table3 = document.querySelector("#table-nor3");
        createTable(table3, n.createMatrix2(min, max), "#table-nor3>tbody");
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
        table.replaceChild(body, document.querySelector(replace));
    }

});