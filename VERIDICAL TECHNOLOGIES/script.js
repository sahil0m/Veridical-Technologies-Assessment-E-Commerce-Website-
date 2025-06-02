let cart = {};
function addToCart(productId, productName, price) {
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = {
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        };
    }
    updateCartCount();
    let button = event.target;
    button.style.backgroundColor = '#22c55e';
    button.textContent = 'Added!';
    
    setTimeout(function() {
        button.style.backgroundColor = '#0095f6';
        button.textContent = 'Add to Cart';
    }, 2000);
}
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}
function showCartPage() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('cart-page').classList.add('active');
    renderCart();
}
function showHomePage() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('cart-page').classList.remove('active');
}
function renderCart() {
    const cartContent = document.getElementById('cart-content');
    
    if (Object.keys(cart).length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
                <button class="continue-shopping" onclick="showHomePage()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    let cartHTML = '<div class="cart-items">';
    let total = 0;
    Object.values(cart).forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">${item.name} Image</div>
        <div class="cart-item-info">
         <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">INR ${item.price}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
         </div>
                <div style="text-align: right;">
        <p style="font-weight: bold; margin-bottom: 10px;">INR ${itemTotal}</p>
          <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    cartHTML += '</div>';
    cartHTML += `
        <div class="cart-summary">
            <div class="summary-row">
<span>Subtotal:</span>
         <span>INR ${total}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
            </div>
            <div class="summary-row summary-total">
     <span>Total:</span>
   <span>INR ${total}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
        </div>
    `;

    cartContent.innerHTML = cartHTML;
}
function updateQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        updateCartCount();
        renderCart();
    }
}
function removeFromCart(productId) {
    delete cart[productId];
    updateCartCount();
    renderCart();
}
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: INR ${total}`);
    cart = {};
    updateCartCount();
    renderCart();
}
function goHome() {
    showHomePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function search() {
    document.querySelector('.search-input').focus();
}
function addPost() {
    alert('Add new post feature coming soon!');
}
function toggleHeart(icon) {
    icon.classList.add('heart-animation');
    
    let svg = icon.querySelector('svg');
    let path = svg.querySelector('path');
    let currentPath = path.getAttribute('d');
    
    let filledHeart = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
    let outlineHeart = "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z";
    
    if (currentPath === filledHeart) {
        path.setAttribute('d', outlineHeart);
        svg.style.fill = '#262626';
    } else {
        path.setAttribute('d', filledHeart);
        svg.style.fill = '#ed4956';
    }
    setTimeout(function() {
        icon.classList.remove('heart-animation');
    }, 600);
}
function showProfile() {
    alert('Profile page coming soon!');
}
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let searchTerm = this.value;
        if (searchTerm.trim()) {
            alert('Searching for: ' + searchTerm);
        }
    }
});
document.querySelectorAll('.product-image').forEach(function(img) {
    img.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(function() {
                  img.style.transform = 'scale(1)';
        }, 200);
    });
});