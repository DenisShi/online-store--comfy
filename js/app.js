const navbar = document.querySelector(".navbar");
const burgerBtn = document.querySelector(".burgerBtn-menu");
const overlay = document.querySelector(".overlay");
const products = document.querySelector(".items");
const navProducts = document.querySelector(".nav-products");

window.onload = function () {
  renderItemClasses();
};

//// Local storage
let arrayCarts = [];
if (localStorage.getItem("arrayCarts")) {
  arrayCarts = JSON.parse(localStorage.getItem("arrayCarts"));
}

function saveCartToLocalStorage() {
  localStorage.setItem("arrayCarts", JSON.stringify(arrayCarts));
}

/////// Burger Menu
burgerBtn.addEventListener("click", openBurgerMenu);

function openBurgerMenu() {
  burgerBtn.classList.toggle("burgerBtn-active");
  navbar.classList.toggle("navbar-active");
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
  renderItemClasses();

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
