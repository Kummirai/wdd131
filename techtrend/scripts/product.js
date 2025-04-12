// Product Data
const products = [
  {
    id: 1,
    name: "UltraBook Pro",
    category: "laptops",
    price: 1299.99,
    description: "Thin and light professional laptop with powerful performance.",
    specs: [
            "15.6\" 4K OLED Display",
            "Intel Core i7-1165G7",
            "16GB RAM",
            "512GB SSD",
            "Windows 11 Pro"
        ],
    image: "images/laptop-1.jpg",
    thumbnails: [
            "images/laptop-1-thumb1.jpg",
            "images/laptop-1-thumb2.jpg",
            "images/laptop-1-thumb3.jpg"
        ],
    featured: true,
    reviews: [
      {
        author: "John D.",
        rating: 5,
        comment: "Fantastic laptop! The screen is amazing and it's so lightweight."
            },
      {
        author: "Sarah M.",
        rating: 4,
        comment: "Great performance, but battery life could be better."
            }
        ]
    },
    // More products...
];

// Function to display featured products
function displayFeaturedProducts() {
  const featuredContainer = document.getElementById('featuredProducts');
  if (!featuredContainer) return;

  const featuredProducts = products.filter(product => product.featured);

  featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="placeholder.jpg" data-src="${product.image}" alt="${product.name}" class="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Function to display all products with filtering
function displayAllProducts() {
  const productsContainer = document.getElementById('productsGrid');
  if (!productsContainer) return;

  // Get filter values
  const category = document.getElementById('category').value;
  const priceRange = document.getElementById('price').value;
  const sortBy = document.getElementById('sort').value;

  // Filter products
  let filteredProducts = [...products];

  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    if (priceRange.endsWith('+')) {
      filteredProducts = filteredProducts.filter(product => product.price >= min);
    } else {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= min && product.price <= max
      );
    }
  }

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // Featured is default (already sorted in array)
      break;
  }

  // Display products
  productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <a href="product-detail.html?id=${product.id}">
                <img src="placeholder.jpg" data-src="${product.image}" alt="${product.name}" class="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </a>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `).join('');
}

// Function to display product details
function displayProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) return;

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  // Set product info
  document.getElementById('detailProductName').textContent = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('detailProductPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('productDescription').textContent = product.description;
  document.getElementById('productCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  // Set main image
  const mainImage = document.getElementById('mainProductImage');
  mainImage.src = "placeholder.jpg";
  mainImage.dataset.src = product.image;
  mainImage.alt = product.name;

  // Set thumbnails
  const thumbnailsContainer = document.getElementById('thumbnailImages');
  thumbnailsContainer.innerHTML = product.thumbnails.map((thumb, index) => `
        <img src="placeholder.jpg" data-src="${thumb}" alt="${product.name} thumbnail ${index + 1}" 
             class="thumbnail ${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage('${thumb}', this)">
    `).join('');

  // Set specifications
  const specsContainer = document.getElementById('productSpecs');
  specsContainer.innerHTML = product.specs.map(spec => `
        <div class="spec-item">
            <span class="spec-dot">•</span>
            <span class="spec-text">${spec}</span>
        </div>
    `).join('');

  // Set reviews
  const reviewsContainer = document.getElementById('productReviews');
  reviewsContainer.innerHTML = product.reviews.map(review => `
        <div class="review">
            <div class="review-author">${review.author}</div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-comment">${review.comment}</div>
        </div>
    `).join('');

  // Display related products
  displayRelatedProducts(product.category, product.id);
}

// Function to display related products
function displayRelatedProducts(category, currentProductId) {
  const relatedContainer = document.getElementById('relatedProducts');
  if (!relatedContainer) return;

  const relatedProducts = products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    relatedContainer.innerHTML = '<p>No related products found.</p>';
    return;
  }

  relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <a href="product-detail.html?id=${product.id}">
                <img src="placeholder.jpg" data-src="${product.image}" alt="${product.name}" class="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                </div>
            </a>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `).join('');
}

// Change main image when thumbnail is clicked
window.changeMainImage = function(src, element) {
  document.getElementById('mainProductImage').src = src;
  document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
  element.classList.add('active');
};

// Initialize event listeners for filters
function initFilters() {
  const categorySelect = document.getElementById('category');
  const priceSelect = document.getElementById('price');
  const sortSelect = document.getElementById('sort');

  if (categorySelect) categorySelect.addEventListener('change', displayAllProducts);
  if (priceSelect) priceSelect.addEventListener('change', displayAllProducts);
  if (sortSelect) sortSelect.addEventListener('change', displayAllProducts);
}

// Initialize product pages
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('featuredProducts')) {
    displayFeaturedProducts();
  }

  if (document.getElementById('productsGrid')) {
    displayAllProducts();
    initFilters();
  }

  if (document.getElementById('mainProductImage')) {
    displayProductDetails();
  }
});