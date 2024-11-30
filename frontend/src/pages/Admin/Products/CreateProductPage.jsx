import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
// Ant Design'dan gerekli bileşenleri içe aktarıyoruz.

import { useEffect, useState } from 'react';
// React'ten `useEffect` ve `useState` hook'larını içe aktarıyoruz.

import ReactQuill from 'react-quill';
// Zengin metin düzenleyici (Rich Text Editor) için ReactQuill kütüphanesini içe aktarıyoruz.

import 'react-quill/dist/quill.snow.css';
// ReactQuill için varsayılan "snow" temasını ekliyoruz.

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  // Ürün oluşturma veya kategori yükleme işlemleri sırasında durumu belirtmek için `loading` state'i.

  const [categories, setCategories] = useState([]);
  // Kategorileri saklamak için bir state tanımlıyoruz.

  const [form] = Form.useForm();
  // Ant Design'ın Form bileşeni için bir form kontrol nesnesi oluşturuyoruz.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // Ortam değişkenlerinden gelen API taban URL'sini alıyoruz.

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      // Veri çekme işlemi başladığında `loading` durumunu `true` yapıyoruz.

      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        // API'den kategorileri almak için bir GET isteği yapıyoruz.

        if (response.ok) {
          const data = await response.json();
          // Başarılı bir yanıt dönerse JSON formatında veriyi alıyoruz.

          setCategories(data);
          // Kategori verilerini state'e kaydediyoruz.
        } else {
          message.error('Veri getirme başarısız.');
          // API isteği başarısız olursa kullanıcıya hata mesajı gösteriyoruz.
        }
      } catch (error) {
        console.log('Veri hatası:', error);
        // Bir hata oluşursa konsola hata detaylarını yazdırıyoruz.
      } finally {
        setLoading(false);
        // Veri çekme işlemi tamamlandıktan sonra `loading` durumunu `false` yapıyoruz.
      }
    };

    fetchCategories();
    // Sayfa yüklendiğinde kategorileri çekmek için `fetchCategories` fonksiyonunu çağırıyoruz.
  }, [apiUrl]);
  // `useEffect`, `apiUrl` değiştiğinde tekrar çalışacak.

  const onFinish = async (values) => {
    const imgLinks = values.img.split('\n').map((link) => link.trim());
    // Girilen ürün görsel linklerini her satıra göre ayırıp temizliyoruz.

    const colors = values.colors.split('\n').map((link) => link.trim());
    // Girilen renk kodlarını her satıra göre ayırıp temizliyoruz.

    const sizes = values.sizes.split('\n').map((link) => link.trim());
    // Girilen beden ölçülerini her satıra göre ayırıp temizliyoruz.

    setLoading(true);
    // Ürün oluşturma işlemi başladığında `loading` durumunu `true` yapıyoruz.

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        // Yeni ürün oluşturmak için POST isteği yapıyoruz.

        headers: {
          'Content-Type': 'application/json',
          // İstek başlığında içeriğin JSON formatında olduğunu belirtiyoruz.
        },

        body: JSON.stringify({
          ...values,
          // Formdan gelen tüm verileri isteğe ekliyoruz.

          price: {
            current: values.current,
            // Formdan gelen fiyat bilgisini fiyat objesine ekliyoruz.

            discount: values.discount,
            // Formdan gelen indirim oranını fiyat objesine ekliyoruz.
          },

          colors,
          // Renkleri düzenlenmiş haliyle isteğe ekliyoruz.

          sizes,
          // Beden ölçülerini düzenlenmiş haliyle isteğe ekliyoruz.

          img: imgLinks,
          // Görsel linklerini düzenlenmiş haliyle isteğe ekliyoruz.
        }),
      });

      if (response.ok) {
        message.success('Ürün başarıyla oluşturuldu.');
        // Ürün başarıyla oluşturulursa bir başarı mesajı gösteriyoruz.

        form.resetFields();
        // Form alanlarını sıfırlayarak temizliyoruz.
      } else {
        message.error('Ürün oluşturulurken bir hata oluştu.');
        // Ürün oluşturma işlemi başarısız olursa hata mesajı gösteriyoruz.
      }
    } catch (error) {
      console.log('Ürün oluşturma hatası:', error);
      // Hata oluşursa konsola hata detaylarını yazdırıyoruz.
    } finally {
      setLoading(false);
      // İşlem tamamlandıktan sonra `loading` durumunu `false` yapıyoruz.
    }
  };

  return (
    <Spin spinning={loading}>
      {/* Yükleme durumunda Spin bileşenini gösteriyoruz. */}

      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        {/* Form bileşeni: Ürün oluşturma işlemi tamamlandığında `onFinish` çalışacak. */}

        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              // Ürün adını zorunlu hale getiriyoruz.

              message: 'Lütfen Ürün adını girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <Input />
          {/* Ürün adı için bir giriş alanı oluşturuyoruz. */}
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              // Kategori seçimini zorunlu hale getiriyoruz.

              message: 'Lütfen 1 kategori seçin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <Select>
            {/* Kategori seçimi için bir Select bileşeni kullanıyoruz. */}

            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
                {/* Her kategori için bir seçenek oluşturuyoruz. */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              // Ürün fiyatını zorunlu hale getiriyoruz.

              message: 'Lütfen ürün fiyatını girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <InputNumber />
          {/* Ürün fiyatı için bir sayısal giriş alanı. */}
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              // İndirim oranını zorunlu hale getiriyoruz.

              message: 'Lütfen bir ürün indirim oranı girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <InputNumber />
          {/* Ürün indirimi için bir sayısal giriş alanı. */}
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              // Ürün açıklamasını zorunlu hale getiriyoruz.

              message: 'Lütfen bir ürün açıklaması girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: 'white',
              // Düzenleyicinin arka planını beyaz yapıyoruz.
            }}
          />
          {/* Zengin metin düzenleyicisi (ReactQuill) */}
        </Form.Item>

        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              // Görsel linklerini zorunlu hale getiriyoruz.

              message: 'Lütfen en az 4 ürün görsel linki girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
            // Giriş kutusunun otomatik yüksekliğini belirliyoruz.
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              // Ürün renklerini zorunlu hale getiriyoruz.

              message: 'Lütfen en az 1 ürün rengi girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir RGB kodunu yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
            // Giriş kutusunun otomatik yüksekliğini belirliyoruz.
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              // Ürün bedenlerini zorunlu hale getiriyoruz.

              message: 'Lütfen en az 1 ürün bedeni girin!',
              // Alanın boş bırakılması durumunda gösterilecek hata mesajı.
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir bedeni yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
            // Giriş kutusunun otomatik yüksekliğini belirliyoruz.
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Ürün Ekle
            {/* Ürün ekleme işlemini başlatan buton */}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
// Bu bileşeni dışa aktarıyoruz.
