'use strict';

Items.all = [];
Items.newArray = [];
Items.previousArray = [];
Items.totalClicks = 0;
Items.pictures = document.getElementById('pictures');
Items.pictures.addEventListener('click', handleClick);

function Items(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  this.conversion = 0;
  Items.all.push(this);
}

new Items('bag', 'img/bag.jpg');
new Items('banana', 'img/banana.jpg');
new Items('bathroom', 'img/bathroom.jpg');
new Items('boots', 'img/boots.jpg');
new Items('breakfast', 'img/breakfast.jpg');
new Items('bubblegum', 'img/bubblegum.jpg');
new Items('chair', 'img/chair.jpg');
new Items('cthulhu', 'img/cthulhu.jpg');
new Items('dogduck', 'img/dog-duck.jpg');
new Items('dragon', 'img/dragon.jpg');
new Items('pen', 'img/pen.jpg');
new Items('petsweep', 'img/pet-sweep.jpg');
new Items('scissors', 'img/scissors.jpg');
new Items('shark', 'img/shark.jpg');
new Items('sweep', 'img/sweep.png');
new Items('tauntaun', 'img/tauntaun.jpg');
new Items('unicorn', 'img/unicorn.jpg');
new Items('usb', 'img/usb.gif');
new Items('watercan', 'img/water-can.jpg');
new Items('wineglass', 'img/wine-glass.jpg');

function checkDupes() {
  do {
    var num1 = Math.floor(Math.random() * Items.all.length);
  } while (Items.newArray.includes(num1) || Items.previousArray.includes(num1));
  do {
    var num2 = Math.floor(Math.random() * Items.all.length);
  } while (Items.newArray.includes(num2) || Items.previousArray.includes(num2) || num1 === num2);
  do {
    var num3 = Math.floor(Math.random() * Items.all.length);
  } while (Items.newArray.includes(num3) || Items.previousArray.includes(num3) || num1 === num3 || num2 === num3);
  Items.newArray = [num1, num2, num3];
  Items.previousArray = Items.newArray;
}

function renderItems() {
  checkDupes();
  for (var i = 0; i < Items.newArray.length; i++) {
    var imgEl = document.createElement('img');
    imgEl.src = Items.all[Items.newArray[i]].path;
    imgEl.id = Items.all[Items.newArray[i]].name;
    Items.all[Items.newArray[i]].views++;
    Items.pictures.appendChild(imgEl);
  }
}

renderItems();

function handleClick(event){
  Items.totalClicks += 1;
  if(Items.totalClicks > 24) {
    Items.pictures.removeEventListener('click', handleClick);
    calcConversion();
  }
  for (var i = 0; i < Items.all.length; i++) {
    if (event.target.id === Items.all[i].name) {
      Items.all[i].clicks++;
      Items.pictures.innerHTML = '';
      renderItems();
    }
  }
}

function calcConversion() {
  for (var i = 0; i < Items.all.length; i++) {
    if (Items.all[i].views === 0) {
      console.log(Items.all[i].name + ' has no views');
      Items.all[i].conversion = 'NA';
    } else {
      Items.all[i].conversion = Items.all[i].clicks / Items.all[i].views;
      console.log(Items.all[i].conversion);
    }
  }
}
