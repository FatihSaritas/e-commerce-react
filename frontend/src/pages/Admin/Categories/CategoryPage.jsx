import { Button, Popconfirm, Space, Table, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button (buton), Popconfirm (onay kutusu), Space (boşluk), Table (tablo), message (mesaj göstergesi).

import { useCallback, useEffect, useState } from 'react';
// React'ten useCallback, useEffect ve useState hook'ları içeri aktarılır.
// useState, bileşenin durumunu yönetmek için; useEffect, bileşenin yaşam döngüsünde yan etkiler için; useCallback, fonksiyonların yeniden oluşturulmasını engellemek için kullanılır.

import { useNavigate } from 'react-router-dom';
// React Router'dan useNavigate hook'u içeri aktarılır. Sayfa yönlendirmesi yapmak için kullanılır.

const CategoryPage = () => {
  // `CategoryPage` fonksiyonel bileşeninin başlangıcı.

  const [dataSource, setDataSource] = useState([]);
  // `dataSource` state'i, kategorilerin verilerini saklamak için kullanılır. Başlangıçta boş bir dizi atanır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, veri yükleniyor durumunu kontrol etmek için kullanılır. Başlangıçta false olarak ayarlanır.

  const navigate = useNavigate();
  // `navigate` fonksiyonu, sayfa yönlendirmelerini gerçekleştirmek için kullanılır.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const columns = [
    // Tabloyu oluşturmak için kullanılacak kolonlar tanımlanır. Her bir kolon, başlık, veri kaynağı ve özel render işlevleri içerir.
    {
      title: 'Kategori Görseli',
      dataIndex: 'img', // Tablo verisi için 'img' alanı kullanılır.
      key: 'img',
      render: (imgSrc) => <img src={imgSrc} alt="Image" width={100} />,
      // Görselin URL'si ile bir <img> elementi oluşturulup tabloya yerleştirilir.
    },
    {
      title: 'Name',
      dataIndex: 'name', // Tablo verisi için 'name' alanı kullanılır.
      key: 'name',
      render: (text) => <b>{text}</b>,
      // Kategori adını kalın yazı tipiyle gösterir.
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        // Bu kolon, her satırda eylemler (güncelleme ve silme) için butonları içerir.
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
            // "Güncelle" butonuna tıklandığında, ilgili kategoriye yönlendiren bir sayfaya gidilir.
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
            // Kategori silmek için bir onay kutusu gösterilir. Kullanıcı onaylarsa `deleteCategory` fonksiyonu çağrılır.
          >
            <Button type="primary" danger>
              Sil
            </Button>
            {/* Silme işlemi için bir buton */}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    // Kategorilerin verilerini çekmek için `fetchCategories` fonksiyonu tanımlanır. `useCallback` hook'u ile yalnızca gerekli olduğunda yeniden oluşturulur.
    setLoading(true);
    // Yükleme durumu başlatılır.

    try {
      // API'ye istek yapılır.
      const response = await fetch(`${apiUrl}/api/categories`);

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        const data = await response.json(); // JSON verisi alınır.
        setDataSource(data); // Alınan veriler `dataSource` state'ine set edilir.
      } else {
        message.error('Veri getirme başarısız.'); // Eğer API cevabı hatalıysa, hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Veri hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  }, [apiUrl]);
  // `useCallback` ile sadece `apiUrl` değiştiğinde fonksiyon yeniden oluşturulur.

  const deleteCategory = async (categoryId) => {
    // Kategoriyi silmek için `deleteCategory` fonksiyonu tanımlanır.
    try {
      // API'ye DELETE isteği yapılır.
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        message.success('Kategori başarıyla silindi.'); // Silme başarı mesajı gösterilir.
        fetchCategories(); // Kategoriler tekrar yüklenir.
      } else {
        message.error('Silme işlemi başarısız.'); // Silme işlemi başarısızsa, hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Silme hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    }
  };

  useEffect(() => {
    // Bileşen yüklendiğinde `fetchCategories` fonksiyonu çağrılır.
    fetchCategories();
  }, [fetchCategories]);
  // `fetchCategories` fonksiyonu yalnızca ilk renderda ve `fetchCategories` değiştiğinde çalışır.

  return (
    <Table
      dataSource={dataSource} // Tabloya veriler `dataSource` state'inden alınarak aktarılır.
      columns={columns} // Tabloya kolonlar `columns` dizisinden aktarılır.
      rowKey={(record) => record._id} // Her satır için benzersiz anahtar olarak `_id` kullanılır.
      loading={loading} // Yükleme durumu, `loading` state'ine bağlı olarak belirlenir.
    />
  );
};

export default CategoryPage;
// `CategoryPage` bileşeni dışa aktarılır.
