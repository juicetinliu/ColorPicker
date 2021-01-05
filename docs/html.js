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
  
  let text1 = createDiv('Click on canvas to create a new color-group node.');
  text1.class('text');
  text1.parent(containerTextPanel);
  
  let text2 = createDiv('Select existing nodes to modify names/delete.');
  text2.class('text');
  text2.parent(containerTextPanel);
  
  let text3 = createDiv('Press \'x\' to toggle between visualizations');
  text3.class('text');
  text3.parent(containerTextPanel);
  
  let containerGenPanel = createDiv();
  containerGenPanel.class('container vert');
  containerGenPanel.parent(containerSidePanel);
  
  paneMenu = createDiv();
  paneMenu.class('ccmenu hor unhide');
  paneMenu.parent(containerGenPanel);
  
  cCPane = createDiv();
  cCPane.class('pane');
  cCPane.parent(paneMenu);
  
  cCName = createDiv('Hover over canvas!');
  cCName.class('panetext');
  cCName.parent(paneMenu);
  
  cCMenu = createDiv();
  cCMenu.class('ccmenu hor hide');
  cCMenu.parent(containerGenPanel);
  
  let cCNameLabel = createDiv('Name:');
  cCNameLabel.class('inplabel');
  cCNameLabel.parent(cCMenu);
  
  cCNameInput = createInput('');
  cCNameInput.size(100);
  cCNameInput.parent(cCMenu);
  cCNameInput.input(changeCCName);
  
  cCDelete = createSpan();
  cCDelete.class('smallbutts smallicon');
  cCDelete.mousePressed(deletecC);
  cCDelete.parent(cCMenu);
  cCDelete.attribute('title', "Delete this node");
  
  let cCDeleteIcon = createImg('delete.png', 'Delete node');
  cCDeleteIcon.style('width: 20px');
  cCDeleteIcon.parent(cCDelete);
  
  //let containerMiscPanel = createDiv();
  //containerMiscPanel.class('container vert');
  //containerMiscPanel.parent(containerSidePanel);
  
  miscMenu = createDiv();
  miscMenu.class('ccmenu hor unhide');
  miscMenu.parent(containerGenPanel);
  miscMenu.style('margin-top', '30px');
  
  let cCRestoreDef = createSpan();
  cCRestoreDef.class('butts icon');
  cCRestoreDef.mousePressed(restoreDefCC);
  cCRestoreDef.parent(miscMenu);
  cCRestoreDef.attribute('title', "Restore to default");
  
  let cCRestoreIcon = createImg('default.png', 'Restore to default');
  cCRestoreIcon.style('width: 40px');
  cCRestoreIcon.parent(cCRestoreDef);
  
  let cCDeleteAll = createSpan();
  cCDeleteAll.class('butts icon');
  cCDeleteAll.mousePressed(deleteAllCC);
  cCDeleteAll.parent(miscMenu);
  cCDeleteAll.attribute('title', "Delete all nodes");
  
  let cCDeleteAllIcon = createImg('deleteall.png', 'Delete all nodes');
  cCDeleteAllIcon.style('width: 40px');
  cCDeleteAllIcon.parent(cCDeleteAll);
  
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

function deleteAllCC(){
  idCount = 0;
  centers = [];
  selCenters = [];
  changed = true;
}

function changeCCName(){
  selCenters[0].name = this.value();
}

function restoreDefCC(){
  centers = defCenters.slice();
  selCenters = [];
  changed = true;
}
