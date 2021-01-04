class colorCenter{
  constructor(x, y, c){
    this.name = "Untitled";
    this.x = x;
    this.y = y;
    this.c = c;
    this.size = 10;
    this.dstToM = 0;
    this.dstTo = 0;
  }
  
  show(){
    stroke(0);
    strokeWeight(1);
    fill(this.c);
    text(this.name, this.x+10, this.y);
    ellipse(this.x,this.y,this.size);
  }
  
  highlight(){
    noFill();
    stroke(0);
    ellipse(this.x, this.y, this.size * 2);
  }
  
  within(x, y){
    return dist(x, y, this.x, this.y) < this.size/2;
  }
  
  mouseWithin(spacing = 1){
    return dist(mouseX, mouseY, this.x, this.y) < (this.size * spacing/2);
  }
  
  saveDistToM(){
    this.dstToM = this.distTo(mouseX,mouseY); 
  }
  
  saveDistTo(x, y){
    this.dstTo = this.distTo(x, y); 
    return this.dstTo;
  }
  
  distTo(x, y){
    return dist(x, y, this.x, this.y);
  }
}
