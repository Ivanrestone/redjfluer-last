const fs = require('fs');
const path = require('path');

const categories = {
  'Bouquets': path.join(__dirname, '../../frontend/public/Bouquets'),
  'BoxWithFlowers': path.join(__dirname, '../../frontend/public/BoxWithFlowers'),
  'VaseWithPlant': path.join(__dirname, '../../frontend/public/VaseWithPlant')
};

const imageData = {};

for (const [category, folderPath] of Object.entries(categories)) {
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    imageData[category] = imageFiles.map(file => ({
      filename: file,
      path: `/${category}/${file}`,
      size: fs.statSync(path.join(folderPath, file)).size
    }));
  }
}

console.log(JSON.stringify(imageData, null, 2));

// Save to file
const outputPath = path.join(__dirname, '../product-images-data.json');
fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));
console.log(`\nImage data saved to: ${outputPath}`);
