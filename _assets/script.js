//Funcao adiciona uma nova linha na tabela
let qnt_aluno = 0
let y = 0
let x = 0

function adicionaLinha(idTabela) {
    var tabela = document.getElementById(idTabela);
    var numeroLinhas = tabela.rows.length;
    var linha = tabela.insertRow(numeroLinhas);
    var celula1 = linha.insertCell(0);
    var celula2 = linha.insertCell(1);
    var celula3 = linha.insertCell(2);
    var celula4 = linha.insertCell(3);
    var celula5 = linha.insertCell(4);
    var celula6 = linha.insertCell(5);
    var celula7 = linha.insertCell(6);
    y++
    celula1.innerHTML = `<input class="alunos form-control" id="nome${y}" type="text" min=0 max=100>`;
    x++
    console.log(y, x)
    celula2.innerHTML = `<input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100>`;
    x++
    console.log(y, x)
    celula3.innerHTML = `<input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100>`;
    x++
    console.log(y, x)
    celula4.innerHTML = `<input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100>`;
    x++
    console.log(y, x)
    celula5.innerHTML = `<input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100>`;
    celula6.innerHTML = `<output class="form-control" id="media${y}"></output>`;
    celula7.innerHTML = `<output class="form-control" id="estado${y}"</output>`;
    qnt_aluno++
    x = 0
}

function calcular() {
    for (let y = 1; x <= qnt_aluno; y++) {

        let soma = 0
        let media = 0

        for (let x = 1; x <= 4; x++) {
            let nota = parseFloat(document.getElementById(`nota${y}${x}`).value)
            soma = nota + soma
        }

        media = soma / 4

        if (media >= 50) {
            document.getElementById(`situacao${y}`).innerText = "Aprovado"
            document.getElementById(`situacao${y}`).style.color = "Green"
        } else if (media >= 40 && media < 50) {
            document.getElementById(`situacao${y}`).innerText = "Recuperação"
            document.getElementById(`situacao${y}`).style.color = "Orange"
        } else if (media < 40) {
            document.getElementById(`situacao${y}`).innerText = "Reprovado"
            document.getElementById(`situacao${y}`).style.color = "Red"
        }

        document.getElementById(`media${y}`).value = media

    }
}

function appendColumn() {
    var tbl = document.getElementById('tbl'), // table reference
        cols = tbl.rows[0].cells.length, // set number of columns
        i; // loop variable
    // open loop for each row
    for (i = 0; i < tbl.rows.length; i++) {
        tbl.rows[i].insertCell(cols);
        // copy content from first column
        tbl.rows[i].cells[cols].innerHTML = tbl.rows[i].cells[1].innerHTML;
    }
}