# SodiumMart - E-Commerce Platform

A full-stack single-vendor e-commerce platform with user frontend and admin panel.

## Features

### User Frontend
- Clean homepage with hero section, categories, and featured products
- Product listing with search, sort, and filter functionality
- Product detail page with image gallery
- Shopping cart with quantity management
- Checkout system with shipping information
- User authentication (login/register)
- Order tracking

### Admin Panel
- Dashboard with sales statistics
- Product management (CRUD)
- Order management with status updates
- Category management
- Site settings

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Authentication:** JWT

## Project Structure

```
sodiummart/
├── backend/
│   ├── config/
│   │   ├── db.js          # Database connection
│   │   └── index.js      # Configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   └── Settings.js
│   └── routes/
│       ├── authRoutes.js
│       ├── productRoutes.js
│       ├── categoryRoutes.js
│       ├── orderRoutes.js
│       └── settingsRoutes.js
├── frontend/
│   ├── index.html        # Homepage
│   ├── products.html     # Product listing
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── register.html
│   ├── orders.html
│   └── js/
│       ├── api.js         # API utilities
│       └── main.js        # Frontend logic
├── admin/
│   ├── index.html        # Dashboard
│   ├── products.html
│   ├── orders.html
│   ├── categories.html
│   └── settings.html
├── public/
│   └── uploads/          # Image uploads
├── server.js             # Entry point
├── package.json
└── SPEC.md               # Specification
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Step 1: Install Dependencies

```bash
cd sodiummart
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sodiummart
JWT_SECRET=your_secret_key_here
```

### Step 3: Start MongoDB

If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud) and update the MONGODB_URI in .env

### Step 4: Run the Application

```bash
npm start
```

The server will start on http://localhost:3000

### Step 5: Create Admin User

1. Go to http://localhost:3000/register
2. Register a new account
3. Manually update the user's role to 'admin' in MongoDB:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile
- `GET /api/auth/admin/stats` - Admin stats

### Products
- `GET /api/products` - List products (with pagination, search, filter)
- `GET /api/products/:slug` - Get product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - User orders
- `GET /api/orders/admin/all` - All orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings (admin)

## Usage

### User Flow
1. Browse products on homepage
2. Use search/filter to find products
3. Add products to cart
4. Register/Login to checkout
5. Enter shipping information
6. Place order
7. Track order in "My Orders"

### Admin Flow
1. Login at /login.html
2. Go to /admin/ for dashboard
3. Add categories first
4. Add products
5. Manage orders as they come in
6. Update site settings

## Screenshots

- Homepage: Hero, categories, featured products
- Products: Grid with filters and search
- Cart: Item management
- Checkout: Shipping and payment form
- Admin Dashboard: Stats and recent orders

## License

MIT License
