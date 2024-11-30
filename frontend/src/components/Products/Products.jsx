import { useEffect, useState } from 'react';
// React'ten `useEffect` ve `useState` hook'larını import eder. Bunlar sırasıyla yan etkileri yönetmek ve bileşen durumu tutmak için kullanılır.

import ProductItem from './ProductItem';
// `ProductItem` adlı bileşeni başka bir dosyadan içe aktarır. Bu, her bir ürünün nasıl görüneceğini belirlemek için kullanılır.

import Slider from 'react-slick';
// `react-slick` kütüphanesinden bir slider bileşeni içe aktarır. Ürünlerin kaydırılabilir şekilde gösterilmesini sağlar.

import PropTypes from 'prop-types';
// Prop türlerini doğrulamak için `prop-types` kütüphanesini içe aktarır.

import './Products.css';
// Bu bileşen için özel CSS dosyasını içe aktarır.

import { message } from 'antd';
// Ant Design kütüphanesinden bir bildirim aracı içe aktarır. Hata mesajları veya başarı bildirimleri için kullanılır.

function NextBtn({ onClick }) {
  // Slider'ın sağa geçiş düğmesi için özel bir bileşen tanımlar.
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      {/* Butonun sağa kaydırma işlevini tetiklemesi için bir `onClick` olayı ekler */}
      <i className="bi bi-chevron-right"></i>
      {/* Bootstrap simge kütüphanesinden bir sağ ok ikonu kullanır */}
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
  // `onClick` özelliğinin bir fonksiyon olacağını belirtir.
};

function PrevBtn({ onClick }) {
  // Slider'ın sola geçiş düğmesi için özel bir bileşen tanımlar.
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      {/* Butonun sola kaydırma işlevini tetiklemesi için bir `onClick` olayı ekler */}
      <i className="bi bi-chevron-left"></i>
      {/* Bootstrap simge kütüphanesinden bir sol ok ikonu kullanır */}
    </button>
  );
}

PrevBtn.propTypes = {
  onClick: PropTypes.func,
  // `onClick` özelliğinin bir fonksiyon olacağını belirtir.
};

const Products = () => {
  // `Products` adlı bir bileşen tanımlar.
  const [products, setProducts] = useState([]);
  // Ürün listesini tutmak için bir durum (state) oluşturur. Başlangıçta boş bir dizi olarak ayarlanır.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API taban URL'sini çevre değişkenlerinden alır.

  useEffect(() => {
    // Bileşen ilk yüklendiğinde çalışacak bir yan etki tanımlar.
    const fetchProducts = async () => {
      // Ürünleri API'den getirmek için bir asenkron fonksiyon tanımlar.
      try {
        const response = await fetch(`${apiUrl}/api/products`);
        // API'ye bir GET isteği gönderir.

        if (response.ok) {
          const data = await response.json();
          // API yanıtını JSON olarak ayrıştırır.
          setProducts(data);
          // Gelen veriyi `products` durumuna kaydeder.
        } else {
          message.error('Veri getirme başarısız.');
          // Eğer yanıt başarılı değilse hata mesajı gösterir.
        }
      } catch (error) {
        console.log('Veri hatası:', error);
        // Ağ hataları gibi durumlarda hatayı konsola yazar.
      }
    };
    fetchProducts();
    // Ürünleri almak için `fetchProducts` fonksiyonunu çağırır.
  }, [apiUrl]);
  // `apiUrl` değiştiğinde yan etkiyi yeniden çalıştırır.

  const sliderSettings = {
    // Slider için ayarlar nesnesi tanımlar.
    dots: false,
    // Alt noktaları (dots) gizler.
    infinite: true,
    // Kaydırmayı sonsuz döngüde yapar.
    slidesToShow: 4,
    // Aynı anda 4 slayt gösterir.
    slidesToScroll: 1,
    // Her kaydırmada bir slayt ilerler.
    nextArrow: <NextBtn />,
    // Sağ ok düğmesi için özel bir bileşen kullanır.
    prevArrow: <PrevBtn />,
    // Sol ok düğmesi için özel bir bileşen kullanır.
    autoplaySpeed: 3000,
    // Otomatik kaydırma hızını 3 saniye olarak ayarlar.
    autoplay: true,
    // Otomatik kaydırmayı etkinleştirir.
    responsive: [
      {
        breakpoint: 992,
        // Tarayıcı genişliği 992 pikselin altına indiğinde,
        settings: {
          slidesToShow: 2,
          // Aynı anda 2 slayt gösterir.
        },
      },
      {
        breakpoint: 520,
        // Tarayıcı genişliği 520 pikselin altına indiğinde,
        settings: {
          slidesToShow: 1,
          // Aynı anda 1 slayt gösterir.
        },
      },
    ],
  };

  return (
    <section className="products">
      {/* Ürünlerin yer alacağı ana bölümü oluşturur. */}
      <div className="container">
        {/* İçeriği düzenlemek için bir konteyner kullanır. */}
        <div className="section-title">
          {/* Başlık alanını tanımlar. */}
          <h2>Featured Products</h2>
          {/* Ürün başlığını ekler. */}
          <p>Summer Collection New Morden Design</p>
          {/* Tanıtıcı bir metin ekler. */}
        </div>
        <div className="product-wrapper product-carousel">
          {/* Ürünlerin gösterileceği kaydırmalı alanı tanımlar. */}
          <Slider {...sliderSettings}>
            {/* Slider bileşenini `sliderSettings` ile yapılandırır. */}
            {products.map((product) => (
              // Ürünler listesini dolaşır.
              <ProductItem productItem={product} key={product._id} />
              // Her bir ürün için `ProductItem` bileşenini oluşturur ve ürün verilerini geçirir.
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;
// `Products` bileşenini dışa aktarır, böylece başka yerlerde kullanılabilir.
