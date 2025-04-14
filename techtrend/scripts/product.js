// Global variable to store products
let products = [];

// General site functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Set last modified date
  document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();
});

// Fetch products from JSON file
async function fetchProducts() {
  try {
    const response = await fetch('./scripts/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle both array and object responses
    let productsArray;
    if (Array.isArray(data)) {
      productsArray = data; // Direct array response
    } else if (data && typeof data === 'object' && Array.isArray(data.products)) {
      productsArray = data.products; // Object with products array
    } else {
      console.warn('Unexpected data format:', data);
      return [];
    }
    
    // Additional validation
    if (!productsArray || productsArray.length === 0) {
      console.warn('No products found in the data');
      return [];
    }
    
    return productsArray;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Initialize lazy loading for images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy');
  
  if ('IntersectionObserver' in window) {
    const lazyLoad = (target) => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px',
        threshold: 0.01
      });

      io.observe(target);
    };

    lazyImages.forEach(lazyLoad);
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

// Display featured products
async function displayFeaturedProducts() {
  const featuredContainer = document.getElementById('featuredProducts');
  if (!featuredContainer) return;

  try {
    featuredContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    if (!Array.isArray(products)) {
      products = await fetchProducts();
    }

    const featuredProducts = products.filter(product => product?.featured === true);
    
    if (featuredProducts.length === 0) {
      featuredContainer.innerHTML = '<p class="no-products">No featured products available</p>';
      return;
    }

    featuredContainer.innerHTML = featuredProducts.map(product => `
      <div class="product-card" data-id="${product.id}">
        <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description || 'No description available'}</p>
          <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `).join('');

    initLazyLoading();
    initAddToCartButtons();
  } catch (error) {
    console.error('Error displaying featured products:', error);
    featuredContainer.innerHTML = `
      <div class="error-message">
        <p>Failed to load featured products</p>
        <button class="retry-btn" onclick="displayFeaturedProducts()">Retry</button>
      </div>
    `;
  }
}

// Display all products with filtering
async function displayAllProducts() {
  const productsContainer = document.getElementById('productsGrid');
  if (!productsContainer) return;

  try {
    productsContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    if (!Array.isArray(products)) {
      products = await fetchProducts();
    }

    const category = document.getElementById('category')?.value || 'all';
    const priceRange = document.getElementById('price')?.value || 'all';
    const sortBy = document.getElementById('sort')?.value || 'featured';

    let filteredProducts = [...products];

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product?.category === category);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (priceRange.endsWith('+')) {
        filteredProducts = filteredProducts.filter(product => (product.price || 0) >= min);
      } else {
        filteredProducts = filteredProducts.filter(product =>
          (product.price || 0) >= min && (product.price || 0) <= max
        );
      }
    }

    switch (sortBy) {
      case 'price-low': filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-high': filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'name': filteredProducts.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
      default: filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = '<p class="no-products">No products match your filters</p>';
      return;
    }

    productsContainer.innerHTML = filteredProducts.map(product => `
      <div class="product-card" data-id="${product.id}">
        <a href="product-detail.html?id=${product.id}">
          <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description || ''}</p>
            <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
          </div>
        </a>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `).join('');

    initLazyLoading();
    initAddToCartButtons();
  } catch (error) {
    console.error('Error displaying products:', error);
    productsContainer.innerHTML = `
      <div class="error-message">
        <p>Failed to load products</p>
        <button class="retry-btn" onclick="displayAllProducts()">Retry</button>
      </div>
    `;
  }
}

