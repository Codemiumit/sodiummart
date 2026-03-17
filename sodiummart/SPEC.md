# SodiumMart - E-Commerce Platform Specification

## 1. Project Overview

**Project Name:** SodiumMart  
**Type:** Full-stack Single-vendor E-commerce Website with Admin Panel  
**Core Functionality:** A complete online shopping platform where customers can browse products, add to cart, checkout, and track orders. Admin can manage products, orders, categories, and site settings.  
**Target Users:** General consumers shopping online, and store administrators

## 2. Technical Architecture

- **Architecture:** MVC (Model-View-Controller)
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **File Structure:**
  - `/backend` - Server, config, models, controllers, routes
  - `/frontend` - User-facing pages
  - `/admin` - Admin panel pages
  - `/public` - Static assets (images, uploads)

## 3. UI/UX Specification

### Color Palette
- **Primary:** #0EA5E9 (Sky Blue)
- **Primary Dark:** #0284C7
- **Secondary:** #1E293B (Slate Dark)
- **Accent:** #F59E0B (Amber)
- **Success:** #10B981 (Emerald)
- **Danger:** #EF4444 (Red)
- **Background:** #F8FAFC (Light Gray)
- **Card Background:** #FFFFFF
- **Text Primary:** #1E293B
- **Text Secondary:** #64748B
- **Border:** #E2E8F0

### Typography
- **Font Family:** 'Inter', sans-serif
- **Headings:** 700 weight
- **Body:** 400 weight
- **H1:** 2.5rem (40px)
- **H2:** 2rem (32px)
- **H3:** 1.5rem (24px)
- **Body:** 1rem (16px)
- **Small:** 0.875rem (14px)

### Spacing System
- **xs:** 0.25rem (4px)
- **sm:** 0.5rem (8px)
- **md:** 1rem (16px)
- **lg:** 1.5rem (24px)
- **xl:** 2rem (32px)
- **2xl:** 3rem (48px)

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Layout Structure
- **Max Width:** 1280px
- **Grid:** 12-column system
- **Sidebar (Admin):** 260px fixed width

## 4. Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  image: String,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  price: Number,
  salePrice: Number (optional),
  category: ObjectId (ref: Categories),
  images: [String],
  stock: Number,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: Users),
  items: [{
    product: ObjectId (ref: Products),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    zip: String
  },
  totalAmount: Number,
  paymentMethod: String,
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  orderStatus: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: Date,
  updatedAt: Date
}
```

### Settings Collection
```javascript
{
  _id: ObjectId,
  siteName: String,
  siteLogo: String,
  contactEmail: String,
  contactPhone: String,
  address: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String
  }
}
```

## 5. API Endpoints

### Auth Routes
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/logout` - User logout
- GET `/api/auth/profile` - Get user profile

### Product Routes
- GET `/api/products` - Get all products (with pagination, search, filter, sort)
- GET `/api/products/:slug` - Get single product
- POST `/api/products` - Create product (admin)
- PUT `/api/products/:id` - Update product (admin)
- DELETE `/api/products/:id` - Delete product (admin)

### Category Routes
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category (admin)
- PUT `/api/categories/:id` - Update category (admin)
- DELETE `/api/categories/:id` - Delete category (admin)

### Order Routes
- POST `/api/orders` - Create order
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get single order
- PUT `/api/orders/:id/status` - Update order status (admin)
- GET `/api/orders/admin/all` - Get all orders (admin)

### Settings Routes
- GET `/api/settings` - Get site settings
- PUT `/api/settings` - Update settings (admin)

## 6. Page Structure

### Frontend Pages
1. **index.html** - Homepage with hero, categories, featured products
2. **products.html** - Product listing with search, sort, filter
3. **product-detail.html** - Single product with gallery
4. **cart.html** - Shopping cart
5. **checkout.html** - Checkout form
6. **login.html** - User login
7. **register.html** - User registration
8. **orders.html** - User order tracking

### Admin Pages
1. **index.html** - Dashboard with stats
2. **products.html** - Product CRUD
3. **orders.html** - Order management
4. **categories.html** - Category management
5. **settings.html** - Site settings

## 7. Functionality Specification

### User Features
- Browse products by category
- Search products by name
- Sort products (price low-high, high-low, newest)
- Filter by category, price range
- Add to cart with quantity selection
- Register and login
- Place orders with shipping info
- Track order status
- View order history

### Admin Features
- View dashboard with sales stats
- Add/Edit/Delete products with images
- Manage order statuses
- Add/Edit/Delete categories
- Update site settings (logo, name, contact)

### Security
- Password hashing with bcrypt
- JWT authentication
- Protected routes for authenticated users
- Admin-only routes protected

## 8. Mock Payment Integration
- Simulated payment process
- Payment status updates (pending → paid)
- Order confirmation on success

## 9. Acceptance Criteria

### Frontend
- [ ] Homepage loads with hero, categories, featured products
- [ ] Products page shows grid with filters working
- [ ] Product detail shows all info and images
- [ ] Cart persists and updates correctly
- [ ] Checkout processes order
- [ ] Auth flow works (register/login/logout)
- [ ] Orders page shows user order history

### Admin
- [ ] Dashboard shows accurate stats
- [ ] Products can be added/edited/deleted
- [ ] Orders can be viewed and status updated
- [ ] Categories can be managed
- [ ] Settings can be updated

### General
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Database connects successfully
- [ ] API endpoints return correct responses
