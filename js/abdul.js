const card = document.querySelector('.container1');
let output = '';
const url = 'https://api.punkapi.com/v2/beers';
let beerID;
let beerName;
let beerBeskrivning;
let beerImg;
let price;
let array = [];
let data = fetch(url)
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      beerID = data[i].id;
      beerName = data[i].name;
      beerBeskrivning = data[i].description;
      beerImg = data[i].image_url;
      beervolume = data[i].value;
      price = data[i].ibu;
      $("#allData").append(`     <div class="col-md-4 mt-3">
      <div class="card">
             <img src="${beerImg}" alt="Avatar">
             <div class="container">
              <h4><b>${beerName}</b></h4> 
              <p>${data[i].ingredients.malt[0].name + "،" + data[i].ingredients.malt[0].amount.value + " " + data[i].ingredients.malt[0].amount.unit}</p> 
              <p>${price} $</p>
              <button onclick="addToCart(${data[i].id}, this)"class="btn btn-sm btn-info">Lägg till</button>
              </div>
              </div>
              </div>
            `);
    };
  })
function addToCart(id, ele) {
  array.push(id);
  localStorage.setItem('userCart', JSON.stringify(array));
  let items = JSON.parse(localStorage.getItem('userCart'));
  $('#cart').html(items.length);
}
async function getCartItems() {
  let response = await fetch(url);
  const data = await response.json();
  let choosen_products = [];
  let items = JSON.parse(localStorage.getItem('userCart'));
  for (let i = 0; i < items.length; i++) {
    choosen_products.push(data.find((data) => data.id == items[i]));
  }
  addCartItemsToDom(choosen_products);
  $('#cart').html(choosen_products.length);
}
function addCartItemsToDom(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    beerID = items[i].id;
    beerName = items[i].name;
    beerBeskrivning = items[i].description;
    beerImg = items[i].image_url;
    beervolume = items[i].value;
    price = items[i].ibu;
    $("#cart_data").append(` <div class="card">
      <img src="${beerImg}" alt="Avatar">
      <div class="container">
       <h4><b>${beerName}</b></h4> 
       <p>${items[i].ingredients.malt[0].name + "،" + items[i].ingredients.malt[0].amount.value + " " + items[i].ingredients.malt[0].amount.unit}</p> 
       <p>${price} $</p>
       </div>
       </div>
     `);
    total += items[i].ibu;
  };
  $('#total').html(total + '$');
}
