require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Import models
const Message = require('./models/Message');
const Order = require('./models/Order');
const Account = require('./models/Account');
const Admin = require('./models/Admin');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

// Upload endpoint (single image)
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

// Multiple images upload endpoint
app.post('/api/upload-multiple', upload.array('images', 3), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const category = req.body.category || 'Bouquets';
    const captions = req.body.captions ? JSON.parse(req.body.captions) : [];

    const uploadedImages = req.files.map((file, index) => ({
      imagePath: `/${category}/${file.filename}`,
      filename: file.filename,
      caption: captions[index] || ''
    }));

    res.json({
      success: true,
      images: uploadedImages
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

// ==================== ADMIN AUTHENTICATION API ====================

// Register admin
app.post('/api/admin/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    const admin = new Admin({ email, password, name });
    await admin.save();

    // Generate token
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Failed to register admin' });
  }
});

// Login admin
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== PRODUCTS API ====================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (admin only)
app.post('/api/products', verifyAdminToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
app.patch('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== ANALYTICS API ====================

// Get dashboard analytics
app.get('/api/analytics', verifyAdminToken, async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const totalOrders = await Order.countDocuments();
    const newCustomers = await Account.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Get top performer (product with most units sold)
    const topPerformer = await Product.findOne().sort({ unitsSold: -1 });

    res.json({
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      newCustomers,
      topPerformer
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get recent orders
app.get('/api/orders/recent', verifyAdminToken, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('items');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    res.status(500).json({ error: 'Failed to fetch recent orders' });
  }
});

// Get all customers
app.get('/api/customers', verifyAdminToken, async (req, res) => {
  try {
    const customers = await Account.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Get available images from category folders
app.get('/api/images/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const validCategories = ['Bouquets', 'BoxWithFlowers', 'VaseWithPlant'];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const categoryPath = path.join(__dirname, '../frontend/public', category);

    if (!fs.existsSync(categoryPath)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(categoryPath);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    ).map(file => ({
      filename: file,
      path: `/${category}/${file}`
    }));

    res.json({ images: imageFiles });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      city,
      state,
      zipCode,
      deliveryDate,
      additionalMessage,
      items,
      subtotal,
      deliveryFee,
      total
    } = req.body;

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: `${deliveryAddress}, ${city}, ${state} ${zipCode}`,
      deliveryDate,
      additionalMessage,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'Pending'
    });

    await order.save();

    // Update product units sold (try to find by ID or name)
    for (const item of items) {
      try {
        // Try to find by MongoDB ObjectId first
        await Product.findByIdAndUpdate(item.id, { $inc: { unitsSold: item.quantity } });
      } catch (error) {
        // If ID fails, try to find by name
        await Product.findOneAndUpdate(
          { name: item.name },
          { $inc: { unitsSold: item.quantity } }
        );
      }
    }

    // Send order confirmation email to customer
    try {
      const itemsList = items.map(item =>
        `- ${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const customerMailOptions = {
        from: process.env.EMAIL_FROM || 'RedJFluer <noreply@redjfluer.com>',
        to: customerEmail,
        subject: 'Order Confirmation - RedJFluer',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">RedJFluer</h1>
              <p style="color: #e0e0e0; margin: 8px 0 0; font-size: 16px; font-weight: 300;">Artistry in Bloom</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Order Confirmation</h2>
              <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">Thank you for your order! We've received your request and will begin processing it shortly.</p>

              <!-- Order Details -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Order Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px; width: 140px;">Order ID:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${order._id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Customer:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${customerEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery Date:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${deliveryDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">Delivery Address:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${deliveryAddress}, ${city}, ${state} ${zipCode}</td>
                  </tr>
                </table>
              </div>

              <!-- Items Ordered -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  ${items.map(item => `
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                      <td style="padding: 12px 0; color: #333; font-size: 14px; font-weight: 500;">${item.name} (${item.size})</td>
                      <td style="padding: 12px 0; color: #666; font-size: 14px; text-align: right;">x${item.quantity}</td>
                      <td style="padding: 12px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>

              <!-- Order Summary -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Subtotal:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery Fee:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${deliveryFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Taxes:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${((total - subtotal - deliveryFee).toFixed(2))}</td>
                  </tr>
                  <tr style="border-top: 2px solid #667eea;">
                    <td style="padding: 12px 0; color: #333; font-size: 16px; font-weight: 600;">Total:</td>
                    <td style="padding: 12px 0; color: #667eea; font-size: 20px; font-weight: 700; text-align: right;">$${total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              ${additionalMessage ? `
              <div style="background: #fff9e6; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
                <h3 style="color: #333; margin: 0 0 10px; font-size: 16px; font-weight: 600;">Additional Message</h3>
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">${additionalMessage}</p>
              </div>
              ` : ''}
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 13px; margin: 0;">If you have any questions, please contact us at <a href="mailto:support@redjfluer.com" style="color: #667eea; text-decoration: none;">support@redjfluer.com</a></p>
              <p style="color: #999; font-size: 12px; margin: 10px 0 0;">© 2026 RedJFluer. All rights reserved.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(customerMailOptions);
      console.log('Order confirmation email sent to customer:', customerEmail);
    } catch (emailError) {
      console.error('Error sending customer email:', emailError);
      // Don't fail the order if email fails
    }

    // Send order notification email to owner
    try {
      const ownerMailOptions = {
        from: process.env.EMAIL_FROM || 'RedJFluer <noreply@redjfluer.com>',
        to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
        subject: `New Order Received - ${order._id}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">RedJFluer</h1>
            
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #d32f2f; font-size: 24px; margin: 0 0 10px; font-weight: 600;">New Order Received</h2>
              <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">You have received a new order. Please review the details below.</p>

              <!-- Order Details -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #d32f2f;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Order Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px; width: 140px;">Order ID:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${order._id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Customer:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${customerEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${customerPhone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery Date:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${deliveryDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px; vertical-align: top;">Delivery Address:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 500;">${deliveryAddress}, ${city}, ${state} ${zipCode}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Status:</td>
                    <td style="padding: 8px 0; color: #d32f2f; font-size: 14px; font-weight: 600;">Pending</td>
                  </tr>
                </table>
              </div>

              <!-- Items Ordered -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  ${items.map(item => `
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                      <td style="padding: 12px 0; color: #333; font-size: 14px; font-weight: 500;">${item.name} (${item.size})</td>
                      <td style="padding: 12px 0; color: #666; font-size: 14px; text-align: right;">x${item.quantity}</td>
                      <td style="padding: 12px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>

              <!-- Order Summary -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin: 0 0 15px; font-size: 18px; font-weight: 600;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Subtotal:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery Fee:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${deliveryFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;">Taxes:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">$${((total - subtotal - deliveryFee).toFixed(2))}</td>
                  </tr>
                  <tr style="border-top: 2px solid #d32f2f;">
                    <td style="padding: 12px 0; color: #333; font-size: 16px; font-weight: 600;">Total:</td>
                    <td style="padding: 12px 0; color: #d32f2f; font-size: 20px; font-weight: 700; text-align: right;">$${total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              ${additionalMessage ? `
              <div style="background: #fff9e6; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
                <h3 style="color: #333; margin: 0 0 10px; font-size: 16px; font-weight: 600;">Additional Message</h3>
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">${additionalMessage}</p>
              </div>
              ` : ''}
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 13px; margin: 0;">Please log in to your admin dashboard to process this order.</p>
              <p style="color: #999; font-size: 12px; margin: 10px 0 0;">© 2026 RedJFluer. All rights reserved.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(ownerMailOptions);
      console.log('Order notification email sent to owner:', process.env.OWNER_EMAIL || process.env.EMAIL_USER);
    } catch (ownerEmailError) {
      console.error('Error sending owner email:', ownerEmailError);
      // Don't fail the order if email fails
    }

    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// ==================== MESSAGES API ====================

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create a new message
app.post('/api/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Mark message as read
app.patch('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// ==================== ORDERS API ====================

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// ==================== ACCOUNTS API ====================

// Get all accounts
app.get('/api/accounts', async (req, res) => {
  try {
    const accounts = await Account.find().populate('orders');
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Get account by ID
app.get('/api/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate('orders');
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
});

// Create a new account
app.post('/api/accounts', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Update account
app.patch('/api/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(account);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Delete account
app.delete('/api/accounts/:id', async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
