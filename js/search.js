const searchClearBtn = document.querySelector(".search-close-icon");
const searchValue = document.querySelector(".search-input");
const searchRangeText = document.querySelector(".rangeText");
const searchRangeValue = document.querySelector(".range");
const searchProductsForm = document.querySelector(".search-products-form");

if (searchClearBtn) {
  searchClearBtn.addEventListener("click", searchClear);
}

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
        renderItemClasses();
      } else {
        let filteredArr = data.filter(
          (item) => item.category === e.target.dataset.category
        );

        products.innerHTML = "";
        renderItems(filteredArr);
        renderItemClasses();
      }
    });
  } else {
    return;
  }
}
