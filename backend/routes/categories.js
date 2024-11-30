const express = require('express'); // Express framework'ünü kullanmak için import ediyoruz.
const router = express.Router(); // Yeni bir router nesnesi oluşturuyoruz, bu router ile ilgili endpoint'leri tanımlayacağız.
const Category = require('../models/Category.js'); // MongoDB'deki 'Category' modelini alıyoruz, bu model ile veritabanında kategori işlemleri yapacağız.

// Yeni bir kategori oluşturma (Create)
router.post('/', async (req, res) => {
  // POST isteği ile yeni bir kategori oluşturmak için endpoint tanımlıyoruz.
  try {
    const { name, img } = req.body; // İstekten kategori 'name' ve 'img' verilerini alıyoruz.

    const newCategory = new Category({ name, img }); // Yeni bir Category instance'i oluşturuyoruz.
    await newCategory.save(); // Kategoriyi veritabanına kaydediyoruz.

    res.status(201).json(newCategory); // Başarılı ise, 201 (Created) durum kodu ile yeni kategoriyi döndürüyoruz.
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Hata durumunda 500 durum koduyla bir hata mesajı döndürüyoruz.
  }
});

// Tüm kategorileri getirme (Read All)
router.get('/', async (req, res) => {
  // GET isteği ile tüm kategorileri almak için endpoint tanımlıyoruz.
  try {
    const categories = await Category.find(); // Veritabanındaki tüm kategorileri çekiyoruz.

    res.status(200).json(categories); // Başarılı ise, 200 (OK) durum kodu ile kategorileri döndürüyoruz.
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası durumunda 500 (Server Error) kodu döndürüyoruz.
  }
});

// Belirli bir kategoriyi getirme (Read - Single)
router.get('/:categoryId', async (req, res) => {
  // Belirli bir ID ile GET isteği için endpoint tanımlıyoruz.
  try {
    const categoryId = req.params.categoryId; // URL'deki 'categoryId' parametresini alıyoruz.

    try {
      const category = await Category.findById(categoryId); // Veritabanında ilgili ID'ye sahip kategoriyi arıyoruz.
      res.status(200).json(category); // Kategori bulunduysa, 200 (OK) durum kodu ile kategoriyi döndürüyoruz.
    } catch (error) {
      console.log(error); // Kategori bulunamazsa hatayı konsola yazdırıyoruz.
      res.status(404).json({ error: 'Category Not Found.' }); // Kategori yoksa 404 (Not Found) kodu döndürüyoruz.
    }
  } catch (error) {
    console.log(error); // Genel bir hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası varsa 500 (Server Error) döndürüyoruz.
  }
});

// Kategori güncelleme işlemi (Update)
router.put('/:categoryId', async (req, res) => {
  // PUT isteği ile kategoriyi güncellemek için endpoint tanımlıyoruz.
  try {
    const categoryId = req.params.categoryId; // Güncellenecek kategori ID'sini alıyoruz.
    const updates = req.body; // İstekten güncelleme verilerini alıyoruz.

    const existingCategory = await Category.findById(categoryId); // Kategorinin mevcut olup olmadığını kontrol ediyoruz.

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found.' }); // Kategori yoksa 404 (Not Found) kodu döndürüyoruz.
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      // Kategoriyi güncelleyip veritabanına kaydediyoruz.
      categoryId,
      updates,
      { new: true }, // new: true ile güncellenmiş hali döndürüyoruz.
    );

    res.status(200).json(updatedCategory); // Başarılı ise, 200 (OK) durum kodu ile güncellenmiş kategoriyi döndürüyoruz.
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası varsa 500 (Server Error) döndürüyoruz.
  }
});

// Kategori silme işlemi (Delete)
router.delete('/:categoryId', async (req, res) => {
  // DELETE isteği ile kategori silmek için endpoint tanımlıyoruz.
  try {
    const categoryId = req.params.categoryId; // Silinecek kategori ID'sini alıyoruz.
    const deletedCategory = await Category.findByIdAndRemove(categoryId); // Veritabanından kategoriyi siliyoruz.
    if (!deletedCategory) {
      return res.status(404).json({ error: 'category Not Found.' }); // Kategori yoksa 404 (Not Found) döndürüyoruz.
    }
    res.status(200).json(deletedCategory); // Başarılı ise, 200 (OK) durum kodu ile silinen kategoriyi döndürüyoruz.
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırıyoruz.
    res.status(500).json({ error: 'Server error.' }); // Sunucu hatası varsa 500 (Server Error) döndürüyoruz.
  }
});

module.exports = router; // Bu dosyayı dışa aktarıyoruz, böylece diğer dosyalar bu router'ı kullanabilir.
// (Express ile çalıştığımız için 'export default' değil 'module.exports' kullanıyoruz.)
