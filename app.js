'use strict';

Items.all = [];
Items.newArray = [];
Items.previousArray = [];
Items.totalClicks = 0;
Items.pictures = document.getElementById('pictures');
Items.pictures.addEventListener('click', handleClick);
Items.title = [];
Items.converted = [];

function Items(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  this.conversion = 0;
  Items.all.push(this);
}

function pushThing(otherThing) {
  localStorage.clear();
  var otherThingJSON = JSON.stringify(otherThing);
  localStorage.things = otherThingJSON;
  }

function pullThing() {
  var retrievedThing = localStorage.things;
  var parsedThing = JSON.parse(retrievedThing);
  for (var i = 0; i < parsedThing.length; i ++) {
    Items.all[i] = parsedThing[i];
  }
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

function calcConversion() {
  for (var i = 0; i < Items.all.length; i++) {
    if (Items.all[i].views === 0) {
      Items.all[i].conversion = 'NA';
    } else {
      Items.all[i].conversion = ((Items.all[i].clicks / Items.all[i].views) * 100);
      Items.converted.push(Items.all[i].conversion);
      Items.title.push(Items.all[i].name);
    }
  }
}

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
  if(Items.totalClicks === 25) {
    // var buttonEl = document.createElement('button');
    Items.pictures.innerHTML = '';
    // Items.pictures.appendChild(buttonEl);
    Items.pictures.removeEventListener('click', handleClick);
    calcConversion();
    chartchart();
  }
  for (var i = 0; i < Items.all.length; i++) {
    if (event.target.id === Items.all[i].name) {
      Items.all[i].clicks++;
      Items.pictures.innerHTML = '';
      renderItems();
    }
  }
}

function chartGarbage() {
  for (var i = 0; i < Items.all[i].length; i++) {
    Items.converted.push(Items.all[i].conversion);
    Items.title.push(Items.all[i].name);
  }
}


function chartchart(){
  chartGarbage();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Items.title,
      datasets: [{
        label: 'Conversion Rate',
        data: Items.converted,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