// Display product details
async function displayProductDetails() {
  const detailContainer = document.querySelector('.product-detail-container');
  if (!detailContainer) return;

  try {
    detailContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
      window.location.href = 'products.html';
      return;
    }

    if (!Array.isArray(products)) {
      products = await fetchProducts();
    }

    const product = products.find(p => p?.id === parseInt(productId));
    
    if (!product) {
      detailContainer.innerHTML = `
        <div class="error-message">
          <h2>Product Not Found</h2>
          <p>The requested product could not be found.</p>
          <a href="products.html" class="btn">Browse Products</a>
        </div>
      `;
      return;
    }

    // Render product details
    detailContainer.innerHTML = `
      <div class="product-gallery">
        <div class="main-image">
          <img id="mainProductImage" src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
        </div>
        <div class="thumbnails" id="thumbnailImages">
          ${(product.thumbnails || []).map((thumb, index) => `
            <img src=${product.image} data-src="${thumb}" alt="${product.name} thumbnail ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}" 
                 onclick="changeMainImage('${thumb}', this)">
          `).join('')}
        </div>
      </div>
      <div class="product-info">
        <h1 id="productName">${product.name}</h1>
        <div class="price" id="detailProductPrice">$${(product.price || 0).toFixed(2)}</div>
        <div class="category" id="productCategory">
          ${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : ''}
        </div>
        <div class="description" id="productDescription">
          ${product.description || 'No description available'}
        </div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
      <div class="product-specs">
        <h2>Specifications</h2>
        <div id="productSpecs">
          ${(product.specs || []).map(spec => `
            <div class="spec-item">
              <span class="spec-dot">•</span>
              <span class="spec-text">${spec}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="product-reviews">
        <h2>Reviews</h2>
        <div id="productReviews">
          ${(product.reviews || []).map(review => `
            <div class="review">
              <div class="review-author">${review.author || 'Anonymous'}</div>
              <div class="review-rating">
                ${'★'.repeat(review.rating || 0)}${'☆'.repeat(5 - (review.rating || 0))}
              </div>
              <div class="review-comment">${review.comment || 'No comment'}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ${product.category ? `
      <div class="related-products">
        <h2>You May Also Like</h2>
        <div id="relatedProducts"></div>
      </div>
      ` : ''}
    `;

    initLazyLoading();
    initAddToCartButtons();
    
    if (product.category) {
      await displayRelatedProducts(product.category, product.id);
    }
  } catch (error) {
    console.error('Error displaying product details:', error);
    detailContainer.innerHTML = `
      <div class="error-message">
        <p>Failed to load product details</p>
        <button class="retry-btn" onclick="displayProductDetails()">Retry</button>
      </div>
    `;
  }
}

// Display related products
async function displayRelatedProducts(category, currentProductId) {
  const relatedContainer = document.getElementById('relatedProducts');
  if (!relatedContainer) return;

  try {
    relatedContainer.innerHTML = '<div class="loading-spinner small"></div>';
    
    if (!Array.isArray(products)) {
      products = await fetchProducts();
    }

    const relatedProducts = products
      .filter(product => product?.category === category && product?.id !== currentProductId)
      .slice(0, 4);

    if (relatedProducts.length === 0) {
      relatedContainer.innerHTML = '<p class="no-products">No related products found</p>';
      return;
    }

    relatedContainer.innerHTML = relatedProducts.map(product => `
      <div class="product-card" data-id="${product.id}">
        <a href="product-detail.html?id=${product.id}">
          <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${(product.price || 0).toFixed(2)}</div>
          </div>
        </a>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `).join('');

    initLazyLoading();
    initAddToCartButtons();
  } catch (error) {
    console.error('Error displaying related products:', error);
    relatedContainer.innerHTML = `
      <div class="error-message">
        <p>Failed to load related products</p>
      </div>
    `;
  }
}

// Change main product image
window.changeMainImage = function(src, element) {
  const mainImage = document.getElementById('mainProductImage');
  if (!mainImage) return;
  
  mainImage.src = src;
  document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
  element.classList.add('active');
};

// Initialize add to cart buttons
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      if (!productId) return;
      
      // Add your cart logic here
      console.log('Added product to cart:', productId);
      // Example: addToCart(productId);
      
      // Visual feedback
      this.textContent = 'Added!';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
      }, 2000);
    });
  });
}

// Initialize filters
function initFilters() {
  const categorySelect = document.getElementById('category');
  const priceSelect = document.getElementById('price');
  const sortSelect = document.getElementById('sort');

  if (categorySelect) {
    categorySelect.addEventListener('change', displayAllProducts);
  }
  if (priceSelect) {
    priceSelect.addEventListener('change', displayAllProducts);
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', displayAllProducts);
  }
}

// Initialize mobile menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav ul');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    initMobileMenu();
    
    // Load products first
    products = await fetchProducts();
    
    // Initialize the appropriate page
    if (document.getElementById('featuredProducts')) {
      await displayFeaturedProducts();
    }

    if (document.getElementById('productsGrid')) {
      await displayAllProducts();
      initFilters();
    }

    if (document.querySelector('.product-detail-container')) {
      await displayProductDetails();
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
});