const express = require('express'); // Express framework'ünü kullanmak için import ediyoruz.
const router = express.Router(); // Yeni bir router nesnesi oluşturuyoruz, bu router ile ilgili endpoint'leri tanımlayacağız.
const User = require('../models/User.js'); // MongoDB'deki 'User' modelini alıyoruz, bu model ile veritabanında user işlemleri yapacağız.
const bcrypt = require('bcryptjs'); // Şifrelerin güvenli şekilde saklanması için bcryptjs kütüphanesini import ediyoruz.

const generatorRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71); // 0 ile 70 arasında rastgele bir sayı üretiyoruz.
  return `https://i.pravatar.cc/150?img=${randomAvatar}`; // Üretilen rastgele sayı ile pravatar.cc üzerinden rastgele bir avatar URL'si oluşturuyoruz.
};

// Kullanıcı Oluşturma (Create-Register)

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Kullanıcıdan gelen istekten username, email ve password bilgilerini alıyoruz.
    const defaultAvatar = generatorRandomAvatar(); // Yeni bir kullanıcıya rastgele bir varsayılan avatar URL'si atıyoruz.

    const existingUser = await User.findOne({ email }); // Veritabanında aynı email ile kayıtlı bir kullanıcı olup olmadığını kontrol ediyoruz.
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'Email adress is already registed' }); // Aynı email ile kayıtlı bir kullanıcı varsa hata döndürüyoruz.
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Parolayı güvenli hale getirmek için bcrypt ile hash'liyoruz.
    const newUser = await new User({
      username,
      email,
      password: hashedPassword, // Hashlenmiş parolayı kullanıyoruz.
      avatar: defaultAvatar, // Rastgele oluşturulan avatar URL'sini kullanıyoruz.
    });
    await newUser.save(); // Yeni kullanıcıyı veritabanına kaydediyoruz.
    res.status(201).json(newUser); // Kayıt başarılı olursa, yeni kullanıcı bilgilerini döndürüyoruz.
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası durumunda 500 (Server Error) kodu döndürüyoruz.
  }
});

// Kullanıcı Girişi (Login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Giriş isteğinden email ve password bilgilerini alıyoruz.

    const user = await User.findOne({ email }); // Veritabanında email'e göre kullanıcıyı arıyoruz.
    if (!user) {
      return res.status(401).json({ error: 'Invalid email ' }); // Kullanıcı bulunamazsa hata döndürüyoruz.
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Girilen parola ile veritabanındaki hash'li parolayı karşılaştırıyoruz.

    if (!isPasswordValid) {
      return res.status(401).json('Invalid password '); // Parola yanlışsa hata döndürüyoruz.
    }

    res.status(200).json({
      id: user.id, // Kullanıcının id bilgisini döndürüyoruz.
      email: user.email, // Kullanıcının email bilgisini döndürüyoruz.
      username: user.username, // Kullanıcının kullanıcı adı bilgisini döndürüyoruz.
      role: user.role, // Kullanıcının rolünü döndürüyoruz (yetki seviyesini belirtmek için).
      avatar: user.avatar, // Kullanıcının avatar URL'sini döndürüyoruz.
    });
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası durumunda 500 (Server Error) kodu döndürüyoruz.
  }
});

module.exports = router; // Bu dosyayı diğer dosyalarda kullanabilmek için router'ı dışa aktarıyoruz.
