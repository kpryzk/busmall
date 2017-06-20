'use strict';
//two arrays that will hold three objects each, comparing with each other to prevent duplication
var newItems = [];
var lastItems = [];
//where all items will be initially pushed and pulled from
var allItems = [];
//to count how many clicks up to 25
var loops = 0;
//which thing they clicked
var itemClicked = [];
var container = document.getElementById('photos');
var itemOne = document.getElementById('itemone');
var itemTwo = document.getElementById('itemtwo');
var itemThree = document.getElementById('itemthree');

container.addEventListener('click', handleClick);

function Item (name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.timesShown = 0;
  allItems.push(this);
}

var bag = new Item('bag', 'img/bag.jpg');
var banana = new Item('banana', 'img/banana.jpg');
var bathroom  = new Item('bathroom', 'img/bathroom.jpg');
var boots = new Item('boots', 'img/boots.jpg');
var breakfast = new Item('breakfast', 'img/breakfast.jpg');
var bubblegum = new Item('bubblegum', 'img/bubblegum.jpg');
var chair = new Item('chair', 'img/chair.jpg');
var cthulhu = new Item('cthulhu', 'img/cthulhu.jpg');
var dogduck = new Item('dogduck', 'img/dog-duck.jpg');
var dragon = new Item('dragon', 'img/dragon.jpg');
var pen = new Item('pen', 'img/pen.jpg');
var petsweep = new Item('petsweep', 'img/pet-sweep.jpg');
var scissors = new Item('scissors', 'img/scissors.jpg');
var shark = new Item('shark', 'img/shark.jpg');
var sweep = new Item('sweep', 'img/sweep.png');
var tauntaun = new Item('tauntaun', 'img/tauntaun.jpg');
var unicorn = new Item('unicorn', 'img/unicorn.jpg');
var usb = new Item('usb', 'img/usb.gif');
var watercan = new Item('watercan', 'img/water-can.jpg');
var wineglass = new Item('wineglass', 'img/wine-glass.jpg');


function randomNumber() {
  return Math.floor(Math.random() * allItems.length);
}
console.log(randomNumber());

// function checkDupe(array, value){
//   for (var i = 0; i < allItems.length; i++) {
//     if (value === array) {
//       return false;
//     }
//   }
//   return true;
// }

function renderItem() {
  var current = [];
  while (newItems.length < 3) {
    for (var i = 0; i < allItems.length; i++) {
      var imgEl = document.createElement('img');
      imgEl.src = allItems[randomNumber()].path;
      newItems.push(imgEl.src);
    }
    itemOne.appendChild(imgEl);
  }
}

renderItem();

function handleClick(event) {
  if(event.target.id === 'itemOne') {
    renderItem();
  }
}
