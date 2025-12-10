const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - check multiple possible Angular build paths
const path = require('path');
const fs = require('fs');

// Possible Angular build output paths
const possiblePaths = [
  'dist/stockify/browser',
  'dist/browser',
  'dist'
];

let angularBuildPath = null;
for (const buildPath of possiblePaths) {
  const indexPath = path.join(__dirname, buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    angularBuildPath = buildPath;
    break;
  }
}

if (angularBuildPath) {
  app.use(express.static(angularBuildPath));
  console.log(`✅ Serving Angular app from: ${angularBuildPath}`);
} else {
  console.log(`📄 Serving static HTML from: public/`);
  console.log(`💡 Run 'ng build' to build Angular app for full features`);
}

// Fallback to public folder
app.use(express.static('public'));

// Routes
app.use('/api/products', productRoutes);

// API route
app.get('/api', (req, res) => {
  res.json({ message: 'Stockify API is running!' });
});

// Catch-all handler: send back Angular's index.html for SPA routing
// This must be last, after all other routes
app.use((req, res) => {
  // Handle 404 for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  // Try to serve built Angular app, fallback to public/index.html
  if (angularBuildPath) {
    const angularIndex = path.join(__dirname, angularBuildPath, 'index.html');
    if (fs.existsSync(angularIndex)) {
      return res.sendFile(angularIndex);
    }
  }
  
  const publicIndex = path.join(__dirname, 'public/index.html');
  if (fs.existsSync(publicIndex)) {
    return res.sendFile(publicIndex);
  }
  
  res.json({ message: 'Stockify API is running! Build Angular app (ng build) to see the frontend.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🎉 Stockify is running!`);
  console.log(`   Frontend: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/products\n`);
});

