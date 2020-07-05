window.addEventListener('load', function () {

    class CongruencialMultiplicativo {

        getX_i(x0, a, m, tam) {
            var x_i = [];
            for (let index = 0; index < tam; index++) {
                x0 = (a * x0) % m;
                x_i.push(x0);
            }
            return x_i;
        }

        getR_i(x_i, m) {
            let r_i = [];
            x_i.forEach(element => {
                r_i.push(element / (m - 1));
            });
            return r_i;
        }
        getN_i(r_i, a, b) {
            let n_i = [];
            r_i.forEach(element => {
                n_i.push(a + (b - a) * element);
            });
            return n_i;
        }

        createMatrix(x_i, r_i, n_i) {
            let result = [];
            for (let i = 0; i < r_i.length; i++) {
                let data = [];
                data.push(i + 1, x_i[i], r_i[i], n_i[i]);
                result.push(data);
            }
            return result;
        }
    }

    document.querySelector("#congr_mult_play").addEventListener('click', function () {
        cm = new CongruencialMultiplicativo();
        //Entrada de datos
        let x_0 = parseInt(document.querySelector("#cm_x_0").value);
        let t = parseInt(document.querySelector("#cm_t").value);
        let g = parseInt(document.querySelector("#cm_g").value);
        let min = parseInt(document.querySelector("#cm_min").value);
        let max = parseInt(document.querySelector("#cm_max").value);
        let tam = 18;
        //calculos
        let a = (8 * t) + 3;
        let m = Math.pow(2, g);

        let x_i = cm.getX_i(x_0, a, m, tam);
        let r_i = cm.getR_i(x_i, m);

        let n_i = cm.getN_i(r_i, min, max);

        // pintar en la tabla
        var table = document.querySelector("#table-cm");
        createTable(table, cm.createMatrix(x_i, r_i, n_i), "#table-cm>tbody");

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