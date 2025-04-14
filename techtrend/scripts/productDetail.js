// Global variables
let products = [];
const container = document.querySelector('.product-detail-container');

// Main function to display product details
async function displayProductDetails() {
  // Get product ID from URL
  const productId = getProductIdFromURL();
  if (!productId) return redirectToProducts();

  try {
    showLoadingState();
    
    // Fetch and validate products
    const products = await fetchAndValidateProducts();
    
    // Find and validate the product
    const product = findProductById(products, productId);
    if (!product) throw new Error('Product not found');

    // Render the product details
    renderProductDetails(product);

    // Initialize interactive elements
    initInteractiveElements();

  } catch (error) {
    handleError(error);
  }
}

// Helper functions
function getProductIdFromURL() {
  const productId = new URLSearchParams(window.location.search).get('id');
  if (!productId) {
    console.warn('No product ID in URL');
    return null;
  }
  return productId;
}

function redirectToProducts() {
  window.location.href = 'products.html';
}

function showLoadingState() {
  container.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
  `;
}

async function fetchAndValidateProducts() {
  const response = await fetch('./scripts/products.json');
  if (!response.ok) throw new Error('Failed to load products');
  
  const data = await response.json();
  const products = Array.isArray(data) ? data : data?.products || [];
  
  if (!Array.isArray(products)) {
    throw new Error('Invalid products data format');
  }
  
  return products;
}

function findProductById(products, productId) {
  return products.find(p => p.id == productId);
}

function renderProductDetails(product) {
  container.innerHTML = `
    <div class="product-detail-content">
      <!-- Image Gallery -->
      <div class="product-gallery animate">
        <div class="main-image">
          <img src="placeholder.jpg" data-src="${product.image}" 
               alt="${product.name}" class="lazy">
        </div>
        ${renderThumbnails(product)}
      </div>

      <!-- Product Info -->
      <div class="product-info animate">
        <h1>${product.name || 'Product Name'}</h1>
        <div class="price">$${(product.price || 0).toFixed(2)}</div>
        <div class="rating">${renderRating(product.rating)}</div>
        
        <div class="description">
          ${product.description || 'No description available.'}
        </div>

        ${renderVariants(product)}
        ${renderSpecs(product)}
        
      </div>

      <!-- Additional Sections -->
      ${renderAdditionalSections(product)}
    </div>
  `;
}

function renderThumbnails(product) {
  if (!product.images?.length) return '';
  
  return `
    <div class="thumbnail-container">
      ${product.images.map((img, i) => `
        <img src="placeholder.jpg" data-src="${img}" 
             alt="Thumbnail ${i+1}" class="thumbnail ${i === 0 ? 'active' : ''}"
             onclick="changeMainImage('${img}', this)">
      `).join('')}
    </div>
  `;
}

function renderRating(rating) {
  if (!rating) return '<div class="no-rating">Not rated yet</div>';
  
  const fullStars = '★'.repeat(Math.floor(rating));
  const emptyStars = '☆'.repeat(5 - Math.floor(rating));
  return `
    <div class="star-rating">
      ${fullStars}${emptyStars}
      <span class="rating-value">(${rating.toFixed(1)})</span>
    </div>
  `;
}

function renderVariants(product) {
  if (!product.variants?.length) return '';
  
  return `
    <div class="product-variants">
      <h3>Options</h3>
      <div class="variant-options">
        ${product.variants.map(variant => `
          <button class="variant-btn" data-sku="${variant.sku}">
            ${variant.name}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSpecs(product) {
  if (!product.specs?.length) return '';
  
  return `
    <div class="product-specs">
      <h3>Specifications</h3>
      <ul>
        ${product.specs.map(spec => `
          <li>${spec}</li>
        `).join('')}
      </ul>
    </div>
  `;
}

function renderAdditionalSections(product) {
  return `
    ${product.features ? `
    <div class="product-features animate">
      <h2>Features</h2>
      <div class="features-grid">
        ${product.features.map(feature => `
          <div class="feature-card">
            <img src="placeholder.jpg" data-src="${feature.icon}" 
                 alt="" class="lazy">
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${product.reviews ? `
    <div class="product-reviews animate">
      <h2>Customer Reviews</h2>
      ${product.reviews.map(review => `
        <div class="review-card">
          <div class="review-header">
            <span class="review-author">${review.author}</span>
            <span class="review-rating">
              ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </span>
          </div>
          <p class="review-text">${review.text}</p>
        </div>
      `).join('')}
    </div>
    ` : ''}
  `;
}

// Interactive elements
function initInteractiveElements() {
  initLazyLoading();
  initAddToCartButtons();
  initVariantSelectors();
  setupScrollAnimations();
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy');
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          lazyObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      addToCart(productId);
      
      // Visual feedback
      this.textContent = 'Added!';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
      }, 2000);
    });
  });
}

function initVariantSelectors() {
  document.querySelectorAll('.variant-btn').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      // Additional variant selection logic here
    });
  });
}

function setupScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));
}

// Change main image when thumbnail is clicked
window.changeMainImage = function(src, element) {
  const mainImg = document.querySelector('.main-image img');
  if (mainImg) {
    mainImg.src = src;
    document.querySelectorAll('.thumbnail').forEach(t => {
      t.classList.remove('active');
    });
    element.classList.add('active');
  }
};

// Error handling
function handleError(error) {
  console.error('Product loading error:', error);
  container.innerHTML = `
    <div class="error-state">
      <div class="error-icon">!</div>
      <h2>Product Not Available</h2>
      <p>${error.message || 'Failed to load product details'}</p>
      <a href="products.html" class="btn">Back to Products</a>
      <button class="btn retry-btn" onclick="location.reload()">
        Try Again
      </button>
    </div>
  `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', displayProductDetails);