import { Spin, Table, message } from 'antd';
// Ant Design'den gerekli bileşenler içe aktarılıyor:
// `Spin` yükleme göstergesi için, `Table` tablo oluşturmak için,
// `message` ise bildirim ve uyarı mesajları için kullanılır.

import { useEffect, useState } from 'react';
// React'ten gerekli hook'lar: `useState` durum yönetimi için,
// `useEffect` yan etkileri (API çağrıları gibi) yönetmek için kullanılır.

const OrderPage = () => {
  // Sipariş sayfası bileşeni tanımlanıyor.
  const [dataSource, setDataSource] = useState([]);
  // Tabloya veri sağlamak için bir state. Başlangıçta boş bir dizi.
  const [loading, setLoading] = useState(false);
  // Yükleme durumunu kontrol eden bir state. Başlangıçta `false`.

  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;
  // Stripe API için gerekli gizli anahtar çevre değişkenlerinden alınır.

  const columns = [
    // Tablo için sütun tanımları.
    {
      title: 'Müşteri Email', // Sütun başlığı.
      dataIndex: 'receipt_email', // Verideki `receipt_email` alanı bu sütuna karşılık gelir.
    },
    {
      title: 'Sipariş Fiyatı', // Sipariş fiyatını gösteren sütun başlığı.
      dataIndex: 'amount', // Verideki `amount` alanı bu sütuna karşılık gelir.
      render: (record) => <b>${(record / 100).toFixed(2)}</b>,
      // Fiyatı dolara çevirmek ve iki ondalık basamak göstermek için işlenir.
    },
  ];

  useEffect(() => {
    // Bileşen yüklendiğinde veya bağımlılıklar değiştiğinde çalışır.
    const fetchData = async () => {
      // Stripe API'den ödeme verilerini almak için bir asenkron fonksiyon.
      setLoading(true); // Yükleme durumunu aktif eder.

      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_intents`,
          {
            method: 'GET', // GET isteği ile veri alınır.
            headers: {
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
              // API'ye erişmek için yetkilendirme başlığı eklenir.
            },
          },
        );

        if (response.ok) {
          // Yanıt başarılıysa:
          const { data } = await response.json();
          // JSON verisi ayrıştırılır ve `data` içine alınır.
          setDataSource(data);
          // Tablo verisi state'e kaydedilir.
        } else {
          message.error('Veri getirme başarısız.');
          // Yanıt başarısızsa hata mesajı gösterilir.
        }
      } catch (error) {
        console.log('Veri hatası:', error);
        // Hata oluşursa konsola yazdırılır.
      } finally {
        setLoading(false);
        // Yükleme durumu sona erdirilir.
      }
    };
    fetchData();
    // Veri getiren fonksiyon çağrılır.
  }, [MY_STRIPE_SECRET_KEY]);
  // `MY_STRIPE_SECRET_KEY` bağımlılık olarak kullanılır. Değişirse `useEffect` yeniden çalışır.

  console.log(dataSource);
  // Çekilen veri konsola yazdırılır (geliştirme sırasında kontrol amaçlı).

  return (
    // Bileşenin dönüş kısmı.
    <Spin spinning={loading}>
      {/* Yükleme durumunda dönen spinner göstergesi. */}
      <Table
        dataSource={dataSource}
        // Tabloda gösterilecek veri.
        columns={columns}
        // Tablo sütunları.
        rowKey={(record) => record.id}
        // Satırların benzersiz anahtarı `id` alanından alınır.
        loading={loading}
        // Tablonun yükleme durumu.
      />
    </Spin>
  );
};

export default OrderPage;
// `OrderPage` bileşeni dışa aktarılır, başka dosyalarda kullanılabilir.
