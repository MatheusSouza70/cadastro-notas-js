src =
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"; /* link do gráfico */

var qtdAlunos = 1;
var qtdNotas = 4;
var mediageral = 0;
var cv = 0;
var mediar = 0;

/* ------------ GRÁFICO ------------------- */

var cont_aprov = 0;
var cont_reprov = 0;
var cont_recup = 0;
var chart;

function contaSituacao() {
  cont_aprov = 0;
  cont_reprov = 0;
  cont_recup = 0;
  let rows = document.getElementsByTagName("output").length;

  for (let i = 0; i < rows; i += 1) {
    let situcao = document.getElementsByTagName("output")[i].id;

    if (situcao.search("situacao") >= 0) {
      let status = document.getElementsByTagName("output")[i].innerText;

      if (status == "Aprovado") {
        cont_aprov += 1;
      }
      if (status == "Reprovado") {
        cont_reprov += 1;
      }
      if (status == "Recuperação") {
        cont_recup += 1;
      }
    }
  }
}

function rayray() {
  contaSituacao();

  var xValues = ["Reprovado", "Aprovado", "Recuperação"];
  var yValues = [cont_reprov, cont_aprov, cont_recup];
  var barColors = ["red", "green", "orange"];

  if (chart) {
    console.log("Gráfico funcionando :D");
    chart.chart.destroy();
  }
  chart = new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Modelo gráfico da situação dos nossos alunos:",
      },
    },
  });

  console.log(chart);
  chart.update();
}

/* ------------ GRÁFICO ------------------- */

/* ------------ Funções ------------------- */

function verificaMedias() {
  for (let y = 1; y <= qtdAlunos; y = y + 1) {
    let media = 0;
    let resultado = 0;

    for (let x = 1; x <= qtdNotas; x++) {
      let nota = parseFloat(document.getElementById(`nota${y}${x}`).value);
      resultado = nota + resultado;
    }

    media = resultado / qtdNotas;

    mediageral = media + mediageral;
    cv += y;

    document.getElementById(`media${y}`).innerText = media;

    if (media >= 50) {
      document.getElementById(`situacao${y}`).innerText = "Aprovado";
      document.getElementById(`situacao${y}`).style.color = "Green";
    } else if (media >= 40 && media < 50) {
      document.getElementById(`situacao${y}`).innerText = "Recuperação";
      document.getElementById(`situacao${y}`).style.color = "Orange";
    } else if (media < 40) {
      document.getElementById(`situacao${y}`).innerText = "Reprovado";
      document.getElementById(`situacao${y}`).style.color = "Red";
    }
  }
  mediar = mediageral / (cv - 1);
  document.getElementById("mediageral1").innerText = mediar;

  /* A verificação de médias funciona com base em pegar o elemento por ID (nota) e fazer um calculo */
  /* e, por fim, atribuir todas as variaveis nota(1,2,3...) a uma outra váriavel (resultado) e dividir pela quantidade de notas. */
  /* já o calculo de média geral faz com que as médias, posteriormente calculadas sejam novamente atribuidas a outra váriavel */
  /*  */
}

function criarLinha() {
  if (qtdAlunos <= 10) {
    qtdAlunos += 1;

    let row;
    let row_data;
    let row_data_input;
    let row_data_output;

    row = document.createElement("tr");
    row_data = document.createElement("td");
    row.setAttribute("id", `linha${qtdAlunos}`);
    row_data_input = document.createElement("input");
    row_data_input.classList.add("form-control");
    row_data_input.setAttribute("id", `nome${qtdAlunos}`);
    row_data_input.type = "text";
    row_data.appendChild(row_data_input);
    row.appendChild(row_data);

    for (let x = 1; x <= qtdNotas; x++) {
      row_data = document.createElement("td");
      row_data.setAttribute("id", `coluna${qtdAlunos}${x}`);
      row_data_input = document.createElement("input");
      row_data_input.classList.add("form-control");
      row_data_input.setAttribute("id", `nota${qtdAlunos}${x}`);
      row_data_input.type = "number";
      row_data_input.min = 0;
      row_data_input.max = 100;
      row_data.appendChild(row_data_input);
      row.appendChild(row_data);
    }

    row_data = document.createElement("td");
    row_data.setAttribute("id", `coluna_media${qtdAlunos}`);
    row_data_output = document.createElement("output");
    row_data_output.setAttribute("id", `media${qtdAlunos}`);
    row_data.appendChild(row_data_output);
    row.appendChild(row_data);

    row_data = document.createElement("td");
    row_data_output = document.createElement("output");
    row_data_output.setAttribute("id", `situacao${qtdAlunos}`);
    row_data.appendChild(row_data_output);
    row.appendChild(row_data);

    document.getElementById("tableBody").appendChild(row);

    /* o método de criar linhas é baseado em buscar no html a linha pré-definida e recriar utilizando o createElement */
    /* Ela é delimitada variavel quantidade de alunos (qtdAlunos), que são no máximo, 10, como mostrado no começo da função. */
  }
}

function deletarLinha() {
  if (qtdAlunos > 1) {
    let child = document.getElementById(`linha${qtdAlunos}`);
    document.getElementById("tableBody").removeChild(child);
    qtdAlunos -= 1;
    /* a função de remover as linhas é simples, ela se baseia em pegar o id linha no html e usar o removechild, que apagará a linha */
    /* diminuindo a quantidade de alunos até que a qtd seja 1, assim o html se limitará a não remover a única linha presente. */
  }
}

