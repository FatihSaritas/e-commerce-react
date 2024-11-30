import { Button, Popconfirm, Space, Table, message } from 'antd'; // Ant Design'dan tablo, buton, pop-up ve mesaj bileşenlerini import eder.
import { useEffect, useState } from 'react'; // React'in Hook'larını kullanmak için import eder.
import { useNavigate } from 'react-router-dom'; // Yönlendirme işlemleri için React Router'dan `useNavigate` fonksiyonunu import eder.

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]); // Ürün verilerini tutmak için bir state tanımlar.
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutmak için bir state tanımlar.
  const navigate = useNavigate(); // Yönlendirme yapmak için `useNavigate` fonksiyonunu kullanır.
  const apiUrl = import.meta.env.VITE_API_BASE_URL; // Çevre değişkenlerinden API temel URL'sini alır.

  const columns = [
    // Tablo için sütun bilgilerini tanımlar.
    {
      title: 'Product Görseli', // Sütun başlığı.
      dataIndex: 'img', // Verinin geleceği anahtar ismi.
      key: 'img', // Benzersiz anahtar.
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />, // Görseli tablo hücresinde gösterir.
    },
    {
      title: 'Name', // Ürün adı sütunu.
      dataIndex: 'name',
      key: 'name',
      render: (text) => <b>{text}</b>, // Adı kalın yazı ile gösterir.
    },
    {
      title: 'Kategori', // Kategori sütunu.
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (text) => <span>{text}</span>, // Kategori adını gösterir.
    },
    {
      title: 'Fiyat', // Fiyat sütunu.
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{text.current.toFixed(2)}</span>, // Ürün fiyatını iki ondalık basamak ile gösterir.
    },
    {
      title: 'İndirim', // İndirim sütunu.
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>%{text.discount}</span>, // İndirim oranını yüzde formatında gösterir.
    },
    {
      title: 'Actions', // Eylemler sütunu.
      dataIndex: 'actions',
      key: 'actions',
      render: (
        _,
        record, // Hücrede iki buton gösterir: Güncelle ve Sil.
      ) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)} // Güncelleme sayfasına yönlendirir.
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil" // Silme işlemi için onay mesajı gösterir.
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)} // Onaylandığında ürün silme işlemini başlatır.
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteProduct = async (productId) => {
    // Ürün silme işlemi için asenkron fonksiyon.
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        // Silme isteğini API'ye gönderir.
        method: 'DELETE',
      });
      if (response.ok) {
        // İstek başarılıysa...
        message.success('Kategori başarıyla silindi.'); // Başarı mesajı gösterir.
        setDataSource((prevProducts) => {
          // Silinen ürünü `dataSource` listesinden çıkarır.
          return prevProducts.filter((product) => product._id !== productId);
        });
      } else {
        message.error('Silme işlemi başarısız.'); // Başarısız olursa hata mesajı gösterir.
      }
    } catch (error) {
      // Hata oluşursa...
      console.log('Silme hatası:', error); // Hatanın detayını konsola yazdırır.
    }
  };

  useEffect(() => {
    // Bileşen yüklendiğinde veri çekmek için yan etki oluşturur.
    const fetchData = async () => {
      // API'den veri almak için asenkron fonksiyon.
      setLoading(true); // Yüklenme durumunu aktif eder.
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          // Kategoriler ve ürünler için paralel API istekleri gönderir.
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          // İsteklerden biri başarısız olursa...
          message.error('Veri getirme başarısız.'); // Hata mesajı gösterir.
        }
        const [categoriesData, productsData] = await Promise.all([
          // Yanıtları JSON olarak ayrıştırır.
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        const productsWithCategories = productsData.map((product) => {
          // Her ürün için ilgili kategori bilgisi ekler.
          const categoryId = product.category; // Ürünün kategori ID'sini alır.
          const category = categoriesData.find(
            (item) => item._id === categoryId, // Kategori ID'sine göre kategori adını bulur.
          );
          return {
            ...product, // Ürün verisini olduğu gibi korur.
            categoryName: category ? category.name : '', // Eğer kategori varsa adını, yoksa boş bir değer ekler.
          };
        });
        setDataSource(productsWithCategories); // Ürün listesini state'e kaydeder.
      } catch (error) {
        // Hata oluşursa...
        console.log('Veri hatası:', error); // Hata detayını konsola yazdırır.
      } finally {
        setLoading(false); // Yüklenme durumunu pasif hale getirir.
      }
    };
    fetchData(); // Veri çekme işlemini başlatır.
  }, [apiUrl]); // `apiUrl` değişirse bu useEffect yeniden çalışır.

  return (
    <Table
      dataSource={dataSource} // Tablo verilerini sağlar.
      columns={columns} // Tablo sütun yapılandırmasını sağlar.
      rowKey={(record) => record._id} // Her satır için benzersiz anahtar belirler.
      loading={loading} // Yüklenme durumunu tabloya aktarır.
    />
  );
};

export default ProductPage; // Bileşeni dışa aktarır.
