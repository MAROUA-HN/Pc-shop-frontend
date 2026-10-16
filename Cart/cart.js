
// Import functions from state.js
import {
    getCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartSubtotal
} from "../js/state.js";


// Get HTML elements
const cartContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");

const cartCountElement = document.getElementById("cart-count");
const summaryItemsElement = document.getElementById("summary-items");

const subtotalElement = document.getElementById("cart-subtotal");
const deliveryElement = document.getElementById("delivery-fee");
const totalElement = document.getElementById("cart-total");

const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout-button");
const cartMessage = document.getElementById("cart-message");


// Delivery fee
const DELIVERY_FEE = 500;


// Format prices in DZD
function formatPrice(price) {
    return `${Number(price).toLocaleString("fr-DZ")} DZD`;
}


// Display cart products
function renderCart() {

    const cart = getCart();

    // Clear previous product elements
    cartContainer.innerHTML = "";

    // Calculate total quantity
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Update cart counter and summary
    cartCountElement.textContent = totalQuantity;

    summaryItemsElement.textContent =
        `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;


    // Check if cart is empty
    if (cart.length === 0) {

        emptyCartMessage.hidden = false;

        subtotalElement.textContent = formatPrice(0);
        deliveryElement.textContent = formatPrice(0);
        totalElement.textContent = formatPrice(0);

        checkoutButton.disabled = true;
        clearCartButton.disabled = true;

        return;
    }


    // Cart contains products
    emptyCartMessage.hidden = true;

    checkoutButton.disabled = false;
    clearCartButton.disabled = false;


    // Display each product
    cart.forEach((item) => {

        const productElement = document.createElement("article");
        productElement.className = "cart-item";


        // Product image
        const image = document.createElement("img");

        image.src = item.image;
        image.alt = item.name;
        image.className = "cart-item-image";


        // Product information
        const productInfo = document.createElement("div");
        productInfo.className = "cart-item-info";

        const productName = document.createElement("h3");
        productName.textContent = item.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = formatPrice(item.priceDzd);

        productInfo.append(productName, productPrice);


        // Quantity controls
        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";


        const decreaseButton = document.createElement("button");

        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.className = "quantity-btn";
        decreaseButton.setAttribute(
            "aria-label",
            `Decrease quantity of ${item.name}`
        );

        decreaseButton.disabled = item.quantity <= 1;


        const quantityValue = document.createElement("span");

        quantityValue.textContent = item.quantity;
        quantityValue.className = "quantity-value";


        const increaseButton = document.createElement("button");

        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.className = "quantity-btn";
        increaseButton.setAttribute(
            "aria-label",
            `Increase quantity of ${item.name}`
        );


        quantityControls.append(
            decreaseButton,
            quantityValue,
            increaseButton
        );


        // Product total price
        const itemTotal = document.createElement("p");

        itemTotal.className = "cart-item-total";

        itemTotal.textContent = formatPrice(
            Number(item.priceDzd) * item.quantity
        );


        // Remove button
        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";


        // Decrease quantity
        decreaseButton.addEventListener("click", () => {

            if (item.quantity > 1) {

                updateCartQuantity(
                    item.productId,
                    item.quantity - 1
                );

                renderCart();
            }
        });


        // Increase quantity
        increaseButton.addEventListener("click", () => {

            updateCartQuantity(
                item.productId,
                item.quantity + 1
            );

            renderCart();
        });


        // Remove product from cart
        removeButton.addEventListener("click", () => {

            removeFromCart(item.productId);

            cartMessage.textContent =
                `${item.name} removed from your cart.`;

            renderCart();
        });


        // Add elements to product card
        productElement.append(
            image,
            productInfo,
            quantityControls,
            itemTotal,
            removeButton
        );

        cartContainer.appendChild(productElement);

    });


    // Calculate subtotal
    const subtotal = getCartSubtotal();

    // Apply delivery fee only when cart contains products
    const delivery = DELIVERY_FEE;

    // Calculate final total
    const total = subtotal + delivery;


    // Update order summary
    subtotalElement.textContent = formatPrice(subtotal);

    deliveryElement.textContent = formatPrice(delivery);

    totalElement.textContent = formatPrice(total);

}


// Clear the entire cart
clearCartButton.addEventListener("click", () => {

    clearCart();

    cartMessage.textContent = "Your cart has been cleared.";

    renderCart();

});


// Proceed to checkout
checkoutButton.addEventListener("click", () => {

    if (getCart().length === 0) {

        cartMessage.textContent =
            "Please add a product before checkout.";

        return;
    }

    window.location.href = "../Checkout/checkout.html";

});


// Initial display
renderCart();
