const express = require('express'); // Express framework'ünü projeye dahil ediyoruz, HTTP isteklerini yönetmek için kullanacağız.
const mongoose = require('mongoose'); // MongoDB ile etkileşim kurmak için Mongoose kütüphanesini dahil ediyoruz.
const dotenv = require('dotenv'); // Ortam değişkenlerini gizli tutmak için .env dosyasını okumaya yarayan dotenv kütüphanesini dahil ediyoruz.
const app = express(); // Express uygulamasını oluşturuyoruz, tüm metodları 'app' üzerinden kullanacağız.
const cors = require('cors');
const mainRoute = require('./routes/index.js'); // Route işlemleri için oluşturduğumuz index.js dosyasını projemize dahil ediyoruz.
const logger = require('morgan'); // HTTP istek loglarını görmek için Morgan kütüphanesini dahil ediyoruz.
const port = 4000; // Sunucunun çalışacağı port numarasını belirtiyoruz.

dotenv.config(); // .env dosyasındaki ortam değişkenlerini kullanabilmek için dotenv config metodunu çalıştırıyoruz.

const connect = async () => {
  // MongoDB bağlantısı kurmak için bir async fonksiyon oluşturuyoruz.
  try {
    await mongoose.connect(process.env.MONGO_URI); // process.env ile .env dosyasındaki MONGO_URI erişim bilgisine ulaşıyoruz ve MongoDB'ye bağlanıyoruz.
    console.log('Connected to MongoDB'); // Bağlantı başarılı olursa bu mesajı konsola yazdırıyoruz.
  } catch (error) {
    throw error; // Hata durumunda hatayı fırlatıyoruz, böylece bağlantı problemi varsa görebiliyoruz.
  }
};

// Middleware'ler
app.use(logger('dev')); // Morgan logger'ı 'dev' modu ile kullanıyoruz, HTTP istek loglarını konsolda görebiliriz.
app.use(express.json()); // express.json() middleware'i ile JSON formatındaki gelen veriyi otomatik olarak parse ediyoruz.
app.use(cors());

app.use('/api', mainRoute); // '/api' yolu ile gelen isteklerde mainRoute'daki tanımlı rotalar çalıştırılacak.

app.listen(port, () => {
  // Sunucuyu belirttiğimiz port numarası ile başlatıyoruz.
  connect(); // Sunucu başlatılırken MongoDB bağlantısını sağlıyoruz.
  console.log(`Sunucu ${port} portunda çalışıyor.`); // Başarılı şekilde başlatıldığında port numarasını konsola yazdırıyoruz.
});
