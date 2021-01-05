class colorCenter{
  constructor(id, x, y, c, name = null){
    this.id = id;
    if(name !== null){
      this.name = name;
    }else{
      this.name = "Color " + id;
    }
    this.x = x;
    this.y = y;
    this.c = c;
    this.size = 10;
    this.dstToM = 0;
    this.dstTo = 0;
  }
  
  show(){
    let mouseIn = this.mouseWithin(2);
    push();
    translate(this.x, this.y);
    if(mouseIn){
      fill(255);
      stroke(0);
      strokeWeight(2);
      cursor(HAND);
      //stroke("#FF0000");
      //push();
      //translate(this.x, this.y);
      //let p = this.size * 0.7;
      //line(p, p, -p, -p);
      //line(-p, p, p, -p);
      //pop();
    }
    noStroke(0);
    fill(0);
    text(this.name, 15, 0);
    ellipse(0, 0,this.size);
    pop();
  }
  
  highlight(){
    noFill();
    stroke(0);
    strokeWeight(1);
    line(this.x, this.y, mouseX, mouseY);
    //ellipse(this.x, this.y, this.size*2);
  }
  
  select(){
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size*2);
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
