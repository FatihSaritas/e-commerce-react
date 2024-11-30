import { Button, Popconfirm, Space, Table, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button, Popconfirm, Space, Table ve message.

import { useCallback, useEffect, useState } from 'react';
// React hooks olan useCallback, useEffect ve useState fonksiyonlarını içeri aktarır.

import { useNavigate } from 'react-router-dom';
// React Router'dan useNavigate fonksiyonunu içeri aktarır. Sayfalar arası gezinmeyi sağlar.

const CouponPage = () => {
  // `CouponPage` fonksiyonel bileşeni başlatılır.

  const [dataSource, setDataSource] = useState([]);
  // `dataSource` adında bir state değişkeni oluşturulur, bu kuponların verilerini tutar. Başlangıçta boş bir dizi ile başlatılır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, veriler yüklenirken yükleme simgesini göstermek için kullanılır.

  const navigate = useNavigate();
  // `useNavigate` hook'u, sayfalar arası yönlendirmeyi sağlar. Bu değişken ile yönlendirme yapılabilir.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API'nin base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const columns = [
    // Tabloyu render etmek için gerekli olan sütunların tanımı yapılır.
    {
      title: 'Kupon Kodu', // Sütun başlığı
      dataIndex: 'code', // Bu sütun hangi veri ile doldurulacak? 'code' alanı.
      key: 'code', // Sütunun benzersiz anahtar değeri
      render: (code) => <b>{code}</b>, // 'code' verisi, kalın yazı (bold) olarak render edilir.
    },
    {
      title: 'İndirim Oranı', // Sütun başlığı
      dataIndex: 'discountPercent', // Bu sütun hangi veri ile doldurulacak? 'discountPercent' alanı.
      key: 'discountPercent', // Sütunun benzersiz anahtar değeri
      render: (code) => <span>%{code}</span>, // 'discountPercent' verisi, yüzde simgesi ile birlikte render edilir.
    },
    {
      title: 'Actions', // Sütun başlığı
      dataIndex: 'actions', // Bu sütun hangi veri ile doldurulacak? 'actions' alanı.
      key: 'actions', // Sütunun benzersiz anahtar değeri
      render: (_, record) => (
        // Actions sütununda her satır için bir "Güncelle" ve "Sil" butonu render edilir.
        <Space>
          {/* `Space`, butonları hizalamak için kullanılan Ant Design bileşeni. */}
          <Button
            type="primary" // Butonun tipi "primary", yani ana buton tarzında.
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
            // Butona tıklandığında, kullanıcıyı ilgili kuponu güncelleme sayfasına yönlendirir.
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kuponu Sil" // Popconfirm bileşeninin başlığı.
            description="Kuponu silmek istediğinizden emin misiniz?" // Popconfirm açıklaması.
            okText="Yes" // Onay butonunun metni.
            cancelText="No" // İptal butonunun metni.
            onConfirm={() => deleteCoupon(record._id)}
            // "Sil" butonuna tıklanırsa, `deleteCoupon` fonksiyonu çalışır ve kupon silinir.
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    // `fetchCategories` fonksiyonu, kuponları API'den almak için tanımlanmış bir asenkron fonksiyondur.
    setLoading(true);
    // Veriler yükleniyor, o yüzden yükleme durumu başlatılır.

    try {
      // Verileri almak için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/coupons`);
      // Kupon verilerini almak için API'ye GET isteği yapılır.
      if (response.ok) {
        // Eğer cevap başarılıysa (200 OK), verileri JSON formatında alırız.
        const data = await response.json();
        setDataSource(data); // Alınan veriler, `dataSource` state'ine atanır.
      } else {
        message.error('Veri getirme başarısız.'); // API isteği başarısız olursa hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Veri hatası:', error); // Hata durumunda konsola hata mesajı yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  }, [apiUrl]);
  // `useCallback`, fonksiyonun sadece `apiUrl` değiştiğinde yeniden oluşturulmasını sağlar.

  const deleteCoupon = async (couponId) => {
    // `deleteCoupon` fonksiyonu, belirli bir kuponu silmek için tanımlanmıştır.
    try {
      // Silme işlemi için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: 'DELETE', // HTTP DELETE metodu ile silme isteği yapılır.
      });
      if (response.ok) {
        // Eğer silme işlemi başarılıysa:
        message.success('Kupon başarıyla silindi.'); // Başarılı silme mesajı gösterilir.
        fetchCategories(); // Kuponları tekrar yükler (silme sonrası güncellenmiş listeyi alır).
      } else {
        message.error('Silme işlemi başarısız.'); // Hata durumunda silme başarısız mesajı gösterilir.
      }
    } catch (error) {
      console.log('Silme hatası:', error); // Silme işlemi sırasında oluşan hata konsola yazdırılır.
    }
  };

  useEffect(() => {
    // `useEffect` hook'u, bileşen her render edildiğinde çalışır ve kuponları alır.
    fetchCategories(); // `fetchCategories` fonksiyonu çağrılır.
  }, [fetchCategories]);
  // `fetchCategories` fonksiyonu bağımlılık olarak verilmiştir, yani bu fonksiyon değişirse `useEffect` çalışır.

  return (
    <Table
      dataSource={dataSource} // Tabloya, kupon verileri `dataSource` ile aktarılır.
      columns={columns} // Tabloya sütunlar `columns` ile aktarılır.
      rowKey={(record) => record._id} // Her satır için benzersiz bir anahtar `record._id` ile sağlanır.
      loading={loading} // Yükleme durumu, `loading` state'ine göre belirlenir.
    />
  );
  // Tablo render edilir ve `dataSource` verisiyle doldurulur.
};

export default CouponPage;
// `CouponPage` bileşeni dışa aktarılır.
