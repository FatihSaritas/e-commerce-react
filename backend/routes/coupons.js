const express = require('express'); // Express framework'ünü kullanmak için import ediyoruz.
const router = express.Router(); // Yeni bir router nesnesi oluşturuyoruz, bu router ile ilgili endpoint'leri tanımlayacağız.
const Coupon = require('../models/Coupon.js');

// Kupon oluşturma (create)
router.post('/', async (req, res) => {
  try {
    const { code } = req.body;

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ error: 'This coupon is alread exists.' });
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Tüm Kuponları getirme (Read All)
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Belirli bir kuponu getirme (Read - Single BY CopunId)
router.get('/:couponId', async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon Not Found.' });
    }

    res.status(200).json(coupon);

    console.log(error);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Belirli bir kuponu koduna göre getirme (Read - Single  BY CouponCode)
router.get('/code/:couponCode', async (req, res) => {
  try {
    const couponCode = req.params.couponCode;

    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon Not Found.' });
    }

    res.status(200).json(coupon);

    console.log(error);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Kupon kodu id göre güncelleme işlemi (Update)
router.put('/:couponId', async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);

    if (!existingCoupon) {
      return res.status(404).json({ error: 'Coupon not found.' });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      couponId,
      updates,
      { new: true }, // new: true ile güncellenmiş hali döndürüyoruz.
    );

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Kupon Kodu silme işlemi (Delete)
router.delete('/:couponId', async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deletedCoupon = await Coupon.findByIdAndRemove(couponId);
    if (!deletedCoupon) {
      return res.status(404).json({ error: 'category Not Found.' });
    }
    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
