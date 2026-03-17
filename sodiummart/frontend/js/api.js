const API_BASE = '/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
};

const auth = {
  async login(email, password) {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  async register(name, email, password, phone, address) {
    const data = await api.post('/auth/register', { name, email, password, phone, address });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

const products = {
  async getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products?${query}`);
  },

  async getBySlug(slug) {
    return api.get(`/products/${slug}`);
  },

  async getById(id) {
    return api.get(`/products/get/${id}`);
  },

  async getFeatured() {
    return api.get('/products/featured');
  },

  async create(productData) {
    return api.post('/products', productData);
  },

  async update(id, productData) {
    return api.put(`/products/${id}`, productData);
  },

  async delete(id) {
    return api.delete(`/products/${id}`);
  }
};

const categories = {
  async getAll() {
    return api.get('/categories');
  },

  async getBySlug(slug) {
    return api.get(`/categories/${slug}`);
  },

  async create(categoryData) {
    return api.post('/categories', categoryData);
  },

  async update(id, categoryData) {
    return api.put(`/categories/${id}`, categoryData);
  },

  async delete(id) {
    return api.delete(`/categories/${id}`);
  }
};

const orders = {
  async create(orderData) {
    return api.post('/orders', orderData);
  },

  async getUserOrders() {
    return api.get('/orders/my-orders');
  },

  async getById(id) {
    return api.get(`/orders/${id}`);
  },

  async getAll(params = {}) {
    const query = new URLSearchParams(params).toString();
    return api.get(`/orders/admin/all?${query}`);
  },

  async updateStatus(id, status) {
    return api.put(`/orders/${id}/status`, { orderStatus: status });
  },

  async getStats() {
    return api.get('/orders/stats');
  }
};

const settings = {
  async get() {
    return api.get('/settings');
  },

  async update(settingsData) {
    return api.put('/settings', settingsData);
  }
};

window.api = api;
window.auth = auth;
window.products = products;
window.categories = categories;
window.orders = orders;
window.settings = settings;
