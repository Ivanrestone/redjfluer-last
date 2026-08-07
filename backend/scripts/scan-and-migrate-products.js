const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Product model
const Product = require('../models/Product');

const categories = ['Bouquets', 'BoxWithFlowers', 'VaseWithPlant'];
const frontendPublicPath = path.join(__dirname, '../../frontend/public');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function scanImagesAndMigrate() {
  try {
    const allImages = [];

    // Scan each category folder
    for (const category of categories) {
      const categoryPath = path.join(frontendPublicPath, category);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`Category folder not found: ${category}`);
        continue;
      }

      const files = fs.readdirSync(categoryPath);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );

      imageFiles.forEach(file => {
        allImages.push({
          category,
          filename: file,
          path: `/${category}/${file}`
        });
      });

      console.log(`Found ${imageFiles.length} images in ${category}`);
    }

    console.log(`Total images found: ${allImages.length}`);

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create products from images (grouping logic)
    // For now, create one product per image with auto-incrementing IDs
    let productId = 1;
    for (const image of allImages) {
      const product = new Product({
        name: `${image.category} Product ${productId}`,
        price: 100.00 + (productId * 10), // Default pricing
        category: image.category,
        description: `Beautiful ${image.category} arrangement`,
        images: [image.path],
        captions: [''],
        limited: false,
        unitsSold: 0
      });

      await product.save();
      productId++;
    }

    console.log(`Migrated ${productId - 1} products to MongoDB`);
    console.log('Migration completed successfully');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

scanImagesAndMigrate();
