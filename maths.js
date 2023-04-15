
class Base {
    constructor() {
        this.id_index = 0;
    }

    matrixSizeInput() {
        let inputDiv = document.createElement("div"); inputDiv.className = `input${this.id_index++}`;

        let row = document.createElement("input"); row.placeholder="row"; row.setAttribute("type", "number");
        let col = document.createElement("input"); col.placeholder="col"; col.setAttribute("type", "number");

        inputDiv.appendChild(row);
        inputDiv.appendChild(col);
        main.appendChild(inputDiv)

        row.addEventListener("input", ()=>this.makeTable(row.value, col.value, inputDiv));
        col.addEventListener("input", ()=>this.makeTable(row.value, col.value, inputDiv));
    }

    makeTable(row, col, inputDiv) {
        if (row<=0 || col<=0) return
        let table = document.createElement("table");

        for (let i=0; i<row; i++) {
            let tr = document.createElement("tr");
            for (let j=0; j<col; j++) {
                let td = document.createElement("td");
                let inp = document.createElement("input"); inp.value = 0;

                inp.addEventListener("input", this.calculate)

                td.appendChild(inp);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        if (inputDiv.children.length>2)
            inputDiv.replaceChild(table, inputDiv.getElementsByTagName("table")[0]);
        else
            inputDiv.appendChild(table);

        this.calculate()
    }


    getMatrix(id) {
        let table = document.querySelector(`.input${id} table`);
        let matrix = []
        for (let tr of table.children) {
            let temp = []
            for (let td of tr.children) {
                temp.push(parseInt(td.children[0].value))
            }
            matrix.push(temp);
        }
        return matrix;
    }

    calculate() {}
}






class Subtract extends Base {
    constructor() {
        super();
        this.matrixSizeInput();
        this.matrixSizeInput();
    }

    calculate() {
        let mat1 = super.getMatrix(0);
        let mat2 = super.getMatrix(1);

        let outTable = document.createElement("table");
        for (let i=0; i<mat1.length; i++) {
            let tr = document.createElement("tr");
            for (let j=0; j<mat1[0].length; j++) {
                let td = document.createElement("td");
                td.innerText = mat1[i][j] - mat2[i][j];
                tr.appendChild(td);
            }
            outTable.appendChild(tr);
        }

        output.replaceChild(outTable, output.children[0])
    }
}


class Add extends Base {
    constructor() {
        super();
        this.matrixSizeInput();
        this.matrixSizeInput();
    }

    calculate() {
        let mat1 = super.getMatrix(0);
        let mat2 = super.getMatrix(1);

        let outTable = document.createElement("table");
        for (let i=0; i<mat1.length; i++) {
            let tr = document.createElement("tr");
            for (let j=0; j<mat1[0].length; j++) {
                let td = document.createElement("td");
                td.innerText = mat1[i][j] + mat2[i][j];
                tr.appendChild(td);
            }
            outTable.appendChild(tr);
        }

        output.replaceChild(outTable, output.children[0])
    }
}


class Multiply extends Base {
    constructor() {
        super();
        this.matrixSizeInput();
        this.matrixSizeInput();
    }

    calculate() {
        let mat1 = super.getMatrix(0);
        let mat2 = super.getMatrix(1);

        if (mat1[0].length != mat2.length) return;

        let outTable = document.createElement("table");
        for (let i=0; i<mat1.length; i++) {
            let tr = document.createElement("tr");

            for (let j=0; j<mat2[0].length; j++) {
                let td = document.createElement("td");
                
                let temp = 0;
                for (let k=0; k<mat2.length; k++) {
                    temp += mat1[i][k] * mat2[k][j];
                }
                td.innerText = temp;

                tr.appendChild(td);
            }
            outTable.appendChild(tr);
        }

        output.replaceChild(outTable, output.children[0])
    }
}

class Dot extends Base {
    constructor() {
        super();
        this.matrixSizeInput();
        this.matrixSizeInput();
    }

    calculate() {
        let mat1 = super.getMatrix(0);
        let mat2 = super.getMatrix(1);

        let temp = 0;
        for (let i=0; i<mat1.length; i++) temp += parseInt(mat1[i])*parseInt(mat2[i]);

        let tempOutput = document.createElement("h2"); tempOutput.innerText = temp;
        output.replaceChild(tempOutput, output.children[0]);
    }
}

class Determinant extends Base {
    constructor() {
        super();
        this.matrixSizeInput();
    }

    calculate() {
        let mat1 = super.getMatrix(0);

        let temp = determinant(mat1);
        let tempOutput = document.createElement("h2"); tempOutput.innerText = temp;

        output.replaceChild(tempOutput, output.children[0]);
    }

}

function determinant(matrix) {
    if (matrix.length == 1) return matrix[0][0];
    if (matrix.length == 2) return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];

    let sign = 1;
    let det=0;
    for (let i=0; i<matrix.length; i++) {
        det += sign * matrix[i][0] * determinant(exceptIJMatrix(matrix, i,0));
        sign *= -1;
    }
    return det;
}

function exceptIJMatrix(matrix, r, c) {
    let ans = [];
    for (let i=0; i<matrix.length; i++) {
        let row = [];
        if (i==r) continue
        for (let j=0; j<matrix.length; j++) {
            if (j==c) continue;
            row.push(matrix[i][j]);
        }
        ans.push(row);
    }
    return ans;
}