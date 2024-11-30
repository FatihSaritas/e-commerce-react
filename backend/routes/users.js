const express = require('express'); // Express framework'ü ile HTTP sunucusu oluşturmak ve yönetmek için gerekli modül.
const router = express.Router(); // Yeni bir router nesnesi oluşturuluyor. Bu, modüler ve bağımsız rotalar tanımlamak için kullanılır.
const User = require('../models/User.js'); // Kullanıcı verileriyle çalışmak için tanımlanan Mongoose modelini içe aktarıyoruz.

// Tüm Kullanıcıları Getirme (Read All)
router.get('/', async (req, res) => {
  // `GET /` endpoint'i: Tüm kullanıcıları getirir.
  try {
    const users = await User.find();
    // MongoDB'deki `User` modelinden tüm kullanıcıları getirir. `find()` metodu tüm belgeleri döner.
    res.status(200).json(users);
    // Kullanıcılar başarılı bir şekilde getirildiyse, HTTP durum kodu 200 (OK) ile JSON formatında döndürülür.
  } catch (error) {
    console.log(error);
    // Hata durumunda detaylar konsola yazdırılır.
    res.status(500).json({ error: 'Server error.' });
    // Sunucuyla ilgili bir hata oluştuysa, HTTP durum kodu 500 (Server Error) ve hata mesajı döndürülür.
  }
});

// Kullanıcı Silme İşlemi
router.delete('/:email', async (req, res) => {
  // `DELETE /:email` endpoint'i: Belirtilen email'e sahip kullanıcıyı siler.
  try {
    const email = req.params.email;
    // URL parametresinden kullanıcı email'ini alır. Örneğin, `/users/user@example.com` gibi bir istekte `email = user@example.com` olur.
    const deletedUser = await User.findOneAndDelete({ email });
    // MongoDB'de email ile eşleşen kullanıcıyı bulur ve siler. `findOneAndDelete` metodu silinen kullanıcıyı döndürür.
    if (!deletedUser) {
      // Eğer eşleşen bir kullanıcı bulunmazsa, `null` döner ve bu durumda bir hata yanıtı gönderilir.
      return res.status(404).json({ error: 'User Not Found.' });
      // 404 (Not Found) durumu ve açıklayıcı bir mesaj gönderilir.
    }
    res.status(200).json(deletedUser);
    // Kullanıcı başarıyla silinirse, HTTP durum kodu 200 (OK) ile silinen kullanıcı bilgileri döndürülür.
  } catch (error) {
    console.log(error);
    // Hata oluşursa detaylar konsola yazdırılır.
    res.status(500).json({ error: 'Server error.' });
    // Sunucuyla ilgili bir hata oluşursa, HTTP durum kodu 500 (Server Error) ve hata mesajı döndürülür.
  }
});

module.exports = router;
// Bu router, diğer dosyalarda kullanılabilmesi için dışa aktarılır.
// Örneğin, `app.js` dosyasında `app.use('/users', usersRouter);` şeklinde kullanılabilir.
