function setupHTML(){
  let maincontainer = createDiv();
  maincontainer.class('main');

  let canvcontainer = createDiv();
  canvcontainer.class('container');
  canvcontainer.parent(maincontainer);
  
  let containerSidePanel = createDiv();
  containerSidePanel.class('side vert');
  containerSidePanel.parent(maincontainer);
  
  let containerTextPanel = createDiv();
  containerTextPanel.class('container vert');
  containerTextPanel.parent(containerSidePanel);
  
  let text1 = createDiv('Click on canvas to create a new color group.');
  text1.class('text');
  text1.parent(containerTextPanel);
  
  let text2 = createDiv('Select existing nodes to modify names/delete.');
  text2.class('text');
  text2.parent(containerTextPanel);
  
  let containerGenPanel = createDiv();
  containerGenPanel.class('container vert');
  containerGenPanel.parent(containerSidePanel);
  
  paneMenu = createDiv();
  paneMenu.class('ccmenu hor unhide');
  paneMenu.parent(containerGenPanel);
  
  cCPane = createDiv();
  cCPane.class('pane');
  cCPane.parent(paneMenu);
  
  cCName = createDiv();
  cCName.class('panetext');
  cCName.parent(paneMenu);
  
  cCMenu = createDiv();
  cCMenu.class('ccmenu hor hide');
  cCMenu.parent(containerGenPanel);
  
  let cCNameLabel = createDiv('Name:');
  cCNameLabel.class('inplabel');
  cCNameLabel.parent(cCMenu);
  
  cCNameInput = createInput('');
  cCNameInput.parent(cCMenu);
  cCNameInput.input(changeCCName);
  
  cCDelete = createDiv();
  cCDelete.class('delbutt');
  cCDelete.mousePressed(deletecC);
  cCDelete.parent(cCMenu);
  
  let cCDeleteIcon = createImg('delete.png', 'Delete node');
  cCDeleteIcon.style('width: 20px');
  cCDeleteIcon.parent(cCDelete);
  
  let canv = createCanvas(canvX, canvY);
  canv.parent(canvcontainer);  
  
  let containerBottom = createDiv();
  containerBottom.class('bot hor');
  containerBottom.parent(containerSidePanel);
  
  let gitButton = createA('https://github.com/juicetinliu/ColorPicker', '', target="_blank" );
  gitButton.class('butts icon');
  gitButton.parent(containerBottom);
  
  let p5Button = createA('https://p5js.org', '', target="_blank" );
  p5Button.class('butts icon');
  p5Button.parent(containerBottom);

  let gitIcon = createImg('github.png', 'the p5 magenta asterisk');
  gitIcon.style('width: 40px');
  gitIcon.parent(gitButton);
  
  let p5Icon = createImg('https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk');
  p5Icon.style('width: 40px');
  p5Icon.parent(p5Button);
}

function deletecC(){
  centers.splice(centers.indexOf(selCenters[0]), 1);
  selCenters = [];
  changed = true;
}

function changeCCName(){
  selCenters[0].name = this.value();
}
