# 🍽️ Food Ordering App (Zomato/Swiggy Clone)

A full-stack MERN (MongoDB, Express, React, Node.js) food ordering platform that allows users to browse restaurants, explore menus, add items to cart, and place orders — just like Zomato or Swiggy!

## 🚀 Features

### 👤 Authentication
- Login and Register functionality
- JWT-based authentication system
- Role-based access (Restaurant and User)

### 🏪 Restaurants & Menus
- Dynamic menu structure for each restaurant
- Each restaurant can have custom categories (e.g., Parathas, Noodles, Desserts)
- Restaurant can add, or delete food items of their menu
- Upload images for food items on menu

### 🛒 Cart System
- Add and remove food items to/from cart
- Cart can only contain food from **one restaurant at a time**
  - If a user adds an item from a different restaurant, they are prompted to either clear the cart or cancel the action

### 💳 Checkout
- Place orders with selected items
- Order summary before confirmation

### 📦 Order Tracking
- Order status updates (e.g., Placed, Preparing, Delivered)
- Restaurant can manage and update order status

### 📁 Image Uploads
- All images ( of food items) are handled via a local `uploads/` folder
- `.gitignore` ensures uploaded images are not tracked in the repo

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **State Management:** React Context API

---

## 📦 Installation Instructions

```bash
# Clone the repo
git clone https://github.com/arshagarwal08/foodStore.git

# Navigate to the backend and install dependencies
cd backend
npm install

# Set up your environment variables
cp .env.example .env

# Start the backend server
npm start

# In a new terminal, go to frontend and install dependencies
cd ../frontend
npm install

# Start the frontend
npm run dev
