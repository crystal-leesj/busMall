
// var productImageContainer = document.getElementById('productImageContainer');
var productImageList = document.getElementById('productImageList');
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var thirdImg = document.getElementById('thirdImg');

var resultList = document.getElementById('resultList');


var currentFirstProduct = null;
var currentSecondProduct = null;
var currentThirdProduct = null;

// Helper function to display document elements
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}

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



new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
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

// Helper function to check the duplication
function checkDuplicate(objName, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (objName === arr[i].name) {
      return false;
    }
  }
  return true;
}

function grabThreeProducts() {
  var displayedImgs = [];
  while (displayedImgs.length < 3) {
    var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    if (checkDuplicate(Product.allProducts[randomIndex].name, displayedImgs) === true) {
      displayedImgs.push(Product.allProducts[randomIndex]);
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

var counter = 0;
function clickHandler(event) {
  if (counter < 25) {
    var id = event.target.id;

    currentFirstProduct.shownCtr++;
    currentSecondProduct.shownCtr++;
    currentThirdProduct.shownCtr++;

    if(id === 'firstImg') {
      currentFirstProduct.clickCtr++;
      // console.log('firstImg : ', currentFirstProduct.clickCtr, currentFirstProduct.shownCtr);
    } else if(id === 'secondImg') {
      currentSecondProduct.clickCtr++;
    } else if(id === 'thirdImg') {
      currentThirdProduct.clickCtr++;
    }


    // console.log('currentFirstProduct :', currentFirstProduct);
    // console.log('currentSecondProduct :', currentSecondProduct);
    // console.log('currentThirdProduct :', currentThirdProduct);
    grabThreeProducts();
  }
  counter++;
  if(counter === 25) {
    alert('Done!');
    displayResult();
  }
}

productImageList.addEventListener('click', clickHandler);


function displayResult() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    addElement('li', resultList, Product.allProducts[i].name + ' had ' + Product.allProducts[i].clickCtr + ' votes and was shown ' + Product.allProducts[i].shownCtr + ' times');
  }

}


