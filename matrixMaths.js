function add(matrix1, matrix2) {
    let answer = [];
    for (let i=0; i<matrix1.length; i++) {
        let temp = [];
        for (let j=0; j<matrix1[0].length; j++) {
            temp.push(matrix1[i][j] + matrix2[i][j]);
        }
        answer.push(temp);
    }
    return answer;
}

function subtract(matrix1, matrix2) {
    let answer = [];
    for (let i=0; i<matrix1.length; i++) {
        let temp = [];
        for (let j=0; j<matrix1[0].length; j++) {
            temp.push(matrix1[i][j] - matrix2[i][j]);
        }
        answer.push(temp);
    }
    return answer;
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

function cofactors() {
    
}