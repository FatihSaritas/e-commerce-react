import { Button, Result } from 'antd';
// Ant Design kütüphanesinden `Button` ve `Result` bileşenlerini içe aktarır.
// `Button` bir düğme oluşturur, `Result` ise bir sonuç ekranı gösterir.

import { useContext, useEffect } from 'react';
// React'ten `useContext` ve `useEffect` hook'larını içe aktarır.
// `useContext`, bir bağlamdan veri almak için, `useEffect` ise yan etkileri yönetmek için kullanılır.

import { Link } from 'react-router-dom';
// React Router'dan `Link` bileşenini içe aktarır.
// Bu, kullanıcıyı başka bir rotaya yönlendiren bağlantılar oluşturmak için kullanılır.

import { CartContext } from '../context/CartContext';
// Sepet durumunu yönetmek için kullanılan `CartContext` adlı bağlamı içe aktarır.

const Success = () => {
  // `Success` adlı bir bileşen tanımlar.
  const { setCartItems } = useContext(CartContext);
  // `CartContext`'ten `setCartItems` fonksiyonunu alır. Bu, sepet öğelerini güncellemek için kullanılır.

  useEffect(() => {
    setCartItems([]);
    // Bileşen yüklendiğinde sepeti boşaltır.
  }, [setCartItems]);
  // `setCartItems` bağımlılığıyla `useEffect`'i yeniden çalıştırır.

  return (
    <div className="success-page">
      {/* Başarı sayfası için ana kapsayıcı div oluşturur. */}
      <div className="container">
        {/* Sayfa içeriği için bir konteyner oluşturur. */}
        <Result
          status="success"
          // Sonuç ekranının durumunu "başarılı" olarak ayarlar.
          title="Ödeme Başarılı!"
          // Kullanıcıya ödeme işleminin başarılı olduğunu bildiren başlık.
          subTitle="Siparişiniz başarıyla tamamlandı"
          // Kullanıcıya işlemin tamamlandığını belirten bir alt başlık.
          extra={[
            // Ekstra bileşenleri tanımlar, örneğin düğmeler.
            <Link to={'/'} key="home">
              {/* Kullanıcıyı ana sayfaya yönlendiren bir bağlantı oluşturur. */}
              <Button type="primary">Ana Sayfa</Button>
              {/* Ant Design'dan bir birincil (vurgulu) düğme. */}
            </Link>,
            <a href="/admin/orders" key={'order'}>
              {/* Kullanıcıyı siparişler sayfasına yönlendiren bir bağlantı. */}
              <Button key="buy">Siparişlerim</Button>
              {/* Siparişlerim sayfasına yönlendiren bir düğme. */}
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
// `Success` bileşenini dışa aktarır, böylece başka dosyalarda kullanılabilir.