function criarColuna() {
  if (qtdNotas < 6) {
    qtdNotas += 1;

    let column;
    let column_media;
    let row_data;
    let row_data_input;

    column = document.createElement("th");
    column.setAttribute("id", `coluna0${qtdNotas}`);
    column.innerHTML = `Nota ${qtdNotas}`;

    column_media = document.getElementById("coluna_media0");
    document.getElementById("linha0").insertBefore(column, column_media);

    for (let x = 1; x <= qtdAlunos; x++) {
      row_data = document.createElement("td");
      row_data.setAttribute("id", `coluna${x}${qtdNotas}`);
      row_data_input = document.createElement("input");
      row_data_input.classList.add("form-control");
      row_data_input.setAttribute("id", `nota${x}${qtdNotas}`);
      row_data_input.type = "number";
      row_data_input.min = 0;
      row_data_input.max = 100;
      row_data.appendChild(row_data_input);
      media = document.getElementById(`coluna_media${x}`);
      console.log(media);
      console.log(row_data);
      document.getElementById(`linha${x}`).insertBefore(row_data, media);

      /* a função de criar coluna */
    }
  }
}

function deletarColuna() {
  if (qtdNotas > 1) {
    for (let x = 0; x <= qtdAlunos; x++) {
      let child = document.getElementById(`coluna${x}${qtdNotas}`);
      console.log(child);
      document.getElementById(`linha${x}`).removeChild(child);
    }

    qtdNotas -= 1;

    /* Se assemelha muito ao deletar linha, utilizando o removechild. */
  }
}

// sort table
var tables = document.querySelectorAll("table.sortable"),
  table,
  thead,
  headers,
  i,
  j;

for (i = 0; i < tables.length; i++) {
  table = tables[i];

  if ((thead = table.querySelector("thead"))) {
    headers = thead.querySelectorAll("th");

    for (j = 0; j < headers.length; j++) {
      headers[j].innerHTML = "<a href='#'>" + headers[j].innerText + "</a>";
    }

    thead.addEventListener("click", sortTableFunction(table));
  }
}

/**
 * cria a função para organizar a tabela
 */
function sortTableFunction(table) {
  return function (ev) {
    if (ev.target.tagName.toLowerCase() == "a") {
      sortRows(table, siblingIndex(ev.target.parentNode));
      ev.preventDefault();
    }
  };
}

/**
 * pega o index de um nodo relativo ao seu filho — o primeiro (mais velho) filho.
 * has index 0, the next index 1, etc.
 */
function siblingIndex(node) {
  var count = 0;

  while ((node = node.previousElementSibling)) {
    count++;
  }

  return count;
}

/**
 * organiza a tabela dada pela coluna númerica (0 é a primeira coluna, etc.)
 */
function sortRows(table, columnIndex) {
  var rows = table.querySelectorAll("tbody tr"),
    sel = "thead th:nth-child(" + (columnIndex + 1) + ")",
    sel2 = "td:nth-child(" + (columnIndex + 1) + ")",
    classList = table.querySelector(sel).classList,
    values = [],
    cls = "",
    allNum = true,
    val,
    index,
    node;

  if (classList) {
    if (classList.contains("date")) {
      cls = "date";
    } else if (classList.contains("number")) {
      cls = "number";
    }
  }

  for (index = 0; index < rows.length; index++) {
    node = rows[index].querySelector(sel2);
    val = node.innerText;

    if (isNaN(val)) {
      allNum = false;
    } else {
      val = parseFloat(val);
    }

    values.push({ value: val, row: rows[index] });
  }

  if (cls == "" && allNum) {
    cls = "number";
  }

  if (cls == "number") {
    values.sort(sortNumberVal);
    values = values.reverse();
  } else if (cls == "date") {
    values.sort(sortDateVal);
  } else {
    values.sort(sortTextVal);
  }

  for (var idx = 0; idx < values.length; idx++) {
    table.querySelector("tbody").appendChild(values[idx].row);
  }
}

/**
 * compara 2 'value objects' numericamente
 */
function sortNumberVal(a, b) {
  return sortNumber(a.value, b.value);
}

/**
 * comparação de organização númerica
 */
function sortNumber(a, b) {
  return a - b;
}

/**
 * compara 2 'value objects' como datas
 */
function sortDateVal(a, b) {
  var dateA = Date.parse(a.value),
    dateB = Date.parse(b.value);

  return sortNumber(dateA, dateB);
}

/**
 * compara 2 'value objects' como texto simples; case-insensitive
 */
function sortTextVal(a, b) {
  var textA = (a.value + "").toUpperCase();
  var textB = (b.value + "").toUpperCase();

  if (textA < textB) {
    return -1;
  }

  if (textA > textB) {
    return 1;
  }

  return 0;
}

function sortTable(n) {
  // pega o id da tabela
  var table;
  table = document.getElementById("tableBody");
  var rows,
    i,
    x,
    y,
    count = 0;
  var switching = true;

  // A Ordem está para crescente.
  var direction = "ascending";

  // faz um loop até que a troca não seja mais necessária.
  while (switching) {
    switching = false;
    var rows = table.rows;

    //faz um loop por todas as linhas
    for (i = 0; i < rows.length - 1; i++) {
      var Switch = false;

      // verifica se os 2 elementos precisam ser comparados
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      console.log(x.childNodes[0].value.toLowerCase());
      console.log(y.childNodes[0].value.toLowerCase());

      // checa se 2 linhas precisam ser trocadas
      if (
        x.childNodes[0].value.toLowerCase() >
        y.childNodes[0].value.toLowerCase()
      ) {
        // se sim, marca o switch como necessário e quebra o loop
        Switch = true;

        break;
      }
    }
    if (Switch) {
      // função para trocar linhas e marcar switch como completo
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      // aumenta o contador conforme quantidade de linhas trocadas.
      count++;
    }
  }
}
