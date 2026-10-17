import { addToCart } from "../js/state.js";
import { products } from "./products-data.js";

const productGrid = document.getElementById("product-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsMessage = document.getElementById("results-message");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategory = "All";
let searchText = "";


function formatPrice(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}


function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const text = `${product.name} ${product.brand}`.toLowerCase();

        const matchesSearch = text.includes(searchText.toLowerCase());

        return product.active && matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = "";

    resultsMessage.textContent =
        `${filteredProducts.length} product(s) found`;

    emptyState.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const stockMessage = product.stockQuantity > 0
            ? `In Stock: ${product.stockQuantity} units`
            : "Out of Stock";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <p class="product-category">${product.category}</p>

            <h3>${product.name}</h3>

            <p class="product-brand">${product.brand}</p>

            <p class="product-price">${formatPrice(product.price)}</p>

            <p class="product-stock">${stockMessage}</p>

            <button
                class="add-to-cart-btn"
                data-product-id="${product.id}"
                ${product.stockQuantity <= 0 ? "disabled" : ""}
            >
                ${product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        `;

        productGrid.appendChild(card);
    });
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderProducts();
    });
});

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchText = searchInput.value.trim();
    renderProducts();
});

searchInput.addEventListener("input", () => {
    searchText = searchInput.value.trim();
    renderProducts();
});

renderProducts();

productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");

    if (!button) return;

    const productId = Number(button.dataset.productId);
    const product = products.find(item => item.id === productId);

    if (!product || product.stockQuantity <= 0) {
        alert("This product is out of stock.");
        return;
    }

    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
});