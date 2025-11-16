// products.js - dynamic product rendering with global arrays for search.js

// Determine base URL depending on current page
const BASE_URL = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' 
    ? './' 
    : '../';

// Containers (check if they exist)
const pumpsContainer = document.getElementById('pumpsContainer');
const feedingContainer = document.getElementById('feedingContainer');
const babyContainer = document.getElementById('babyContainer');
const mamaContainer = document.getElementById('mamaContainer');

// Fetch products.json dynamically
fetch(`${BASE_URL}products.json`)
  .then(res => res.json())
  .then(products => {
    // Store globally for search.js
    window.data = products;
    window.breastPumpProducts = products.pump || [];
    window.breastfeedingProducts = products.feeding || [];
    window.babyProducts = products.baby || [];
    window.mamaProducts = products.mama || [];

    // Function to create a product card
    function createProductCard(p, category) {
      const card = document.createElement('div');
      card.className = 'card product-card';
      card.dataset.id = p.id;
      card.dataset.category = category;

      card.innerHTML = `
        <div class="product-image">
          <a href="${BASE_URL}Pages/product-detail.html?id=${p.id}&category=${category}" style="display:block;">
            <img src="${BASE_URL}${p.img}" alt="${p.title}">
          </a>
          <button class="add-to-cart">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
        <a href="${BASE_URL}Pages/product-detail.html?id=${p.id}&category=${category}" class="product-title">
          ${p.title}
        </a>
        <p class="product-price">${p.price}</p>
      `;
      return card;
    }

    // Render products by category (only if container exists)
    if (pumpsContainer) window.breastPumpProducts.forEach(p => pumpsContainer.appendChild(createProductCard(p, 'pump')));
    if (feedingContainer) window.breastfeedingProducts.forEach(p => feedingContainer.appendChild(createProductCard(p, 'feeding')));
    if (babyContainer) window.babyProducts.forEach(p => babyContainer.appendChild(createProductCard(p, 'baby')));
    if (mamaContainer) window.mamaProducts.forEach(p => mamaContainer.appendChild(createProductCard(p, 'mama')));
  })
  .catch(err => console.error('Error loading products:', err));
