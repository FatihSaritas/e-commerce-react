import { useEffect } from 'react';
// `useEffect`, React'teki yan etkileri (side effects) yönetmek için kullanılan bir hook'tur.
// Burada sayfa değişiklikleri sonrası pencerenin üst kısmına kaydırma işlemi gerçekleştireceğiz.

import { useLocation } from 'react-router-dom';
// `useLocation`, React Router'ın sağladığı bir hook'tur. Bu hook, geçerli URL hakkında bilgi sağlar.
// Özellikle sayfa yolunun değişip değişmediğini tespit etmek için kullanılır.

const ScrollToTop = () => {
  const location = useLocation();
  // `useLocation` hook'u ile geçerli konum bilgisi (pathname) alınır.
  // Sayfa her değiştiğinde bu bilgi değişecektir. Böylece hangi sayfada olduğumuzu öğrenebiliriz.

  useEffect(() => {
    window.scrollTo({
      top: 0, // Sayfanın üst kısmına kaydırma işlemi yapacağız.
      behavior: 'auto', // Kaydırma işleminin türünü belirliyoruz. 'auto', ani kaydırma yapar.
    });
  }, [location.pathname]);
  // `useEffect` sadece `location.pathname` değiştiğinde çalışır.
  // Bu, kullanıcı farklı bir sayfaya gittiğinde sayfanın üst kısmına kaydırma yapar.
};

export default ScrollToTop;
// Bileşen dışa aktarılır. Böylece başka dosyalarda kullanılabilir.
