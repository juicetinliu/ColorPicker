function clearImage(img){
  img.loadPixels();
  for(x = 0; x < 400; x++){
    for(y = 0; y < 400; y++){
      img.set(x,y, [0,0,0,0]);
    }
  } 
  img.updatePixels();
}

function pointInRect(x, y, rx, ry, rw, rh){
  return x > rx && x < rx + rw && y > ry && y < ry + rh;
}

let defCentersRaw = [['Purple', 320.5, 379.5], ['Violet', 304.5, 379.5], ['Navy', 274.5, 379.5], ['Magenta', 351.5, 381.5], ['Light Purple', 306.5, 98.5], ['Blue', 211.5, 378.5], ['Cyan', 193.5, 378.5], ['Light Blue', 236.5, 101.5], ['Light Green', 159.5, 101.5], ['Green', 115.5, 377.5], ['Lime', 90.5, 377.5], ['Yellow', 58.5, 377.5], ['Light Yellow', 79.5, 94.5], ['Light Orange', 54.5, 93.5], ['Orange', 26.5, 375.5], ['Red', 4.5, 375.5], ['Pink', 375.5, 113.5], ['Pink', 11.5, 93.5], ['White', 320.5, 13.5], ['White', 379.5, 16.5], ['White', 248.5, 13.5], ['White', 185.5, 14.5], ['White', 131.5, 15.5], ['White', 73.5, 13.5], ['White', 24.5, 13.5]];

function createCenters(){
  defCentersRaw.forEach(c => {
    idCount++; 
    defCenters.push(new colorCenter(idCount, c[1], c[2], palette.get(c[1], c[2]), c[0]));
  });
  centers = defCenters;
}
