import { Button, Form, Input, Spin, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button, Form, Input, Spin ve message.

import { useEffect, useState } from 'react';
// React'ten useState ve useEffect hook'larını içeri aktarır. useState durum yönetimi için, useEffect ise yan etkiler için kullanılır.

import { useParams } from 'react-router-dom';
// `useParams` hook'u, URL parametrelerine erişmek için kullanılır (bu durumda kategori ID'si).

const UpdateCategoryPage = () => {
  // `UpdateCategoryPage` fonksiyonel bileşeni başlatılır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, kategori verisi alınırken ve güncellenirken yükleme durumu için kullanılır. Başlangıçta false olarak tanımlanır.

  const [form] = Form.useForm();
  // `Form.useForm()` hook'u ile formu kontrol etmek için kullanılan `form` nesnesi oluşturulur.

  const params = useParams();
  // `useParams` hook'u, URL'deki parametreleri alır. Burada, `id` parametresi ile kategori ID'sine erişilir.

  const categoryId = params.id;
  // URL'den alınan kategori ID'si `categoryId` değişkenine atanır.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API'nin base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const onFinish = async (values) => {
    // `onFinish` fonksiyonu, form başarıyla gönderildiğinde çalışacak asenkron fonksiyondur.
    setLoading(true);
    // Yükleme durumu başlatılır.

    try {
      // API isteği yapmak için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: 'PUT', // PUT isteği yapılacak (var olan kategori güncelleme).
        headers: {
          'Content-Type': 'application/json', // İçeriğin JSON olduğunu belirtir.
        },
        body: JSON.stringify(values), // Form verileri JSON formatında gönderilir.
      });

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        message.success('Kategori başarıyla güncellendi.'); // Başarılı mesajı gösterilir.
      } else {
        message.error('Kategori güncellenirken bir hata oluştu.'); // Hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Kategori güncelleme hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  };

  useEffect(() => {
    // `useEffect` hook'u, bileşen ilk kez yüklendiğinde çalışır ve kategori verisini yüklemek için çağrılır.
    const fetchSingleCategory = async () => {
      // Kategoriyi getiren asenkron fonksiyon tanımlanır.
      setLoading(true);
      // Yükleme durumu başlatılır.

      try {
        // API isteği yapılır.
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

        if (!response.ok) {
          // Eğer API cevabı başarısızsa:
          throw new Error('Verileri getirme hatası'); // Hata fırlatılır.
        }

        const data = await response.json();
        // Gelen JSON verisi alınır.

        if (data) {
          // Veriler başarıyla alındıysa:
          form.setFieldsValue({
            // Form alanları, gelen veri ile doldurulur.
            name: data.name,
            img: data.img,
          });
        }
      } catch (error) {
        console.log('Veri hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
      } finally {
        setLoading(false); // Yükleme durumu sonlandırılır.
      }
    };
    fetchSingleCategory();
    // `fetchSingleCategory` fonksiyonu çağrılır.
  }, [apiUrl, categoryId, form]);
  // `useEffect` bağımlılıkları: Bu efekt, `apiUrl`, `categoryId` ve `form` değiştiğinde yeniden çalışacaktır.

  return (
    <Spin spinning={loading}>
      {/* Spin bileşeni, yükleme durumu sağlanırken bir spinner gösterir. */}
      <Form
        form={form} // Form'un `form` nesnesi ile bağlanır.
        name="basic" // Form'a bir isim verilmiş.
        layout="vertical" // Form alanları dikey yerleşim düzeninde gösterilecektir.
        autoComplete="off" // Tarayıcı otomatik tamamlamayı devre dışı bırakır.
        onFinish={onFinish} // Form başarıyla gönderildiğinde `onFinish` fonksiyonu çağrılır.
      >
        <Form.Item
          label="Kategori İsmi" // Form alanı etiketini tanımlar.
          name="name" // Form verisi için 'name' adında bir alan oluşturulur.
          rules={[
            {
              required: true, // Bu alan zorunlu.
              message: 'Lütfen kategori adını girin!', // Eğer boş bırakılırsa bu mesaj gösterilir.
            },
          ]}
        >
          <Input />
          {/* Input bileşeni, kategori ismini girmek için kullanılır. */}
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)" // Form alanı etiketini tanımlar.
          name="img" // Form verisi için 'img' adında bir alan oluşturulur.
          rules={[
            {
              required: true, // Bu alan zorunlu.
              message: 'Lütfen kategori görsel linkini girin!', // Eğer boş bırakılırsa bu mesaj gösterilir.
            },
          ]}
        >
          <Input />
          {/* Input bileşeni, kategori görselinin URL'sini girmek için kullanılır. */}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
        {/* Buton bileşeni, formu göndermek için kullanılır. */}
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
// `UpdateCategoryPage` bileşeni dışa aktarılır.
