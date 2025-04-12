// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartCount();
  showCartNotification(product.name, quantity);
}

// Remove from cart function
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
}

// Update quantity function
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    saveCart();
    updateCartCount();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Show cart notification
function showCartNotification(productName, quantity) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
        <p>Added ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${productName} to your cart</p>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize cart event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      const productCard = e.target.closest('.product-card');
      if (productCard) {
        const productId = parseInt(productCard.dataset.id);
        addToCart(productId);
      }
    }

    // Quantity buttons in product detail page
    if (e.target.classList.contains('quantity-btn')) {
      const quantityInput = document.getElementById('quantity');
      let quantity = parseInt(quantityInput.value);

      if (e.target.classList.contains('minus') && quantity > 1) {
        quantityInput.value = quantity - 1;
      } else if (e.target.classList.contains('plus')) {
        quantityInput.value = quantity + 1;
      }
    }

    // Add to cart button in product detail page
    if (e.target.id === 'addToCart') {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = parseInt(urlParams.get('id'));
      const quantity = parseInt(document.getElementById('quantity').value);

      if (productId) {
        addToCart(productId, quantity);
      }
    }
  });
});

// Cart notification styles (added dynamically)
const cartNotificationStyles = document.createElement('style');
cartNotificationStyles.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--accent-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: var(--shadow);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .cart-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(cartNotificationStyles);