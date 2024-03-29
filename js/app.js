'use strict';

// var productImageContainer = document.getElementById('productImageContainer');
var productImageList = document.getElementById('productImageList');
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var thirdImg = document.getElementById('thirdImg');
var resultList = document.getElementById('resultList');
var ctx = document.getElementById('myChart').getContext('2d');

var currentFirstProduct = null;
var currentSecondProduct = null;
var currentThirdProduct = null;

// Set a constructor
function Product(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Product.allProducts.push(this);
}

// Array to store all the products
Product.allProducts = [];

// Check localStoage
function updateLocalStorage() {
  console.log('**updateLocalStorage');
  var productsJSON = JSON.stringify(Product.allProducts);
  localStorage.setItem('data', productsJSON);
}

function getLocalStorage() {
  console.log('**getLocalStorage');
  var localData = localStorage.getItem('data');
  var previousData = JSON.parse(localData);
  if (previousData !== null) {
    Product.allProducts = previousData;
  }
}

// Helper function to display document elements
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}

// Helper function to check the duplication
function checkDuplicate(objName, arr) {
  var match = 0;
  for (var i = 0; i < arr.length; i++) {
    if (objName === arr[i].name) {
      match++;
    }
  }
  return match;
}


new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// console.log('allProducts : ', Product.allProducts);

function grabThreeProducts() {
  var previousSet = [];
  if (currentFirstProduct !== null) {
    previousSet.push(currentFirstProduct.name);
    previousSet.push(currentSecondProduct.name);
    previousSet.push(currentThirdProduct.name);
  }
  var displayedImgs = [];
  while (displayedImgs.length < 3) {
    var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    // Check Ducplicate on three displayed img
    if (checkDuplicate(Product.allProducts[randomIndex].name, displayedImgs) === 0) {
      // Check immediate previous set
      if (previousSet.includes(Product.allProducts[randomIndex].name) === false) {
        displayedImgs.push(Product.allProducts[randomIndex]);
      }
    }
  }
  firstImg.src = displayedImgs[0].imgURL;
  secondImg.src = displayedImgs[1].imgURL;
  thirdImg.src = displayedImgs[2].imgURL;

  currentFirstProduct = displayedImgs[0];
  currentSecondProduct = displayedImgs[1];
  currentThirdProduct = displayedImgs[2];
}

grabThreeProducts();

function displayTotalResult() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    addElement('li', resultList, Product.allProducts[i].name + ' had ' + Product.allProducts[i].clickCtr + ' votes and was shown ' + Product.allProducts[i].shownCtr + ' times');
  }
}

var counter = 0;
function clickHandler(event) {
  if (counter < 25) {
    var id = event.target.id;

    // Counter goes up every time the img is shown
    currentFirstProduct.shownCtr++;
    currentSecondProduct.shownCtr++;
    currentThirdProduct.shownCtr++;

    if(id === 'firstImg') {
      currentFirstProduct.clickCtr++;
    } else if(id === 'secondImg') {
      currentSecondProduct.clickCtr++;
    } else if(id === 'thirdImg') {
      currentThirdProduct.clickCtr++;
    }

    grabThreeProducts();
  }
  counter++;

  if(counter === 25) {
    alert('Done!');
    updateLocalStorage();
    productImageList.removeEventListener('click', clickHandler);
    createChart();
    displayTotalResult();
  }
}

productImageList.addEventListener('click', clickHandler);

// Create result chart
function createChart() {
  var label = [];
  var voteData = [];
  var shownData = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    label.push(Product.allProducts[i].name);
    voteData.push(Product.allProducts[i].clickCtr);
    shownData.push(Product.allProducts[i].shownCtr);
  }

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: '# of Votes',
        data: voteData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: '# of Views',
        data: shownData,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

getLocalStorage();

