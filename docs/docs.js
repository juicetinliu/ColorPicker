let palette, voronoi;
let type = 0;
let changed = true;
let centers = [];

let offX = 100;
let offY = 100;

function setup() {
  let maincontainer = createDiv();
  maincontainer.class('main');

  let canvcontainer = createDiv();
  canvcontainer.class('container');
  canvcontainer.parent(maincontainer);
  
  let canv = createCanvas(600, 600);
  canv.parent(canvcontainer);
  
  colorMode(HSB, 100);
  palette = createImage(400, 400);
  voronoi = createImage(400, 400);
  createPalette();
  colorMode(RGB, 255);
}


function draw() {
  background("#e9e9e9");
  image(palette, offX, offY);
  image(voronoi, offX, offY);
  if(centers.length){
    if(changed){
      if(type == 0){
        colorVoronoi();
      }else{
        edgeVoronoi();
      }
      changed = false;
    }
    centers.forEach(c => {c.show(); c.saveDistToM();});
    centers.sort(function(a, b){
      return a.dstToM - b.dstToM;
    });
    centers[0].highlight();
    
  }
  
}

function colorVoronoi(){
  voronoi.loadPixels();
  for(x = 0; x < 400; x++){
    for(y = 0; y < 400; y++){
      centers.sort(function(a, b){
        return a.distTo(x + offX, y + offY) - b.distTo(x + offX, y + offY);
      });
      voronoi.set(x,y, centers[0].c);
    }
  } 
  voronoi.updatePixels();
}

function edgeVoronoi(){
  if(centers.length >= 2){
    voronoi.loadPixels();
    for(x = 0; x < 400; x++){
      for(y = 0; y < 400; y++){
        centers.sort(function(a, b){
          return a.saveDistTo(x + offX, y + offY) - b.saveDistTo(x + offX, y + offY);
        });
        if(abs(centers[0].dstTo - centers[1].dstTo) < 1){
          voronoi.set(x,y, 0);
        }else{
          voronoi.set(x,y, [0,0,0,0]);
        }
      }
    } 
    voronoi.updatePixels();
  }
}

function createPalette(){
  palette.loadPixels();
  for(let h = 0; h < 400; h++){
    for(let s = 0; s < 400; s++){
      palette.set(h, s, color(h/4, s/4, 100));
    }
  }
  palette.updatePixels(); 
}

function mousePressed(){
  if(mouseX > offX && mouseX < offX + 400 && mouseY > offY && mouseY < offY + 400){ 
    let add = true;
    if(centers.length){
      centers.forEach(c => {
        if(c.mouseWithin(2)){ add = false; }
      });
    }
    if(add){
      centers.push(new colorCenter(mouseX, mouseY, palette.get(mouseX - 100,mouseY - 100)));
      changed = true;
    }
  }
}

function keyPressed(){
  if(key === 'x'){
    type = (type == 0) ? 1 : 0;
    changed = true;
  }
}
