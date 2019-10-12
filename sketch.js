var size = 40;
var grid = [];
var w = 600;
var h = 600;
var cols = (w / size);
var rows = (h / size);

var caminho = [];
var personagens = [];

var pintura;
var ladrao;

var cont = 0;

function setup() {
  createCanvas(w, h);

  for (let x = 0; x <= rows; x++) {
    let aux = [];
    for (let y = 0; y <= cols; y++) {
      let node = new Node(x, y, size);
      aux.push(node);
    }
    grid.push(aux);
  }
}

function draw() {
  background(220);

  if (personagens[0] != undefined) {
    let p = personagens[0];
    ladrao = new Node(p.x, p.y, size);

    ladrao.visitada = true;
    ladrao.ladrao = true;

    grid[p.x][p.y] = ladrao;
  }
  if (personagens[1] != undefined) {
    let p = personagens[1];
    pintura = new Node(p.x, p.y, size);

    pintura.visitada = true;
    pintura.pintura = true;

    grid[p.x][p.y] = pintura;
  }

  for (let row of grid) {
    for (let node of row) {
      if (node.pintura)
        pintura = node;
      if (node.ladrao)
        ladrao = node;
      node.show();
    }
  }

  if (personagens.length == 2) {

    Procurar(ladrao, pintura);
    frameRate(10);

  }




}

function Procurar(ladrao, pintura) {

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

      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y == r.pos.y)
        d = r;
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y == r.pos.y)
        e = r;
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y - 1 == r.pos.y)
        eb = r;
      if (ladrao.pos.x - 1 == r.pos.x && ladrao.pos.y + 1 == r.pos.y)
        ec = r;
      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y + 1 == r.pos.y)
        db = r;
      if (ladrao.pos.x + 1 == r.pos.x && ladrao.pos.y - 1 == r.pos.y)
        dc = r;
      if (ladrao.pos.x == r.pos.x && ladrao.pos.y - 1 == r.pos.y)
        c = r;
      if (ladrao.pos.x == r.pos.x && ladrao.pos.y + 1 == r.pos.y)
        b = r;

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
  for (let y = 1; y < ordenada.length; y++) {
    if (ordenada[y] != undefined)
      ordenada[y].sendoAnalisada = false;
  }

  if (melhor.sendoAnalisada && melhor.pintura) {
    // background(125);

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

function mouseClicked() {

  if (cont < 2) {
    var x = Math.floor(mouseX / size);
    var y = Math.floor(mouseY / size);

    personagens.push({
      "x": x,
      "y": y
    });
  }

  // prevent default
  return false;
}