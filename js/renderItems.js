function renderItems(items) {
  if (products) {
    products.insertAdjacentHTML("afterbegin", markupItem(items));

    const allItems = document.querySelectorAll(".item");

    allItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const id = event.target.id;

        if (item.id == id) {
          item.classList.add("item-added");
        }

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

function renderFeaturedItems(items) {
  const itemsFeatured = document.querySelector(".items-featured");
  if (itemsFeatured) {
    itemsFeatured.insertAdjacentHTML("afterbegin", markupItem(items));
  } else {
    return;
  }
}

///// cssClasses
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
