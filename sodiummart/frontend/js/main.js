let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function addToCart(product, quantity = 1) {
  const existingItem = cart.find(item => item.product._id === product._id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast('Product added to cart!');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, quantity) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  
  const item = cart.find(item => item.product._id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-secondary text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function toggleSearch() {
  const searchBar = document.getElementById('search-bar');
  searchBar.classList.toggle('hidden');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('dropdown-menu');
  dropdown.classList.toggle('hidden');
}

function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  const userMenu = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');
  
  if (auth.isLoggedIn()) {
    authButtons.classList.add('hidden');
    userMenu.classList.remove('hidden');
    const user = auth.getUser();
    userName.textContent = user.name.split(' ')[0];
  } else {
    authButtons.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

function logout() {
  auth.logout();
}

async function loadCategories() {
  try {
    const { categories } = await categories.getAll();
    const container = document.getElementById('categories-grid');
    
    if (!container) return;
    
    container.innerHTML = categories.map(cat => `
      <a href="/products.html?category=${cat._id}" class="category-card block bg-white p-6 rounded-xl shadow-sm text-center transition hover:shadow-md">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <i class="fas fa-tag text-primary text-2xl"></i>
        </div>
        <h3 class="font-semibold text-secondary">${cat.name}</h3>
      </a>
    `).join('');
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadFeaturedProducts() {
  try {
    const { products } = await products.getFeatured();
    const container = document.getElementById('featured-products');
    
    if (!container) return;
    
    container.innerHTML = products.map(product => renderProductCard(product)).join('');
  } catch (error) {
    console.error('Error loading featured products:', error);
  }
}

async function loadLatestProducts() {
  try {
    const { products } = await products.getAll({ limit: 8 });
    const container = document.getElementById('latest-products');
    
    if (!container) return;
    
    container.innerHTML = products.map(product => renderProductCard(product)).join('');
  } catch (error) {
    console.error('Error loading latest products:', error);
  }
}

function renderProductCard(product) {
  const price = product.salePrice || product.price;
  const originalPrice = product.salePrice ? product.price : null;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  
  const image = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300x300?text=No+Image';
  
  return `
    <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden transition duration-300">
      <a href="/product-detail.html?slug=${product.slug}">
        <div class="relative">
          <img src="${image}" alt="${product.name}" class="w-full h-64 object-cover">
          ${discount > 0 ? `<span class="absolute top-2 right-2 bg-accent text-white text-sm px-2 py-1 rounded">-${discount}%</span>` : ''}
          ${product.featured ? `<span class="absolute top-2 left-2 bg-primary text-white text-sm px-2 py-1 rounded">Featured</span>` : ''}
        </div>
      </a>
      <div class="p-4">
        <a href="/products.html?category=${product.category?._id}" class="text-sm text-primary">${product.category?.name || 'Uncategorized'}</a>
        <a href="/product-detail.html?slug=${product.slug}">
          <h3 class="font-semibold text-lg text-secondary mb-2 hover:text-primary">${product.name}</h3>
        </a>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xl font-bold text-primary">$${price.toFixed(2)}</span>
            ${originalPrice ? `<span class="text-sm text-gray-400 line-through ml-2">$${originalPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
        <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition">
          <i class="fas fa-cart-plus mr-2"></i>Add to Cart
        </button>
      </div>
    </div>
  `;
}

function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
        <a href="/products.html" class="text-primary hover:underline">Continue Shopping</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = cart.map(item => {
    const price = item.product.salePrice || item.product.price;
    const image = item.product.images && item.product.images.length > 0 
      ? item.product.images[0] 
      : 'https://via.placeholder.com/100x100?text=No+Image';
    
    return `
      <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
        <img src="${image}" alt="${item.product.name}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <h4 class="font-semibold text-secondary">${item.product.name}</h4>
          <p class="text-primary font-bold">$${price.toFixed(2)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="updateQuantity('${item.product._id}', ${item.quantity - 1})" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
          <span class="w-8 text-center">${item.quantity}</span>
          <button onclick="updateQuantity('${item.product._id}', ${item.quantity + 1})" class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
        </div>
        <button onclick="removeFromCart('${item.product._id}')" class="text-danger hover:text-red-700">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  }).join('');
  
  const totalContainer = document.getElementById('cart-total');
  if (totalContainer) {
    totalContainer.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateAuthUI();
  
  if (document.getElementById('categories-grid')) {
    loadCategories();
    loadFeaturedProducts();
    loadLatestProducts();
  }
});
