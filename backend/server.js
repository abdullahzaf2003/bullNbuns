require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullah:9112@cluster0.luhfx1y.mongodb.net/bullnbuns?retryWrites=true&w=majority';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};

connectDB();

// Order Schema
const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    area: String, // Added area field
    address: String,
    items: Array,
    totalPrice: Number,
    status: { type: String, default: 'pending' }, // pending, accepted, rejected, delivered
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Routes

// 1. Create New Order
// 1. Create New Order
app.post('/api/orders', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({ success: false, message: 'Database disconnected. Please check server logs.' });
    }
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// 2. Get Order Status by ID
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order }); // Return full order details
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

const path = require('path');

// ... (existing code) ...

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// 3. Get All Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// 4. Update Order Status
app.put('/api/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Test Route (Commented out to let index.html load)
// app.get('/', (req, res) => {
//     res.send('Bull N Buns API is running...');
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
