
// Get the cart from localStorage
function getCart() {
    const savedCart = localStorage.getItem("pc_shop_cart");

    return savedCart ? JSON.parse(savedCart) : [];
}


// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("pc_shop_cart", JSON.stringify(cart));
}


// Add a product to the cart
function addToCart(product, quantity = 1) {
    const cart = getCart();

    const existingProduct = cart.find(
        item => item.productId === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            priceDzd: product.priceDzd,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
}


// Remove a product from the cart
function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        item => item.productId !== productId
    );

    saveCart(updatedCart);
}


// Update product quantity
function updateCartQuantity(productId, quantity) {
    const cart = getCart();

    const product = cart.find(
        item => item.productId === productId
    );

    if (!product) {
        return;
    }

    if (quantity < 1) {
        return;
    }

    product.quantity = quantity;

    saveCart(cart);
}


// Clear the entire cart
function clearCart() {
    localStorage.removeItem("pc_shop_cart");
}


// Calculate subtotal
function getCartSubtotal() {
    const cart = getCart();

    return cart.reduce(
        (total, item) => total + item.priceDzd * item.quantity,
        0
    );
}


// Export functions so other files can use them
export {
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartSubtotal
};