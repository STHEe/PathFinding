class Node {
  constructor(x, y, tamanho) {
    this.t = tamanho;
    this.x = x * tamanho;
    this.y = y * tamanho;
    this.d = null;

    this.pos = new createVector(x + 1, y + 1);
    this.ladrao = false;
    this.pintura = false;
    this.sendoAnalisada = false;
    this.visitada = false;
  }


  show() {
    if (this.ladrao)
      fill(255, 0, 0);
    else if (this.pintura)
      fill(0, 0, 255);
    else if (this.sendoAnalisada)
      fill(0, 255, 125, 100);
    else
      fill(125, 125, 125);


    if (this.visitada && !this.ladrao && !this.pintura && !this.sendoAnalisada)
      fill(0, 100, 150)


    rect(this.x, this.y, this.t, this.t);

  }


  calcularD(pintura) {
    let x2 = pintura.pos.x;
    let y2 = pintura.pos.y;
    let x1 = this.pos.x;
    let y1 = this.pos.y;

    this.d = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

  }

  update() {
    this.show();
  }

  mostrarD() {
    fill(0);
    text(this.d == null ? '' : this.d.toFixed(2), this.x + (this.t / 3.8), this.y + (this.t / 1.5))
  }

}