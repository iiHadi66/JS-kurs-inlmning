let content = document.querySelector('.container');
const api = 'https://api.punkapi.com/v2/beers';
let arr = [];
let btn;
let title = document.querySelector('.title');
let rub = document.createElement("h1");
title.appendChild(rub);
rub.innerText = 'EC BEERS SHOP';
async function getData() {
     let response = await fetch(api);
    const data = await response.json();
    printData(data);
}
function printData(data) {
    for (let i = 3; i < 23; i++) {
        $("#allData").append(`
  <div class="card text-center m-3">
  <div class="card-header">
    BEER
  </div>
  <div class="card-body p-5">
    <h5 class="card-title">${data[i].name}</h5>
    <img src="${data[i].image_url}" class="img-fluid" style="max-height: 250px">
    <h5> ${data[i].ingredients.malt[0].name + "<br>" + data[i].ingredients.malt[0].amount.value + " " + data[i].ingredients.malt[0].amount.unit}</h5>
  </div>
  <div class="card-footer p-3">
  <span class="badge text-bg-secondary float-start">${data[i].ibu} kr</span>
  <button onclick="addToCart(${data[i].id}, this)"class="btn btn-sm float-end btn-info">Lägg till</button>
  </div>
</div> `);
    };
}
getData()
function addToCart(id, ele) {
    arr.push(id);
    localStorage.setItem('userCart', JSON.stringify(arr));
    let items = JSON.parse(localStorage.getItem('userCart'));
    $('#cart').html(items.length);
    $(ele).attr('disabled', 'disabled');
}
async function getCartItems() {
    let response = await fetch(api);
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
        $("#cart_data").append(`

    <div class="card text-center m-3">
<div class="card-header">
BEER
</div>
<div class="card-body p-5">
<h5 class="card-title">${items[i].name}</h5>
<img src="${items[i].image_url}" class="img-fluid" style="max-height: 250px">
<h5> ${items[i].ingredients.malt[0].name + "<br>" + items[i].ingredients.malt[0].amount.value + " " + items[i].ingredients.malt[0].amount.unit}</h5>
</div>
<div class="card-footer p-3">
<span class="badge text-bg-secondary float-start">${items[i].ibu} kr</span>
</div>
</div>`);
        total += items[i].ibu;
    };
    $('#total').html(total + ' kr');
}
const observer = new MutationObserver(function(){
    if(document.querySelector('#btn')){
        btn = document.querySelector('#btn');
        btn.addEventListener("click", betlaning);
        observer.disconnect();
    }
})
let target = document.querySelector('body');
const config = {attributes: true, childList: true, subtree: true};
observer.observe(target, config);

const betlaning = () => {
    let output = document.createElement('div');
    output.innerHTML = `<div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Betalning</h5>
        </div>
        <div class="modal-body">
          <p><form class="row g-3">
          <div class="col-md-4">
            <label for="validationDefault01" class="form-label">First name</label>
            <input type="text" class="form-control" id="validationDefault01" value="" required>
          </div>
          <div class="col-md-4">
            <label for="validationDefault02" class="form-label">Last name</label>
            <input type="text" class="form-control" id="validationDefault02" value="" required>
          </div>
          <div class="col-md-4">
            <label for="validationDefaultUsername" class="form-label">Age</label>
            <div class="input-group">
              <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
            </div>
          </div>
          <div class="col-md-6">
            <label for="validationDefault03" class="form-label">Card-number</label>
            <input type="text" class="form-control" id="validationDefault03" required>
          </div>
          <div class="col-md-3">
            <label for="validationDefault05" class="form-label">CCV</label>
            <input type="text" class="form-control" id="validationDefault05" required>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
              <label class="form-check-label" for="invalidCheck2">
                Agree to terms and conditions
              </label>
            </div>
          </div>
          <div class="col-12">
            <a href="massge.html" class="btn btn-primary" type="submit">Submit form</a>
          </div>
        </form></p>
        </div>
      </div>
    </div>
  </div>`;
  document.body.append(output);
  const modal = new bootstrap.Modal(output.querySelector('.modal'));
  modal.show();
}
