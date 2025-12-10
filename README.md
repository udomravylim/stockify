# Stockify - Product Management System

A Node.js/Express API for managing products in MongoDB.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the root directory with the following content:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/stockify
   ```
   
   **Note:** If your MongoDB is running on a different host or port, or if you're using MongoDB Atlas, update the `MONGODB_URI` accordingly.
   
   Example for MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stockify
   ```

3. **Make sure MongoDB is running** on your system or that you have access to your MongoDB instance.

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Product Schema

- `name` (required): Product name
- `quantity` (required): Stock quantity (number, min: 0)
- `price` (required): Product price (number, min: 0)
- `category` (required): Product category (string)
- `description` (optional): Product description

## Example Request

**Create a product:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "quantity": 10,
  "price": 999.99,
  "category": "Electronics",
  "description": "High-performance laptop"
}
```

