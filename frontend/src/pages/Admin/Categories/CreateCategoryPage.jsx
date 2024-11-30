import { Button, Form, Input, Spin, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button (buton), Form (form bileşeni), Input (giriş alanı), Spin (yükleme göstergesi), message (mesaj göstergesi).

import { useState } from 'react';
// React'ten useState hook'u içeri aktarılır. useState, bileşenin durumunu yönetmek için kullanılır.

const CreateCategoryPage = () => {
  // `CreateCategoryPage` fonksiyonel bileşeninin başlangıcı.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, kategori oluşturulurken yükleme durumunu yönetmek için kullanılır. Başlangıçta false olarak ayarlanır.

  const [form] = Form.useForm();
  // Form'un kontrolünü sağlamak için `Form.useForm()` hook'u ile `form` nesnesi oluşturulur.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const onFinish = async (values) => {
    // `onFinish` fonksiyonu, form başarıyla gönderildiğinde çalışacak asenkron bir fonksiyondur.

    setLoading(true);
    // Yükleme durumu başlatılır.

    try {
      // API isteği yapmak için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: 'POST', // POST isteği yapılacak (yeni kategori oluşturulacak).
        headers: {
          'Content-Type': 'application/json', // İçeriğin JSON formatında olduğunu belirtir.
        },
        body: JSON.stringify(values), // Form verileri JSON formatında gönderilir.
      });

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        message.success('Kategori başarıyla oluşturuldu.'); // Başarılı mesajı gösterilir.
        form.resetFields(); // Form alanları sıfırlanır (boşaltılır).
      } else {
        message.error('Kategori oluşturulurken bir hata oluştu.'); // Hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Kategori güncelleme hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  };

  return (
    <Spin spinning={loading}>
      {/* Yükleme durumu varsa, Spin bileşeni ile kullanıcıya yükleme göstergesi gösterilir. */}
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        {/* Form bileşeni, kategori adı ve görseli için alanlar içerir. */}
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
          Oluştur
        </Button>
        {/* Buton bileşeni, formu göndermek için kullanılır. `htmlType="submit"` ile form gönderme işlemi yapılır. */}
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
// `CreateCategoryPage` bileşeni dışa aktarılır.
