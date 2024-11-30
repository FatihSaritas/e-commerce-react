import { useEffect, useState } from 'react';
// React'ten `useEffect` ve `useState` hook'larını içe aktarır.
// `useState`, bileşen durumu oluşturur. `useEffect`, yan etkileri yönetmek için kullanılır.

import ProductDetails from '../components/ProductDetails/ProductDetails';
// Ürün detaylarını göstermek için `ProductDetails` bileşenini içe aktarır.

import { useParams } from 'react-router-dom';
// React Router'dan `useParams` hook'unu içe aktarır.
// URL'deki parametreleri (örneğin ürün ID'si) almak için kullanılır.

const ProductDetailsPage = () => {
  // Ürün detayları sayfası bileşenini tanımlar.
  const [singleProduct, setSingleProduct] = useState(null);
  // Tek bir ürünün bilgilerini tutmak için bir durum oluşturur. Başlangıç değeri `null`'dır.

  const { id: productId } = useParams();
  // URL'deki `id` parametresini alır ve `productId` değişkenine atar.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // Çevre değişkenlerinden API taban URL'sini alır.

  useEffect(() => {
    // Bileşen yüklendiğinde veya `apiUrl` ya da `productId` değiştiğinde çalışır.
    const fetchSingleProduct = async () => {
      // Tek bir ürünü getiren asenkron bir fonksiyon tanımlar.
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);
        // Belirtilen `productId` ile API'den bir GET isteği yapar.

        if (!response.ok) {
          // Yanıt başarısızsa hata fırlatır.
          throw new Error('Verileri getirme hatası');
        }

        const data = await response.json();
        // Yanıtı JSON formatına çevirir.
        setSingleProduct(data);
        // Gelen veriyi `singleProduct` durumuna kaydeder.
      } catch (error) {
        console.log('Veri hatası:', error);
        // Hata durumunda hatayı konsola yazar.
      }
    };
    fetchSingleProduct();
    // Ürünü almak için fonksiyonu çağırır.
  }, [apiUrl, productId]);
  // `useEffect` bağımlılık dizisinde `apiUrl` ve `productId` bulunur.

  return singleProduct ? (
    // Eğer `singleProduct` verisi varsa,
    <ProductDetails
      singleProduct={singleProduct}
      // Ürün bilgilerini `ProductDetails` bileşenine geçirir.
      setSingleProduct={setSingleProduct}
      // Ürün bilgisini güncellemek için `setSingleProduct` fonksiyonunu da geçirir.
    />
  ) : (
    // Eğer `singleProduct` verisi yoksa,
    <p>Ürün Yükleniyor</p>
    // Kullanıcıya yükleme mesajı gösterir.
  );
};

export default ProductDetailsPage;
// `ProductDetailsPage` bileşenini dışa aktarır, böylece başka yerlerde kullanılabilir.
