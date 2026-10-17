
import { getCart, getCartSubtotal } from "../js/state.js";

const checkoutForm = document.getElementById("checkoutForm");
const formMessage = document.getElementById("formMessage");

const DELIVERY_FEE = 5;

function formatPrice(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

function renderOrderSummary() {
    const cart = getCart();
    const productList = document.querySelector(".product-list");

    productList.innerHTML = "";

    if (cart.length === 0) {
        productList.textContent = "Your cart is empty.";
        document.getElementById("subtotal").textContent = formatPrice(0);
        document.getElementById("delivery").textContent = formatPrice(0);
        document.getElementById("total").textContent = formatPrice(0);
        return;
    }

    cart.forEach(item => {
        const article = document.createElement("article");
        article.className = "product";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = item.image;
        image.alt = item.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const quantity = document.createElement("span");
        quantity.textContent = `Quantity: ${item.quantity}`;

        info.append(name, quantity);

        const price = document.createElement("strong");
        price.className = "price";
        price.textContent = formatPrice(item.price * item.quantity);

        article.append(image, info, price);
        productList.appendChild(article);
    });

    const subtotal = getCartSubtotal();
    const delivery = DELIVERY_FEE;
    const total = subtotal + delivery;

    document.getElementById("subtotal").textContent =
        formatPrice(subtotal);

    document.getElementById("delivery").textContent =
        formatPrice(delivery);

    document.getElementById("total").textContent =
        formatPrice(total);
}

renderOrderSummary();


checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  formMessage.textContent =
    "Information validated. Order submission is not connected yet.";
});

document.getElementById("newsletterForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    alert("Newsletter form demo: no email was saved.");
    this.reset();
  }
);
