const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Lưu URL ảnh
    link: { type: String, required: true } ,
    createdAt: { type: Date, default: Date.now },  // Thêm thời gian tạo tour
    updatedAt: { type: Date, default: Date.now }   // Lưu link trang chi tiết
});
tourSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Tour', tourSchema);