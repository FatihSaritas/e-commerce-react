const mongoose = require('mongoose'); // Mongoose kütüphanesini projeye dahil ediyoruz. Bu kütüphane, MongoDB veritabanıyla etkileşim kurmamıza olanak sağlar.

// Kullanıcılar için bir şema tanımlıyoruz
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true }, // Kullanıcı adı, zorunlu bir alan olarak metin tipinde
    email: { type: String, required: true }, // Kullanıcının e-posta adresi, zorunlu bir alan olarak metin tipinde
    password: { type: String, required: true }, // Kullanıcının şifresi, zorunlu bir alan olarak metin tipinde (şifrelenmiş olarak saklanacak)
    role: {
      type: String, // Kullanıcının rolü (yetki düzeyi) olarak metin tipinde
      default: 'user', // Varsayılan olarak "user" değeri atanır
      enum: ['user', 'admin'], // Rol sadece "user" veya "admin" olabilir
    },
    avatar: { type: String }, // Kullanıcının avatar URL'sini saklayacak, zorunlu olmayan bir alan
  },
  { timestamps: true }, // 'createdAt' ve 'updatedAt' alanlarını otomatik olarak ekler
);

// Şemaya bağlı olarak User adında bir model oluşturuyoruz
const User = mongoose.model('User', UserSchema);

module.exports = User; // User modelini dışa aktararak diğer dosyalarda kullanılabilir hale getiriyoruz
