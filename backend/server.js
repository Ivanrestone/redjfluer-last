const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, '../frontend/public/Bouquets'),
  path.join(__dirname, '../frontend/public/BoxWithFlowers'),
  path.join(__dirname, '../frontend/public/VaseWithPlant')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || 'Bouquets';
    let uploadPath;

    switch (category) {
      case 'Bouquets':
        uploadPath = path.join(__dirname, '../frontend/public/Bouquets');
        break;
      case 'BoxWithFlowers':
        uploadPath = path.join(__dirname, '../frontend/public/BoxWithFlowers');
        break;
      case 'VaseWithPlant':
        uploadPath = path.join(__dirname, '../frontend/public/VaseWithPlant');
        break;
      default:
        uploadPath = path.join(__dirname, '../frontend/public/Bouquets');
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const category = req.body.category || 'Bouquets';
    const imagePath = `/${category}/${req.file.filename}`;

    res.json({
      success: true,
      imagePath: imagePath,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
