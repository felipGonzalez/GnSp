window.addEventListener('load', function () {

    class Media {

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

        getZ(v) {
            var acumulador = 0.00000028666;
            let i;
            for (i = -5; acumulador < v; i = i + 0.00001) {
                acumulador += (0.00001 * this.calculaz(i - 0.000005));
            }
            return i;
        }

        calculaz(v) { // funcion de densidad de probabilidad normal
            return Math.exp(-Math.pow(v, 2) / 2) / Math.sqrt(2 * Math.PI);
        }

        getLI(z, n) {
            return (0.5) - (z * (1 / Math.sqrt(12 * n)));
        }

        getLS(z, n) {
            return (0.5) + (z * (1 / Math.sqrt(12 * n)));
        }

        prueba(r, li, ls) {
            return (r >= li && r < ls);
        }

        createMatrix(aceptacion, a, n, media, aux, z, li, ls) {
            return [[aceptacion,a,n,media,aux,z,li,ls]];
        }
    }

    document.querySelector("#pruebas_play").addEventListener('click', function () {
        var me = new Media();
        //let r_i = me.normalizar(n_i);

        let data = document.querySelector("#pruebas_r_i").value;
        let r_i = [];
        if (data) {
            r_i = me.stringToR_i(data);
        } else {
            r_i = JSON.parse(sessionStorage.getItem("ri"));
        }

        let aceptacion = 0.95;
        let a = (1 - aceptacion).toFixed(3);
        // # de datos
        let n = r_i.length;
        //Media
        let media = me.getMedia(r_i).toFixed(5);

        // 1 - (a/2);
        let aux = 1 - (a / 2);
        let z = me.getZ(aux).toFixed(8);

        // Limite inferior
        let li = me.getLI(z, n).toFixed(8);
        //Limite superior
        let ls = me.getLS(z, n).toFixed(8);

        let prueba = me.prueba(media, li, ls);
        
        var table = document.querySelector("#table-pm");
        createTable(table, me.createMatrix(aceptacion, a, n, media, aux, z, li, ls), "#table-pm>tbody");
        
        let textResult = "NO ha pasado la prueba de medias";

        if (prueba) {
            textResult = "SI ha pasado la prueba de medias";
        }
        document.querySelector("#result_medias").innerHTML = textResult;
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