let canvX = 400, canvY = 400;

let idCount = 0;
let palette, voronoi;
let voronoiType = 1; //0: color; 1: lines
let menuType = 0; //0: paneMenu; 1: cCMenu
let changed = true;
let defCenters = [];
let centers = [];
let selCenters = [];

let offX = 0;
let offY = 0;

let cCNameInput, cCMenu, paneMenu, cCPane, cCName;

function setup() {
  setupHTML();
  
  colorMode(HSB, 100);
  palette = createImage(canvX, canvY);
  voronoi = createImage(canvX, canvY);
  createPalette();
  colorMode(RGB, 255);
  
  createCenters();
}


function draw() {
  background("#e9e9e9");
  if(changed){
    if(voronoiType == 0){
      colorVoronoi();
    }else{
      edgeVoronoi();
    }
    changed = false;
  }
  image(palette, offX, offY);
  image(voronoi, offX, offY);
  
  let closestCC = "N/A";
  if(centers.length){
    let cursorHand = false;
    centers.forEach(c => {
      if(c.mouseWithin(2)){ 
        cursorHand = true;
      }
      c.saveDistToM();});
    if(cursorHand){
      cursor(HAND);
    }else{
      cursor(ARROW);
    }
    centers.sort(function(a, b){
      return a.dstToM - b.dstToM;
    });
    if(menuType === 0 && pointInRect(mouseX, mouseY, offX, offY, canvX, canvY)){
      centers[0].highlight();
      cursor(CROSS);
      closestCC = centers[0].name;
    }
    centers.forEach(c => {c.show();});
    selCenters.forEach(c => {c.select();});
  }
  if(menuType === 0 && pointInRect(mouseX, mouseY, offX, offY, canvX, canvY)){
    let palettecolor = color(palette.get(min(max(mouseX, 0), canvX - 1) ,min(max(mouseY, 0), canvY - 1)));
    cCPane.style('background-color', palettecolor.toString("rrggbb"));
    cCName.html(closestCC);
  }
}

function colorVoronoi(){
  if(centers.length){
    voronoi.loadPixels();
    for(x = 0; x < canvX; x++){
      for(y = 0; y < canvY; y++){
        centers.sort(function(a, b){
          return a.distTo(x + offX, y + offY) - b.distTo(x + offX, y + offY);
        });
        voronoi.set(x,y, centers[0].c);
      }
    } 
    voronoi.updatePixels();
  }else{
    clearImage(voronoi);
  }
}

function edgeVoronoi(){
  if(centers.length >= 2){
    voronoi.loadPixels();
    for(x = 0; x < canvX; x++){
      for(y = 0; y < canvY; y++){
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
  }else{
    clearImage(voronoi);
  }
}

function createPalette(){
  palette.loadPixels();
  for(let h = 0; h < canvX; h++){
    for(let s = 0; s < canvY; s++){
      palette.set(h, s, color(h/4, s/4, 100));
    }
  }
  palette.updatePixels(); 
}

function mousePressed(){
  if(pointInRect(mouseX, mouseY, offX, offY, canvX, canvY)){ 
    let add = true;
    let selectedCenter = null;
    if(centers.length){
      centers.forEach(c => {
        if(c.mouseWithin(2)){ 
          add = false; 
          selectedCenter = c;
        }
      });
    }
    if(add){
      idCount++; 
      let newCCenter = new colorCenter(idCount, mouseX, mouseY, palette.get(mouseX - offX,mouseY - offY));
      centers.push(newCCenter);
      selCenters = [];
      selCenters.push(newCCenter);
      changed = true;
    }else{
      let selIdx = selCenters.indexOf(selectedCenter);
      if(selIdx !== -1){
        selCenters = [];
      }else{
        selCenters = [];
        selCenters.push(selectedCenter);
      }
      changed = true;
    }
  }
  if(selCenters.length === 1){
    menuType = 1;
    paneMenu.class("ccmenu hor hide");
    cCMenu.class("ccmenu hor unhide");
    cCNameInput.value(selCenters[0].name);
  }else{
    menuType = 0;
    paneMenu.class("ccmenu hor unhide");
    cCMenu.class("ccmenu hor hide");
  }
}

function keyPressed(){
  if(key === 'x'){
    voronoiType = (voronoiType == 0) ? 1 : 0;
    changed = true;
  }
}
