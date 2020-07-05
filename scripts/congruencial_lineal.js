window.addEventListener('load', function () {

    class CongruencialLineal {

        getX_i(x0, a, c, m, tam) {
            var x_i = [];
            for (let index = 0; index < tam; index++) {
                x0 = ((a * x0) + c) % m;
                x_i.push(x0);
            }
            return x_i;
        }

        getR_i(x_i, m) {
            var r_i = [];
            for (let index = 0; index < x_i.length; index++) {
                r_i[index] = (x_i[index] / (m - 1));
            }
            return r_i;
        }

        getN_i(r_i, min, max) {
            var n_i = [];
            for (let index = 0; index < r_i.length; index++) {
                n_i[index] = min + (max - min) * r_i[index];
            }
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



    document.querySelector("#congr_line_play").addEventListener('click', function () {
        cl = new CongruencialLineal();
        let x_0 = parseInt(document.querySelector("#cl_x_0").value);
        let k = parseInt(document.querySelector("#cl_k").value);
        let c = parseInt(document.querySelector("#cl_c").value);
        let g = parseInt(document.querySelector("#cl_g").value);
        let tam = 18;
        let min = parseInt(document.querySelector("#cl_min").value);
        let max = parseInt(document.querySelector("#cl_max").value);

        let a = 1 + 2 * k;
        let m = Math.pow(2, g);
        let x_i = cl.getX_i(x_0, a, c, m, tam);
        let r_i = cl.getR_i(x_i, m);

        let n_i = cl.getN_i(r_i, min, max);

        //Guardar en sesion
        sessionStorage.clear();
        sessionStorage.setItem("ri", JSON.stringify(r_i));

        // pintar en la tabla
        var table = document.querySelector("#table-cl");
        createTable(table, cl.createMatrix(x_i, r_i, n_i), "#table-cl>tbody");

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