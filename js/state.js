function getCart() {
    const savedCart = localStorage.getItem("pc_shop_cart");

    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCart(cart) {
    localStorage.setItem("pc_shop_cart", JSON.stringify(cart));
}

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
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        item => item.productId !== productId
    );

    saveCart(updatedCart);
}

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

function clearCart() {
    localStorage.removeItem("pc_shop_cart");
}

function getCartSubtotal() {
    const cart = getCart();

    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

export {
    getCart,
    saveCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartSubtotal
};