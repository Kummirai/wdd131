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
  {
    id: 2,
    name: "GameMax Fury",
    category: "laptops",
    price: 924.3,
    description: "High-performance gaming machine with RGB keyboard.",
    specs: [
      "15.6\" FHD Display",
      "AMD Ryzen 7 5800H",
      "16GB RAM",
      "1TB SSD",
      "Windows 11 Pro"
    ],
    image: "images/mackbook-1.png",
    thumbnails: [
      "images/laptop-1-thumb1.jpg",
      "images/laptop-1-thumb2.jpg",
      "images/laptop-1-thumb3.jpg"
    ],
    featured: true,
    reviews: [
      {
        author: "Alex P.",
        rating: 5,
        comment: "Loving the performance and the build quality."
      },
      {
        author: "Jamie L.",
        rating: 4,
        comment: "Solid value for money."
      }
    ]
  },
  {
    id: 3,
    name: "PixelPhone X",
    category: "phones",
    price: 799.99,
    description: "Flagship smartphone with best-in-class camera.",
    specs: [
      "6.4\" AMOLED Display",
      "Snapdragon 888",
      "8GB RAM",
      "128GB Storage",
      "Android 12"
    ],
    image: "images/samsung-laptop.png",
    thumbnails: [
      "images/phone-1-thumb1.jpg",
      "images/phone-1-thumb2.jpg"
    ],
    featured: false,
    reviews: [
      {
        author: "Mike T.",
        rating: 5,
        comment: "The camera is unbelievable!"
      }
    ]
  },
  {
    id: 4,
    name: "AirBuds Pro",
    category: "accessories",
    price: 199.99,
    description: "Premium wireless earbuds with active noise cancellation.",
    specs: [
      "Active Noise Cancellation",
      "24hr battery life",
      "Wireless charging",
      "Bluetooth 5.0"
    ],
    image: "https://img.freepik.com/free-photo/woman-working-from-home-laptop_53876-132032.jpg?t=st=1744500986~exp=1744504586~hmac=fbfa0626beabe84425b5d77f3829d2afd64a149efa7fac094547ff21186927ae&w=740",
    thumbnails: [
      "images/earbuds-thumb1.jpg"
    ],
    featured: true,
    reviews: [
      {
        author: "Lisa K.",
        rating: 4,
        comment: "Great sound quality and battery life."
      },
      {
        author: "David R.",
        rating: 5,
        comment: "Best earbuds I've ever owned."
      }
    ]
  },
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
    image: "images/ultra-book.jpg",
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
  {
    id: 2,
    name: "GameMax Fury",
    category: "laptops",
    price: 924.3,
    description: "High-performance gaming machine with RGB keyboard.",
    specs: [
      "15.6\" FHD Display",
      "AMD Ryzen 7 5800H",
      "16GB RAM",
      "1TB SSD",
      "Windows 11 Pro"
    ],
    image: "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309642.jpg?t=st=1744500880~exp=1744504480~hmac=ef5c62c4c0f21797aaa387765e377d7ec9203d333ed3d1a1013e4684404e458c&w=740",
    thumbnails: [
      "images/laptop-1-thumb1.jpg",
      "images/laptop-1-thumb2.jpg",
      "images/laptop-1-thumb3.jpg"
    ],
    featured: true,
    reviews: [
      {
        author: "Alex P.",
        rating: 5,
        comment: "Loving the performance and the build quality."
      },
      {
        author: "Jamie L.",
        rating: 4,
        comment: "Solid value for money."
      }
    ]
  },
  {
    id: 3,
    name: "PixelPhone X",
    category: "phones",
    price: 799.99,
    description: "Flagship smartphone with best-in-class camera.",
    specs: [
      "6.4\" AMOLED Display",
      "Snapdragon 888",
      "8GB RAM",
      "128GB Storage",
      "Android 12"
    ],
    image: "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?t=st=1744501062~exp=1744504662~hmac=9ae0b0b48e204a82ac14a7bef0d68387d254af3c3a3249505507b3b257139a27&w=740",
    thumbnails: [
      "images/phone-1-thumb1.jpg",
      "images/phone-1-thumb2.jpg"
    ],
    featured: false,
    reviews: [
      {
        author: "Mike T.",
        rating: 5,
        comment: "The camera is unbelievable!"
      }
    ]
  },
  {
    id: 4,
    name: "AirBuds Pro",
    category: "accessories",
    price: 199.99,
    description: "Premium wireless earbuds with active noise cancellation.",
    specs: [
      "Active Noise Cancellation",
      "24hr battery life",
      "Wireless charging",
      "Bluetooth 5.0"
    ],
    image: "https://img.freepik.com/free-photo/woman-working-from-home-laptop_53876-132032.jpg?t=st=1744500986~exp=1744504586~hmac=fbfa0626beabe84425b5d77f3829d2afd64a149efa7fac094547ff21186927ae&w=740",
    thumbnails: [
      "images/earbuds-thumb1.jpg"
    ],
    featured: true,
    reviews: [
      {
        author: "Lisa K.",
        rating: 4,
        comment: "Great sound quality and battery life."
      },
      {
        author: "David R.",
        rating: 5,
        comment: "Best earbuds I've ever owned."
      }
    ]
  }
];

// Initialize lazy loading for images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy');
  
  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    io.observe(target);
  };

  lazyImages.forEach(lazyLoad);
}

// Function to display featured products
function displayFeaturedProducts() {
  const featuredContainer = document.getElementById('featuredProducts');
  if (!featuredContainer) return;

  const featuredProducts = products.filter(product => product.featured);

  featuredContainer.innerHTML = featuredProducts.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `).join('');

  initLazyLoading();
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
        <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </a>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `).join('');

  initLazyLoading();
}

// Function to display product details
function displayProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    window.location.href = 'products.html';
    return;
  }

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    document.querySelector('.product-detail-container').innerHTML = `
      <div class="error-message">
        <h2>Product Not Found</h2>
        <p>The requested product could not be found.</p>
        <a href="products.html" class="btn">Browse Products</a>
      </div>
    `;
    return;
  }

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
  initLazyLoading();
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
        <img src=${product.image} data-src="${product.image}" alt="${product.name}" class="lazy">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </a>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `).join('');

  initLazyLoading();
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

// Initialize mobile menu toggle
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

// Initialize product pages
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  
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