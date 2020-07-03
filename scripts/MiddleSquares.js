window.addEventListener('load', function () {

    /** Cuadrados medios */
    class MiddleSquares {
        
        min = 8;
        max = 10;
        k = 2;
        divisor = 0

        init(seed, quantity,a,b){
            this.divisor = this.getDivisor(seed.toString().length);
            return this.createMatrix(parseInt(seed),parseInt(quantity));
        }
        
        createMatrix(seed, quantity){
            let result = [];
            var xi = seed
            for (let i = 0; i < quantity; i++) {
                let xi2 = Math.pow(xi, 2);    
                let extension = xi2.toString().length
                let extraction = parseInt(this.verifyNumber(xi2))
                let ri = extraction/this.divisor
                let data = []
                data.push(i,xi,xi2,extension,extraction,ri)
                result.push(data);
                xi = extraction
            }
            return result;
        }

        verifyNumber(number){
            if( number.toString().length >= this.min & number.toString().length <= this.max){
               if(number.toString().length % 2 == 0){
                 return this.extractNumber(number+"");
                }else{
                    return this.extractNumber(this.addZero(number,1));
                }
            }else if (number.toString().length < this.min) {
                let count = this.min - number.toString().length;
                return this.extractNumber(this.addZero(number,count));
            } 
        } 
        
        addZero(number, count){
            let newNumber = ""
            for (let i = 0; i < count ; i++) {
                newNumber+="0"
            }
            newNumber+=number
            return newNumber
       }

       extractNumber(numberString){
            let size = numberString.length/2
            return numberString.substr(size-this.k,this.k*2);
       }

       getDivisor(count){
            let divisor = 1;
            for (let i = 0; i < count; i++) {
                divisor *= 10;            
            }
           return divisor;
       }

    }

    

    document.querySelector("#btn-c").addEventListener('click', function () {
        middleSquares = new MiddleSquares();

       let data = middleSquares.init(
           document.querySelector("#seed").value,
           document.querySelector("#count").value
           );
       
        localStorage.setItem("ri", JSON.stringify(data[5]));
        let ri = []
        for (let i = 0; i < data.length; i++) {
            ri.push(data[i][5])
        }
        sessionStorage.clear();
        sessionStorage.setItem("ri", JSON.stringify(ri));
        var table = document.querySelector("#table-c");
        createTable(table,data);
    });
    

    function createTable(table, data) {
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
        
        var new_tbody = document.createElement('tbody');
        table.replaceChild(body, document.querySelector("#table-c>tbody"))
         
    }



});


