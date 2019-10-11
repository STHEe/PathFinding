var size = 40;
var grid = [];
var w = 600;
var h = 600;
var cols = (w / size);
var rows = (h / size);

var caminho = [];

function setup() {
  createCanvas(w, h);

  let ladrao = gerarPos(rows, cols);
  let pintura = gerarPos(rows, cols);

  if (ladrao == undefined)
    ladrao = gerarPos(rows, cols);
  if (pintura == undefined)
    pintura = gerarPos(rows, cols);


  for (let x = 0; x <= rows; x++) {
    let aux = [];
    for (let y = 0; y <= cols; y++) {
      let node = new Node(x, y, size);
      if (ladrao.x == x && ladrao.y == y) {
        node.visitada = true;
        node.ladrao = true;
        aux.push(node);
      } else if (pintura.x == x && pintura.y == y) {
        node.visitada = true;
        node.pintura = true;
        aux.push(node);
      } else {
        aux.push(node);
      }
    }
    grid.push(aux);
  }

}

function draw() {
  background(220);

  let ladrao;
  let pintura;

  for (let row of grid) {
    for (let node of row) {
      if (node.pintura)
        pintura = node;
      if (node.ladrao)
        ladrao = node;
      node.show();
    }
  }

  Procurar(ladrao, pintura);

  frameRate(15);
}

function Procurar(ladrao, pintura) {
  console.log(ladrao, pintura)

  let adj = [];
  let e;
  let d;
  let c;
  let b;
  let ec;
  let eb;
  let dc;
  let db;

  for (let x in grid) {
    for (let y in grid[x]) {
      let r = grid[x][y];

      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y == r.pos.y) {
        //DIREITA
        d = r;
      }
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y == r.pos.y) {
        //ESQUERDA        
        e = r;
      }
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y - 1 == r.pos.y) {
        //ESQUERDA BAIXO
        eb = r;
      }
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y + 1 == r.pos.y) {
        //ESQUERDA CIMA
        ec = r;
      }
      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y + 1 == r.pos.y) {
        //DIREITA BAIXO
        db = r;
      }
      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y - 1 == r.pos.y) {
        //DIREITA CIMA
        dc = r;
      }
      if (ladrao.pos.x == r.pos.x && ladrao.pos.y - 1 == r.pos.y) {
        // CIMA
        c = r;
      }
      if (ladrao.pos.x == r.pos.x && ladrao.pos.y + 1 == r.pos.y) {
        // BAIXO
        b = r;
      }
    }
  }

  adj.push(e, d, c, b, ec, eb, dc, db)

  adj.map(node => {
    if (node != undefined) {
      node.sendoAnalisada = true;
      node.update();
      node.calcularD(pintura);
      node.mostrarD();
    }
  });

  let ordenada = adj.sort((a, b) => (a.d > b.d) ? 1 : -1);
  let melhor = ordenada[0];
  for (let y = 1; y < ordenada.length; y ++){
    if (ordenada[y] != undefined)
      ordenada[y].sendoAnalisada = false;
  }

  if (melhor.sendoAnalisada && melhor.pintura) {
//     background(125);

//     for (let x = 0; x <= rows; x++) {
//       for (let y = 0; y <= cols; y++) {
//         rect(x * size, y * size, size, size)
//         fill(150)
//       }
//     }

//     //desenhar o inicial da pintura
//     rect(pintura.x, pintura.y, pintura.t, pintura.t);
//     fill(0, 0, 255);
//     //desenhar o inicial do ladrao
//     rect(ladrao.x, ladrao.y, ladrao.t, ladrao.t);
//     fill(255, 0, 0);
//     //desenha o caminho melhor
//     caminho.map(way => {
//       let node = grid[way.x][way.y];
//       rect(node.x, node.y, node.t, node.t);
//       fill(0, 0, 255, 150);
//     });

    console.log("CHEGOU")
    
    noLoop();
  }

  if (melhor.visitada) {
    melhor = ordenada[ordenada.indexOf(melhor) + 1]
  }



  grid[ladrao.pos.x - 1][ladrao.pos.y - 1].ladrao = false;
  grid[ladrao.pos.x - 1][ladrao.pos.y - 1].visitada = true;

  grid[melhor.pos.x - 1][melhor.pos.y - 1].ladrao = true;

  caminho.push({
    "x": melhor.pos.x - 1,
    "y": melhor.pos.y - 1
  })

}















function gerarPos(rows, cols) {
  return createVector(
    Math.round(random(rows)), Math.round(random(cols))
  )
}