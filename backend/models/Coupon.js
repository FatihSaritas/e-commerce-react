const mongoose = require('mongoose'); // Mongoose kütüphanesini projeye dahil ediyoruz. Bu kütüphane, MongoDB veritabanıyla etkileşim kurmamıza olanak sağlar.

const CouponSchema = mongoose.Schema(
  {
    code: { type: String, required: true }, // Kupon Kodu
    discountPercent: { type: Number, required: true }, //İndirim Oranı
  },
  { timestamps: true },
);

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;
