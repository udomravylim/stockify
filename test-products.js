const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const fetchProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Fetch all products
    const products = await Product.find();

    if (products.length === 0) {
      console.log('No products found in the database.');
      console.log('You can import products.json using:');
      console.log('mongoimport --db stockify --collection products --file products.json --jsonArray\n');
    } else {
      console.log(`Found ${products.length} product(s):\n`);
      console.log('='.repeat(80));
      
      products.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(`  Name: ${product.name}`);
        console.log(`  Quantity: ${product.quantity}`);
        console.log(`  Price: $${product.price.toFixed(2)}`);
        console.log(`  Category: ${product.category}`);
        console.log(`  Description: ${product.description || 'N/A'}`);
        console.log(`  ID: ${product._id}`);
        console.log('-'.repeat(80));
      });
    }

    // Close connection
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fetchProducts();

