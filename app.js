const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const adminRoutes = require('./routes/admin');  // Import route admin.js

dotenv.config();
const app = express();
app.use(express.static('public'));  // Đảm bảo 'public' là thư mục chứa các tệp tĩnh (HTML, CSS, JS)


// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Đảm bảo thư mục views tồn tại

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error: ', err));

// Routes
app.use('/', adminRoutes);
  // Sử dụng /admin cho các route admin

 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
