var cols = 4; //number of columns, and also number of rows.
var scl;
var tiles = [];
var tileA, tileB; //swaptiles
var openTileIndex = (cols * cols) - 1; //bottom right

function setup() {
  var size = min(windowWidth,windowHeight)
  createCanvas(size,size);
  colorMode(HSB, 360, 100, 100, 1);
  textFont('Tahoma');
  textSize(20);
  scl = width / cols;

  var hueSetoff = 360 / (cols * cols)

  for (let i = 0; i < (cols * cols) - 1; i++) {
    tile = new Tile(color(i * hueSetoff, 70, 70), i)
    tiles.push(tile);
  }
  openTile = new Tile(color(0, 0, 0), openTileIndex)
  tiles.push(openTile);

  //shuffle
  for (let i = 0; i < 50; i++) {
    tile = randomAdjacentTile(openTileIndex);
    swapTiles(tiles[openTileIndex], tiles[tile])
  }
}

function draw() {
  background(220);

  for (let t of tiles) {
    t.show();
  }

  noLoop();
}


//helpers
function row(index) {
  return (Math.floor(index / cols));
}

function swapTiles(tileA, tileB) {
  var a = tileA.index;
  var b = tileB.index;
  if (
    
    (a == openTileIndex || b == openTileIndex) &&
    
    a != b && (
      
      b == a - cols ||
    
      b == a + cols ||
      
      ((b == a - 1 || b == a + 1) && row(b) == row(a))
    )
  ) {
    //swap tiles
    tileB.newIndex(a);
    tileA.newIndex(b);
    tiles[a] = tileB;
    tiles[b] = tileA;
    if (a == openTileIndex) {
      openTileIndex = b;
    } else {
      openTileIndex = a;
    }
  }

  //reset selected tiles
  tileA = null;
  tileB = null;
}

function randomAdjacentTile(index) {
  adjacentTiles = [index + 1,
    index - 1,
    index + cols,
    index - cols
  ]
  do {
    tile = random(adjacentTiles)
  }
  while (!(
      
      (tile == index - cols && tile >= 0) ||

      (tile == index + cols && tile < tiles.length - 1) ||
      
      ((tile == index - 1 || tile == index + 1) && row(tile) == row(index))
    ))
  return tile
}

//Mouse interactions
function mouseReleased() {
  looping = true;
  if (mouseX > 0 && mouseX < width &&
    mouseY > 0 && mouseY < height) {
    //mouse coordinaten to index
    let tileIndex = floor((mouseX / scl) % cols) + (floor(mouseY / scl) * cols);
    tileB = tiles[tileIndex];
  }

  if (tileA && tileB) {
    swapTiles(tileA, tileB);
    //redraw board
    draw();
  }
}

function mousePressed() {
  looping = true;
  if (mouseX > 0 && mouseX < width &&
    mouseY > 0 && mouseY < height) {
    //mouse coordinaten to index
    let tileIndex = floor((mouseX / scl) % cols) + (floor(mouseY / scl) * cols);
    tileA = tiles[tileIndex];
  }
}
