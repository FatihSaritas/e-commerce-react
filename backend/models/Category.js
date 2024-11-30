const mongoose = require('mongoose'); // Mongoose kütüphanesini projeye dahil ediyoruz. Bu kütüphane, MongoDB veritabanıyla etkileşim kurmamıza olanak sağlar.

// Yeni bir şema (schema) tanımlıyoruz, bu şema her "Category" (Kategori) dokümanının sahip olması gereken alanları belirler.
const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // 'name' alanı, kategorinin adını saklar. 'String' türünde olacak ve zorunludur (required: true).
    img: { type: String, required: true }, // 'img' alanı, kategoriye ait bir görselin URL'sini saklar. 'String' türünde olacak ve zorunludur.
  },
  { timestamps: true }, // 'timestamps' özelliği, otomatik olarak 'createdAt' ve 'updatedAt' alanlarını ekler, böylece her dokümanın ne zaman oluşturulduğu ve güncellendiği kaydedilir.
);

// Mongoose modelini oluşturuyoruz. Bu model, 'Category' adını alır ve yukarıdaki 'CategorySchema' şemasını kullanır.
const Category = mongoose.model('Category', CategorySchema);

// Bu modeli dışa aktarıyoruz, böylece diğer dosyalar bu modeli kullanarak MongoDB üzerinde "Category" dokümanları oluşturabilir, güncelleyebilir veya sorgulayabilir.
module.exports = Category;
