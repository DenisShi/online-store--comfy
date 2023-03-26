const openCartBtn = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart-btn");
const cartItems = document.querySelector(".cart-items");

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

function renderCart() {
  cartItems.insertAdjacentHTML("beforeend", markupCart().join(""));
}
renderCart();

function renderItemCart() {
  cartItems.innerHTML = "";
  cartItems.insertAdjacentHTML("beforeend", markupCart().join(""));
  saveCartToLocalStorage();
}

function openCart(e) {
  e.preventDefault();
  cart.classList.add("cart-active");
  overlay.classList.add("d-flex");
  document.body.classList.add("overflow-hidden");
  totalCart();
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
  totalCart();
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
  totalCart();
}

function minusHandler(id) {
  const product = arrayCarts.find((item) => item.id == id);
  product.quantity > 1 ? product.quantity-- : removeFromCart(id);
  renderItemCart();
  totalCart();
}

function totalCart() {
  const cartTotal = document.querySelector(".cart-totalTitle");

  if (arrayCarts.length === 0) {
    cartTotal ? (cartTotal.innerHTML = `Total: $0`) : null;
    return;
  } else {
    const total = arrayCarts.map((item) => {
      return item.price * item.quantity;
    });
    let totalPrice = total.reduce((acc, item) => acc + item);
    cartTotal
      ? (cartTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`)
      : null;
  }
}
