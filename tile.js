class Tile {
    constructor(kleur, index) {
      this.index = index
      this.number = index;
      this.x = this.index % cols*scl;
      this.y = row(this.index)*scl;
      this.kleur = kleur;
    }
    
    show() {
      stroke(0,0,0,1);
      fill(this.kleur);
      rect(this.x,this.y,scl,scl);
      stroke(0,0,0,1);
      fill(0,0,0,1);
      textSize(44);
      textStyle(BOLD);
      text(this.number,this.x+scl/2,this.y+scl/2)
    }
    
    newIndex(index) {
      this.index = index
      this.x = this.index % cols*scl;
      this.y = row(this.index)*scl;
    }
  }