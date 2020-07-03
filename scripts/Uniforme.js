window.addEventListener('load', function () {

    class Uniforme {

        getN_i(r_i, min, max) {
            var n_i = [];
            for (let index = 0; index < r_i.length; index++) {
                n_i[index] = min + (max - min) * r_i[index];
            }
            return n_i;
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
    }

    document.querySelector("#uni_play").addEventListener('click', function () {
        var un = new Uniforme();
        let min = parseInt(document.querySelector("#uni_min").value);
        let max = parseInt(document.querySelector("#uni_max").value);

        let r_i = JSON.parse(sessionStorage.getItem("ri"));
        console.log(r_i);
        
        let n_i = un.getN_i(r_i,min,max);
        var table = document.querySelector("#table-uni");
        createTable(table, un.createMatrix(r_i, n_i),  "#table-uni>tbody");
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