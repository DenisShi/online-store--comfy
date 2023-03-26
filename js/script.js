const body = document.body;
const navbar = document.querySelector(".navbar");
const burgerBtn = document.querySelector(".burgerBtn-menu");
const openCartBtn = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const closeCartBtn = document.querySelector(".close-cart-btn");
const searchClearBtn = document.querySelector(".search-close-icon");
const searchValue = document.querySelector(".search-input");
const searchRangeText = document.querySelector(".rangeText");
const searchRangeValue = document.querySelector(".range");
const searchProductsForm = document.querySelector(".search-products-form");

const cartItems = document.querySelector(".cart-items");
const products = document.querySelector(".items");

const navProducts = document.querySelector(".nav-products");

burgerBtn.addEventListener("click", openBurgerMenu);
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

if (searchClearBtn) {
  searchClearBtn.addEventListener("click", searchClear);
}

//// Local storage

let arrayCarts = [];
if (localStorage.getItem("arrayCarts")) {
  arrayCarts = JSON.parse(localStorage.getItem("arrayCarts"));
}

function saveCartToLocalStorage() {
  localStorage.setItem("arrayCarts", JSON.stringify(arrayCarts));
}

/////// Burger Menu

function openBurgerMenu() {
  burgerBtn.classList.toggle("burgerBtn-active");
  navbar.classList.toggle("navbar-active");
}

////// Search

if (searchProductsForm) {
  searchProductsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getProducts(searchValue.value.toLowerCase());
  });
}

function searchClear() {
  searchValue.value = "";
  products.innerHTML = "";
  searchRangeText.innerHTML = `Value: none`;
  searchRangeValue.value = 0;
  getProducts();
}

function searchRange(data) {
  if (searchRangeValue) {
    searchRangeValue.addEventListener("change", () => {
      searchRangeText.innerHTML = `Value: $${searchRangeValue.value}`;
      let filteredArr = data.filter(
        (item) => item.price <= searchRangeValue.value
      );
      products.innerHTML = "";
      renderItems(filteredArr);
    });
  } else {
    return;
  }
}

function filterCategory(data) {
  const companyList = document.querySelector(".companyList");

  if (companyList) {
    companyList.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.dataset.category === "All") {
        products.innerHTML = "";
        renderItems(data);
      } else {
        let filteredArr = data.filter(
          (item) => item.category === e.target.dataset.category
        );

        products.innerHTML = "";
        renderItems(filteredArr);
      }
    });
  } else {
    return;
  }
}

/////// get Data

async function getProducts(searchValue) {
  const response = await fetch("../products.json");
  const data = await response.json();

  if (searchValue) {
    let filtered = data.items.filter(
      (item) => item.title.toLowerCase() == searchValue
    );

    products.innerHTML = "";
    renderItems(filtered);
  } else {
    products ? (products.innerHTML = "") : null;
    renderItems(data.items);
  }

  filterCategory(data.items);
  searchRange(data.items);

  return data;
}
getProducts();

async function getFeatured() {
  const response = await fetch("../products.json");
  const data = await response.json();

  renderFeaturedItems(data.items.slice(0, 3));

  return data;
}
getFeatured();

function markupItem(items) {
  const createItem = items.map((item) => {
    return `<div class="item" id='${item.id}' >
    <img width="200px" src='../img/products/${item.title}.jpg' alt="${item.title}">
    <h5>${item.title}</h5>
    <p>$${item.price}</p>
    </div>`;
  });
  return createItem.join("");
}

////// Render items

function renderItems(items) {
  if (products) {
    products.insertAdjacentHTML("afterbegin", markupItem(items));

    const allItems = document.querySelectorAll(".item");

    allItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const id = event.target.id;

        let product = arrayCarts.find((item) => item.id == id);

        if (arrayCarts.includes(product)) {
          removeFromCart(id);
        } else {
          addToCart(items, id);
        }
      });
    });
  } else {
    return;
  }
}

