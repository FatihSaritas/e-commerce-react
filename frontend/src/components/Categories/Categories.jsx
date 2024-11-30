import CategoryItem from './CategoryItem'; // `CategoryItem` bileşenini import ederek her bir kategoriyi ayrı bir bileşenle temsil etmek için kullanıyoruz.
import { useEffect, useState } from 'react'; // React'ın `useEffect` ve `useState` hook'larını import ederek bileşen durumunu ve yan etkilerini yönetiyoruz.
import './Categories.css'; // Kategoriler için CSS stillerini içe aktarıyoruz.
import { message } from 'antd'; // Ant Design'dan `message` bileşenini import ederek bildirim mesajları göstereceğiz.

const Categories = () => {
  // Categories adlı bir React bileşeni oluşturuyoruz.
  const [categories, setCategories] = useState([]); // `categories` adında bir durum tanımlıyoruz, başlangıç değeri boş bir dizi. Bu dizi API'den çekilen kategorileri tutacak.
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Çevresel değişkenden API taban URL'sini alıyoruz, esneklik sağlamak için.

  useEffect(() => {
    // Bileşen yüklendiğinde bir kez çalışacak bir yan etki tanımlıyoruz.
    const fetchCategories = async () => {
      // Asenkron bir fonksiyon tanımlıyoruz, API'den kategori verilerini çekecek.
      try {
        const response = await fetch(`${apiUrl}/api/categories`); // `fetch` ile belirtilen API endpoint'ine bir GET isteği yapıyoruz.

        if (response.ok) {
          // API yanıtı başarılıysa:
          const data = await response.json(); // Yanıtı JSON formatında parse ediyoruz.
          setCategories(data); // Gelen verileri `categories` durumuna atıyoruz.
        } else {
          message.error('Veri getirme başarısız.'); // API yanıtı başarısızsa hata mesajı gösteriyoruz.
        }
      } catch (error) {
        // Herhangi bir hata olursa:
        console.log('Veri hatası:', error); // Konsola hata mesajını yazdırıyoruz.
      }
    };
    fetchCategories(); // Asenkron veri çekme fonksiyonunu çağırıyoruz.
  }, [apiUrl]); // `apiUrl` değişirse `useEffect` tekrar çalışır.

  return (
    <section className="categories">
      {/* Kategorileri kapsayan ana HTML section etiketi */}
      <div className="container">
        {/* İçerikleri düzenlemek için bir kapsayıcı */}
        <div className="section-title">
          {/* Başlık ve açıklama metnini içeren alan */}
          <h2>All Categories</h2> {/* Bölümün ana başlığı */}
          <p>Summer Collection New Morden Design</p>{' '}
          {/* Alt başlık veya açıklama metni */}
        </div>
        <ul className="category-list">
          {/* Kategori öğelerini listelemek için bir unordered list */}
          {categories.map(
            (
              category, // `categories` durumunu döngüyle gezerek her bir kategori için:
            ) => (
              <CategoryItem key={category._id} category={category} /> // `CategoryItem` bileşeni oluşturuyoruz, her biri unique `_id` ile ayırt ediliyor.
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default Categories; // Bileşeni diğer dosyalarda kullanılabilir hale getiriyoruz.
