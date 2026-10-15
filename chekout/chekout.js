
import {
    getCart,
    clearCart,
    getCartSubtotal
} from "../state.js";

const DELIVERY_FEE = 500;

const checkoutItems = document.getElementById("checkout-items");
const checkoutEmpty = document.getElementById("checkout-empty");

const subtotalElement = document.getElementById("checkout-subtotal");
const deliveryElement = document.getElementById("checkout-delivery");
const totalElement = document.getElementById("checkout-total");

const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");
const placeOrderButton = document.getElementById("place-order-button");

function formatPrice(price) {
    return `${Number(price).toLocaleString("fr-DZ")} DZD`;
}

function renderCheckout() {
    const cart = getCart();

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        checkoutEmpty.hidden = false;
        checkoutItems.hidden = true;

        subtotalElement.textContent = formatPrice(0);
        deliveryElement.textContent = formatPrice(0);
        totalElement.textContent = formatPrice(0);

        placeOrderButton.disabled = true;
        return;
    }

    checkoutEmpty.hidden = true;
    checkoutItems.hidden = false;
    placeOrderButton.disabled = false;

    cart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "checkout-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const info = document.createElement("div");
        info.className = "checkout-item-info";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent = `Quantity: ${item.quantity}`;

        info.append(name, quantity);

        const price = document.createElement("span");
        price.className = "checkout-item-price";
        price.textContent = formatPrice(
            Number(item.priceDzd) * item.quantity
        );

        row.append(image, info, price);
        checkoutItems.appendChild(row);
    });

    const subtotal = getCartSubtotal();
    const delivery = DELIVERY_FEE;
    const total = subtotal + delivery;

    subtotalElement.textContent = formatPrice(subtotal);
    deliveryElement.textContent = formatPrice(delivery);
    totalElement.textContent = formatPrice(total);
}

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        checkoutMessage.textContent =
            "Your cart is empty. Please add a product first.";
        checkoutMessage.className = "";
        return;
    }

    if (!checkoutForm.reportValidity()) {
        return;
    }

    const formData = new FormData(checkoutForm);

    const order = {
        orderId: `PC-${Date.now()}`,
        customer: {
            firstName: formData.get("firstName").trim(),
            lastName: formData.get("lastName").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phone").trim(),
            address: formData.get("address").trim(),
            city: formData.get("city").trim(),
            wilaya: formData.get("wilaya").trim(),
            notes: formData.get("notes").trim()
        },
        paymentMethod: formData.get("payment"),
        items: cart,
        subtotal: getCartSubtotal(),
        delivery: DELIVERY_FEE,
        total: getCartSubtotal() + DELIVERY_FEE,
        createdAt: new Date().toISOString()
    };

    // Demo only: save the order in this browser.
    const savedOrders = JSON.parse(
        localStorage.getItem("pc_shop_orders") || "[]"
    );

    savedOrders.push(order);

    localStorage.setItem(
        "pc_shop_orders",
        JSON.stringify(savedOrders)
    );

    clearCart();

    checkoutForm.reset();

    checkoutMessage.className = "success";
    checkoutMessage.textContent =
        `Order ${order.orderId} placed successfully!`;

    renderCheckout();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

renderCheckout();