function renderFeaturedItems(items) {
  const itemsFeatured = document.querySelector(".items-featured");
  if (itemsFeatured) {
    itemsFeatured.insertAdjacentHTML("afterbegin", markupItem(items));
  } else {
    return;
  }
}

function renderCart() {
  cartItems.insertAdjacentHTML("beforeend", markupCart());
}
renderCart();

function renderItemCart() {
  cartItems.innerHTML = "";
  cartItems.insertAdjacentHTML("beforeend", markupCart().join(""));
  totalCart();
  saveCartToLocalStorage();
}

function renderItemClasses() {
  const allItems = document.querySelectorAll(".item");
  cartIconQuantity();

  arrayCarts.forEach((item) => {
    allItems.forEach((it) => {
      if (item.id == it.id) {
        it.classList.add("item-added");
      }
    });
  });
}

//////// Cart

function openCart(e) {
  e.preventDefault();
  cart.classList.add("cart-active");
  overlay.classList.add("d-flex");
  body.classList.add("overflow-hidden");
}

function closeCart(e) {
  e.preventDefault();
  cart.classList.remove("cart-active");
  overlay.classList.remove("d-flex");
  body.classList.remove("overflow-hidden");
}

function addToCart(items, id) {
  let product = items.find((item) => item.id === Number(id));

  arrayCarts.push(product);
  renderItemCart();
  cartIconQuantity();
  cssClassAdd(id);
}

function removeFromCart(id) {
  let product = arrayCarts.find((item) => item.id === Number(id));
  let index = arrayCarts.indexOf(product);
  arrayCarts.splice(index, 1);

  renderItemCart();
  cartIconQuantity();
  cssClassRemove(id);
}

function markupCart() {
  const itemCart = arrayCarts.map((item) => {
    return `<div class="cart-item">
        <div class="cart-item-wrap ">
        <img width="100px" src="../img/products/${item.title}.jpg" alt="${item.title}">
        <div class="cart-item-description">
          <h5>${item.title}</h5>
          <p>$${item.price}</p>
          <button class="remove-cart-item" onclick='removeFromCart(${item.id})'>remove</button>
        </div>
     </div>
        <div class="cart-item-counter">
           <button class="cart-counter-btn">
              <ion-icon name="chevron-up-outline" onclick='plusHandler(${item.id})'></ion-icon>
           </button>
           <span class="counter-value">${item.quantity}</span>
           <button class="cart-counter-btn" onclick='minusHandler(${item.id})'>
              <ion-icon name="chevron-down-outline"></ion-icon>
           </button>
        </div>
      </div>`;
  });
  return itemCart;
}

function cartIconQuantity() {
  const cartIconQuantity = document.querySelector(".cart-icon-quantity");
  cartIconQuantity.innerHTML = `<p>${arrayCarts.length}</p>`;
}

function plusHandler(id) {
  const product = arrayCarts.find((item) => item.id == id);
  product.quantity++;
  renderItemCart();
}

function minusHandler(id) {
  const product = arrayCarts.find((item) => item.id == id);
  product.quantity > 1 ? product.quantity-- : removeFromCart(id);
  renderItemCart();
}

function totalCart() {
  const cartTotal = document.querySelector(".cart-totalTitle");

  if (arrayCarts.length === 0) {
    cartTotal.innerHTML = `Total: $0`;
    return;
  } else {
    const total = arrayCarts.map((item) => {
      return item.price * item.quantity;
    });
    let totalPrice = total.reduce((acc, item) => acc + item);
    cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  }
}

///////// Add overlay to the item

window.onload = function () {
  renderItemClasses();
  totalCart();
};

function cssClassAdd(id) {
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    if (item.id == id) {
      item.classList.add("item-added");
    }
  });
}

function cssClassRemove(id) {
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    if (item.id == id) {
      item.classList.remove("item-added");
    }
  });
}

//////////
