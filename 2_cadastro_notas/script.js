function verificaMedias() {
    for (let y = 1; y <= 10; y = y + 1) {

        let media = 0
        let resultado = 0

        for (let x = 1; x <= 4; x = x + 1) {
            let nota = parseFloat(document.getElementById(`nota${y}${x}`).value)
            resultado = nota + resultado
        }

        media = resultado / 4

        document.getElementById(`media${y}`).innerText = media

        if (media >= 50) {
            document.getElementById(`situacao${y}`).innerText = "Aprovado"
            document.getElementById(`situacao${y}`).style.color = "Green"
        }
        else if (media >= 40 && media < 50) {
            document.getElementById(`situacao${y}`).innerText = "Recuperação"
            document.getElementById(`situacao${y}`).style.color = "Orange"
        }
        else if (media < 40) {
            document.getElementById(`situacao${y}`).innerText = "Reprovado"
            document.getElementById(`situacao${y}`).style.color = "Red"
        }

    }

}

// function cadpessoa() {
//     var tb = document.getElementById("tabelapai");
//     var qtdlinhas = tb.rows.length;
//     var linha = tb.insertRow(qtdlinhas);

//     var cellCodigo = linha.insertCell(0);
//     var cellEstudante = linha.insertCell(1);
//     var celln1 = linha.insertCell(2);
//     var celln2 = linha.insertCell(3);
//     var celln3 = linha.insertCell(4);
//     var celln4 = linha.insertCell(5);

//     cellCodigo.innerHTML = qtdlinhas;
//     cellEstudante.innerHTML = estudante;
//     celln1.innerHTML = n1;
//     celln2.innerHTML = n2;
//     celln3.innerHTML = n3;
//     celln4.innerHTML = n4;

// }

function appendRow() {
    var tbl = document.getElementById('tabelapai'), // table reference
        row = tbl.insertRow(tbl.rows.length),      // append table row
        i;
    // insert table cells to the new row
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), i, 'linha');
    }
}

function createCell(cell, text, style) {
    var div = document.createElement('aluno1'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}

function appendColumn() {
    var tbl = document.getElementById('tabelapai'), // table reference
        cols = tbl.rows[0].cells.length,           // set number of columns
        i;                                         // loop variable
    // open loop for each row
    for (i = 0; i < tbl.rows.length; i++) {
        tbl.rows[i].insertCell(cols);
        // copy content from first column
        tbl.rows[i].cells[cols].innerHTML = tbl.rows[i].cells[3].innerHTML;
    }
}
