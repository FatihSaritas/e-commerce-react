import { Button, Form, Input, InputNumber, Spin, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button, Form, Input, InputNumber, Spin ve message.

import { useState } from 'react';
// React'ten useState hook'u içeri aktarılır. Bileşenin durumunu yönetmek için kullanılır.

const CreateCouponPage = () => {
  // `CreateCouponPage` fonksiyonel bileşeni başlatılır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, kupon oluşturulurken yükleme durumu için kullanılır. Başlangıçta false olarak tanımlanır.

  const [form] = Form.useForm();
  // `Form.useForm()` hook'u ile formu kontrol etmek için kullanılan `form` nesnesi oluşturulur.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API'nin base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const onFinish = async (values) => {
    // `onFinish` fonksiyonu, form başarıyla gönderildiğinde çalışacak asenkron fonksiyondur.
    setLoading(true);
    // Yükleme durumu başlatılır.

    try {
      // API isteği yapmak için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: 'POST', // POST isteği yapılacak.
        headers: {
          'Content-Type': 'application/json', // İçeriğin JSON olduğunu belirtir.
        },
        body: JSON.stringify(values), // Form verileri JSON formatında gönderilir.
      });

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        message.success('Kupon başarıyla oluşturuldu.'); // Başarılı mesajı gösterilir.
        form.resetFields(); // Form alanları sıfırlanır.
      } else {
        message.error('Kupon oluşturulurken bir hata oluştu.'); // Hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Kupon oluşturma hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  };

  return (
    <Spin spinning={loading}>
      {/* Spin bileşeni, yükleme durumu sağlanırken bir spinner gösterir. */}
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        {/* Form bileşeni, form yapısını tanımlar. */}

        <Form.Item
          label="Kupon Kodu" // Form alanı etiketini tanımlar.
          name="code" // Form verisi için 'code' adında bir alan oluşturulur.
          rules={[
            {
              required: true, // Bu alan zorunlu.
              message: 'Lütfen bir kupon kodu girin!', // Eğer boş bırakılırsa bu mesaj gösterilir.
            },
          ]}
        >
          <Input />
          {/* Input bileşeni, kupon kodu girişi için kullanılır. */}
        </Form.Item>

        <Form.Item
          label="Kupon İndirim Oranı" // Form alanı etiketini tanımlar.
          name="discountPercent" // Form verisi için 'discountPercent' adında bir alan oluşturulur.
          rules={[
            {
              required: true, // Bu alan zorunlu.
              message: 'Lütfen bir kupon indirim oranı girin!', // Eğer boş bırakılırsa bu mesaj gösterilir.
            },
          ]}
        >
          <InputNumber />
          {/* InputNumber bileşeni, sadece sayısal değerler girmek için kullanılır (indirim oranı). */}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
        {/* Buton bileşeni, formu göndermek için kullanılır. */}
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
// `CreateCouponPage` bileşeni dışa aktarılır.
