const express = require('express');
const multer = require('multer');
const Tour = require('../models/Tour');
const router = express.Router();

// Cấu hình multer để upload ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Route: Trang thêm tour
router.get('/add-tour', (req, res) => {
    res.render('add-tour');  // Render view add-tour.ejs
});

// Route: Xử lý thêm tour
router.post('/add-tour', upload.single('image'), async (req, res) => {
    const { title, description, price, link } = req.body;
    const image = `/uploads/${req.file.filename}`;
    try {
        await Tour.create({ title, description, price, image, link });
        res.redirect('/admin/tours');  // Redirect đến trang danh sách tours
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Route: Hiển thị tất cả các tours
router.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.render('tours', { tours });  // Render view tours.ejs với dữ liệu tours
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route: Xóa tour
router.post('/delete-tour/:id', async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.redirect('/admin/tours');  // Redirect đến trang danh sách tours
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route: Cập nhật tour
router.get('/edit-tour/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.render('edit-tour', { tour });  // Render view edit-tour.ejs với dữ liệu tour
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route: Xử lý cập nhật tour
router.post('/edit-tour/:id', upload.single('image'), async (req, res) => {
    const { title, description, price, link } = req.body;
    const updates = { title, description, price, link };

    if (req.file) {
        updates.image = `/uploads/${req.file.filename}`;  // Cập nhật ảnh nếu có
    }

    try {
        await Tour.findByIdAndUpdate(req.params.id, updates);
        res.redirect('/admin/tours');  // Redirect đến trang danh sách tours
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
