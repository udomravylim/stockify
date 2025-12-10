# 📦 Stockify - Product Management System

A full-stack MEAN (MongoDB, Express, Angular, Node.js) application for managing product inventory with full CRUD operations.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete products
- **Product Management**: Track product name, quantity, price, category, and description
- **Search Functionality**: Search products by name, category, or description
- **Category Filtering**: Quick filter by category with clickable tabs
- **Responsive Design**: Modern, clean UI with gradient background
- **Real-time Updates**: Instant updates when products are added, edited, or deleted

## 🛠️ Tech Stack

- **Frontend**: Angular (TypeScript)
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Architecture**: MEAN Stack (MongoDB, Express, Angular, Node.js)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stockify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/stockify
   ```
   
   For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stockify
   ```

4. **Import sample data (optional)**
   ```bash
   mongoimport --db stockify --collection products --file products.json --jsonArray
   ```

## 🏃 Running the Application

### Development Mode

1. **Start the server**
   ```bash
   npm start
   ```
   
   This will:
   - Build the Angular application
   - Start the Node.js server on port 3000
   - Connect to MongoDB

2. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

### Alternative: Run Separately

**Terminal 1 - Backend:**
```bash
npm run start:server
```

**Terminal 2 - Frontend (for development with hot reload):**
```bash
npm run serve
```

## 📁 Project Structure

```
stockify/
├── src/app/
│   ├── components/
│   │   ├── product-list/      # Product list component
│   │   └── product-form/      # Product form component
│   ├── services/
│   │   └── product.service.ts # Angular service for API calls
│   └── app.ts                 # Main app component
├── server.js                  # Express server
├── routes/
│   └── productRoutes.js       # API routes
├── models/
│   └── Product.js             # MongoDB schema
├── config/
│   └── db.js                  # Database connection
└── public/                    # Static files
```

## 🔌 API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## 📝 Product Schema

```javascript
{
  name: String (required),
  quantity: Number (required, min: 0),
  price: Number (required, min: 0),
  category: String (required),
  description: String (optional)
}
```

## ✨ Key Features

### Angular Components
- **ProductListComponent**: Displays all products with search and filter capabilities
- **ProductFormComponent**: Modal form for creating and editing products

### Angular Services
- **ProductService**: Handles all HTTP requests to the backend API

### Node.js Web Services
- RESTful API with Express
- MongoDB integration with Mongoose
- CORS enabled for cross-origin requests

### MongoDB Database
- Database: `stockify`
- Collection: `products`
- Automatic timestamps on documents

## 🎯 Usage

1. **View Products**: All products are displayed in a grid layout
2. **Search**: Use the search box to find products by name, category, or description
3. **Filter by Category**: Click category tabs to filter products
4. **Add Product**: Click "Add Product" button to create a new product
5. **Edit Product**: Click "Edit" on any product card to modify it
6. **Delete Product**: Click "Delete" on any product card to remove it

## 🧪 Testing

Test the API endpoints using:
- Browser: Navigate to `http://localhost:3000/api/products`
- Postman or similar tools
- cURL commands

## 📦 Dependencies

### Backend
- express
- mongoose
- dotenv
- cors

### Frontend
- Angular framework
- Angular HttpClient
- RxJS

## 🔒 Environment Variables

Make sure to set up your `.env` file with:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string

## 📄 License

ISC

## 👤 Author

Your Name

## 🙏 Acknowledgments

Built as a MEAN stack application demonstrating full-stack development with Angular, Node.js, Express, and MongoDB.
