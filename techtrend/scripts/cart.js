// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the UI
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  cartCountElements.forEach(element => {
    element.textContent = count;
  });
}

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
  updateCartCount();
  
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
    
    // Cart button click
    if (e.target.classList.contains('cart-btn') || e.target.closest('.cart-btn')) {
      window.location.href = 'cart.html';
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a href="products.html" class="btn">Browse Products</a>
        </div>
      `;
      document.getElementById('checkoutBtn').disabled = true;
      updateCartTotal(0);
      return;
    }
    
    let subtotal = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <div class="item-quantity">
              <button class="quantity-btn minus" data-id="${item.id}">-</button>
              <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
              <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="item-total">$${itemTotal.toFixed(2)}</div>
          <button class="remove-item" data-id="${item.id}">×</button>
        </div>
      `;
    }).join('');
    
    updateCartTotal(subtotal);
    document.getElementById('checkoutBtn').disabled = false;
  }
  
  function updateCartTotal(subtotal) {
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
  }
  
  // Event delegation for quantity changes and removal
  document.getElementById('cartItems').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
      displayCartItems();
    }
    
    if (e.target.classList.contains('quantity-btn')) {
      const productId = parseInt(e.target.dataset.id);
      const input = document.querySelector(`input[data-id="${productId}"]`);
      let quantity = parseInt(input.value);
      
      if (e.target.classList.contains('minus') && quantity > 1) {
        input.value = quantity - 1;
      } else if (e.target.classList.contains('plus')) {
        input.value = quantity + 1;
      }
      
      updateQuantity(productId, parseInt(input.value));
      displayCartItems();
    }
  });
  
  // Input change event for direct quantity edits
  document.getElementById('cartItems').addEventListener('change', function(e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
      const productId = parseInt(e.target.dataset.id);
      const newQuantity = parseInt(e.target.value);
      
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
        displayCartItems();
      } else {
        e.target.value = 1;
      }
    }
  });
  
  // Initialize cart display
  displayCartItems();
});