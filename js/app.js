const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h4>Rating :${product.rating.count}</h4>
      <h4>Average Rating :${product.rating.rate}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// addToCart onclick function------ 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
// get value from document.id  function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = element;
  return converted;
};

// main price update function
const updatePrice = (id, price) => {

  const convertedOldPrice = getInputValue(id);
  const convertPrice = price;
  const total = parseFloat(convertedOldPrice) + parseFloat(convertPrice);
  document.getElementById(id).innerText = twoDecimalAndParsFloat(total);
};

// set deliver charge and total-tax function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText =value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted =  getInputValue("price");
  console.log(priceConverted)
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", twoDecimalAndParsFloat(priceConverted * 0.2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax",twoDecimalAndParsFloat(priceConverted * 0.3));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax",twoDecimalAndParsFloat(priceConverted * 0.4) );
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
  parseFloat(getInputValue("price"))+
  parseFloat(getInputValue("delivery-charge"))+
 parseFloat( getInputValue("total-tax"));
   
  document.getElementById("total").innerText =twoDecimalAndParsFloat(grandTotal);
  console.log(grandTotal)
};


// toFixed function 
const twoDecimalAndParsFloat=money=>{
  const convertMoney  = parseFloat(money).toFixed(2);

  return convertMoney ;
}
