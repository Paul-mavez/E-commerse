// products.js - Updated to support productModal.js + global arrays for search.js
fetch("../products.json")
// Determine the correct base URL depending on current page
const BASE_URL = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' 
    ? './'
    : '../';

// Fetch products.json dynamically
fetch(`${BASE_URL}products.json`)
  .then(res => res.json())
  .then(products => {
    // ✅ Store globally (for search.js)
    // ✅ Store globally for search.js
    window.data = products;
    window.breastPumpProducts = products.pump || [];
    window.breastfeedingProducts = products.feeding || [];
@@ -22,16 +27,14 @@ fetch("../products.json")
      card.innerHTML = `
        <div class="card product-card" data-id="${p.id}" data-category="${category}">
          <div class="product-image">
            <!-- Make image clickable to go to product detail -->
            <a href="../Pages/product-detail.html?id=${p.id}&category=${category}" style="display: block;">
              <img src="${p.img}" alt="${p.title}">
            <a href="${BASE_URL}Pages/product-detail.html?id=${p.id}&category=${category}" style="display:block;">
              <img src="${BASE_URL}${p.img}" alt="${p.title}">
            </a>
            <button class="add-to-cart">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
          <!-- Make title clickable too -->
          <a href="../Pages/product-detail.html?id=${p.id}&category=${category}" class="product-title">
          <a href="${BASE_URL}Pages/product-detail.html?id=${p.id}&category=${category}" class="product-title">
            ${p.title}
          </a>
          <p class="product-price">${p.price}</p>
@@ -41,10 +44,10 @@ fetch("../products.json")
      return card;
    }

    // Render products by category (only if container exists)
    // Render products if containers exist
    if (pumpsContainer) window.breastPumpProducts.forEach(p => pumpsContainer.appendChild(createProductCard(p, 'pump')));
    if (feedingContainer) window.breastfeedingProducts.forEach(p => feedingContainer.appendChild(createProductCard(p, 'feeding')));
    if (babyContainer) window.babyProducts.forEach(p => babyContainer.appendChild(createProductCard(p, 'baby')));
    if (mamaContainer) window.mamaProducts.forEach(p => mamaContainer.appendChild(createProductCard(p, 'mama')));
  })
  .catch(err => console.error('Error loading products:', err));
  .catch(err => console.error('Error loading products:', err));
