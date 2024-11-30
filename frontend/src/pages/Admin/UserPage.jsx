import { Button, Popconfirm, Table, message } from 'antd';
// Ant Design'den gerekli bileşenler içe aktarılıyor:
// `Button` düğmeler için, `Popconfirm` onay penceresi için,
// `Table` tablo için, `message` ise uyarı ve bildirimler için kullanılır.

import { useCallback, useEffect, useState } from 'react';
// React'ten gerekli hook'lar: `useState` durum yönetimi için,
// `useEffect` yan etkileri yönetmek için,
// `useCallback` ise fonksiyonları optimize etmek için kullanılır.

const UserPage = () => {
  // Kullanıcı listesi ve yükleme durumu için state'ler tanımlanıyor.
  const [dataSource, setDataSource] = useState([]); // Kullanıcı listesini saklayan state.
  const [loading, setLoading] = useState(false); // Yükleme durumunu kontrol eden state.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API'nin taban URL'si çevre değişkenlerinden alınır.

  const columns = [
    // Tablo için sütun tanımları.
    {
      title: 'Avatar', // Sütun başlığı.
      dataIndex: 'avatar', // Verideki `avatar` alanını kullanır.
      key: 'avatar', // Sütun için benzersiz bir anahtar.
      render: (imgSrc) => (
        // Avatar için özel bir görünüm tanımlanır.
        <img
          src={imgSrc} // Resim kaynağı.
          alt="Avatar" // Alternatif metin.
          style={{
            width: '50px', // Resim genişliği.
            height: '50px', // Resim yüksekliği.
            borderRadius: '50%', // Resim yuvarlak şekilde gösterilir.
          }}
        />
      ),
    },
    {
      title: 'Username', // Kullanıcı adı sütunu başlığı.
      dataIndex: 'username', // Verideki `username` alanını kullanır.
      key: 'username', // Benzersiz anahtar.
    },
    {
      title: 'Email', // Email sütunu başlığı.
      dataIndex: 'email', // Verideki `email` alanını kullanır.
      key: 'email', // Benzersiz anahtar.
    },
    {
      title: 'Role', // Kullanıcı rolü sütunu başlığı.
      dataIndex: 'role', // Verideki `role` alanını kullanır.
      key: 'role', // Benzersiz anahtar.
    },
    {
      title: 'Actions', // İşlemler sütunu başlığı.
      dataIndex: 'actions', // İşlemler alanı, doğrudan veri kaynağına bağlı değil.
      key: 'actions', // Benzersiz anahtar.
      render: (_, record) => (
        // Her kullanıcı için "Sil" butonu.
        <Popconfirm
          title="Kullanıcıyı Sil" // Onay penceresi başlığı.
          description="Kullanıcıyı silmek istediğinizden emin misiniz?" // Açıklama metni.
          okText="Yes" // Onay butonu metni.
          cancelText="No" // İptal butonu metni.
          onConfirm={() => deleteUser(record.email)} // Onaylandığında kullanıcıyı siler.
        >
          <Button type="primary" danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    // Kullanıcı verilerini API'den çekmek için bir asenkron fonksiyon.
    setLoading(true); // Yükleme durumunu aktif eder.

    try {
      const response = await fetch(`${apiUrl}/api/users`);
      // API'den kullanıcı verilerini çeker.

      if (response.ok) {
        const data = await response.json(); // Gelen veriyi JSON formatına çevirir.
        setDataSource(data); // Veriyi tabloya aktarır.
      } else {
        message.error('Veri getirme başarısız.'); // Hata durumunda mesaj gösterir.
      }
    } catch (error) {
      console.log('Veri hatası:', error); // Hata konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sona erdirilir.
    }
  }, [apiUrl]); // `apiUrl` değiştiğinde bu fonksiyon yeniden oluşturulur.

  const deleteUser = async (userEmail) => {
    // Belirtilen email ile kullanıcıyı silmek için bir fonksiyon.
    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: 'DELETE', // Silme işlemi için HTTP DELETE metodu kullanılır.
      });

      if (response.ok) {
        message.success('Kullanıcı başarıyla silindi.'); // Başarı mesajı.
        fetchUsers(); // Kullanıcı listesini günceller.
      } else {
        message.error('Silme işlemi başarısız.'); // Başarısızlık mesajı.
      }
    } catch (error) {
      console.log('Silme hatası:', error); // Hata konsola yazdırılır.
    }
  };

  useEffect(() => {
    // Bileşen yüklendiğinde kullanıcı verilerini çeker.
    fetchUsers(); // Kullanıcıları getiren fonksiyonu çağırır.
  }, [fetchUsers]); // `fetchUsers` bağımlılığı değiştiğinde çalışır.

  return (
    <Table
      dataSource={dataSource} // Tabloda gösterilecek veri.
      columns={columns} // Tablo sütunları.
      rowKey={(record) => record._id} // Satırların anahtarı için `_id` kullanılır.
      loading={loading} // Yükleme durumu.
    />
  );
};

export default UserPage;
// `UserPage` bileşenini dışa aktarır, böylece başka yerlerde kullanılabilir.

// useCallback ve fetchUsers:
// useCallback, fetchUsers fonksiyonunun her render sonrası yeniden oluşturulmasını engeller. Bu sayede performans artırılır.
// fetchUsers API'den kullanıcı verilerini çeker, bu verileri tablo için hazırlar ve durumu günceller.

// useEffect:
// Sayfa ilk yüklendiğinde fetchUsers çağrılır. Bu işlem, bileşen mount edildiğinde bir defa çalışır.
// fetchUsers bağımlılık dizisinde olduğu için değiştiğinde bu işlem tekrar yürütülür.
