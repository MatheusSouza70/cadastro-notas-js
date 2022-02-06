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
    celula1.innerHTML = `<td><input class="alunos form-control" id="nome${y}" type="text" min=0 max=100></td>`;
    x++
    console.log(y, x)
    celula2.innerHTML = `<td><input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100></td>`;
    x++
    console.log(y, x)
    celula3.innerHTML = `<td><input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100></td>`;
    x++
    console.log(y, x)
    celula4.innerHTML = `<td><input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100></td>`;
    x++
    console.log(y, x)
    celula5.innerHTML = `<td><input class="nota form-control" id="nota${y}${x}" type="number" min=0 max=100></td>`;
    celula6.innerHTML = `<td><output class="form-control" id="media${y}"></output></td>`;
    celula7.innerHTML = `<td><output class="form-control" id="estado${y}"</output></td>`;
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

        if (media <= 50) {
            document.getElementById(`estado${y}`).innerText = 'Reprovado'
            document.getElementById(`estado${y}`).style.color = 'Red'
        } else if (media >= 40 && media < 50) {
            document.getElementById(`estado${y}`).innerText = "Recuperação"
            document.getElementById(`estado${y}`).style.color = "Orange"
        } else if (media > 50) {
            document.getElementById(`estado${y}`).innerText = 'Aprovado'
            document.getElementById(`estado${y}`).style.color = 'Green'
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

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tbl");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortNumber() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}