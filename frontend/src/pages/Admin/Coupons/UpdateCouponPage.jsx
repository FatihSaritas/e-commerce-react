import { Button, Form, Input, InputNumber, Spin, message } from 'antd';
// Ant Design bileşenlerini içeri aktarır: Button, Form, Input, InputNumber, Spin ve message.

import { useEffect, useState } from 'react';
// React'ten useState ve useEffect hook'larını içeri aktarır. useState durum yönetimi için, useEffect ise yan etkiler için kullanılır.

import { useParams } from 'react-router-dom';
// `useParams` hook'u, URL parametrelerine erişmek için kullanılır (bu durumda kupon ID'si).

const UpdateCouponPage = () => {
  // `UpdateCouponPage` fonksiyonel bileşeni başlatılır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i, kupon güncellenirken yükleme durumu için kullanılır. Başlangıçta false olarak tanımlanır.

  const [form] = Form.useForm();
  // `Form.useForm()` hook'u ile formu kontrol etmek için kullanılan `form` nesnesi oluşturulur.

  const params = useParams();
  // `useParams` hook'u, URL'deki parametreleri alır. Burada, `id` parametresi ile kupon ID'sine erişilir.

  const couponId = params.id;
  // URL'den alınan kupon ID'si `couponId` değişkenine atanır.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // API'nin base URL'si `VITE_API_BASE_URL` ortam değişkeninden alınır.

  const onFinish = async (values) => {
    // `onFinish` fonksiyonu, form başarıyla gönderildiğinde çalışacak asenkron fonksiyondur.
    setLoading(true);
    // Yükleme durumu başlatılır.

    try {
      // API isteği yapmak için try-catch bloğu kullanılır.
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: 'PUT', // PUT isteği yapılacak (var olan kuponu güncelleme).
        headers: {
          'Content-Type': 'application/json', // İçeriğin JSON olduğunu belirtir.
        },
        body: JSON.stringify(values), // Form verileri JSON formatında gönderilir.
      });

      if (response.ok) {
        // Eğer API cevabı başarılıysa:
        message.success('Kupon başarıyla güncellendi.'); // Başarılı mesajı gösterilir.
      } else {
        message.error('Kupon güncellenirken bir hata oluştu.'); // Hata mesajı gösterilir.
      }
    } catch (error) {
      console.log('Kupon güncelleme hatası:', error); // Hata durumunda hata mesajı konsola yazdırılır.
    } finally {
      setLoading(false); // Yükleme durumu sonlandırılır.
    }
  };

  useEffect(() => {
    // `useEffect` hook'u, bileşen ilk kez yüklendiğinde çalışır ve kuponu yüklemek için çağrılır.
    const fetchSingleCategory = async () => {
      // Kupon verisini getiren asenkron fonksiyon tanımlanır.
      setLoading(true);
      // Yükleme durumu başlatılır.

      try {
        // API isteği yapılır.
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

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
            code: data.code,
            discountPercent: data.discountPercent,
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
  }, [apiUrl, couponId, form]);
  // `useEffect` bağımlılıkları: Bu efekt, `apiUrl`, `couponId` ve `form` değiştiğinde yeniden çalışacaktır.

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
          label="Kupon İsmi" // Form alanı etiketini tanımlar.
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
          Güncelle
        </Button>
        {/* Buton bileşeni, formu göndermek için kullanılır. */}
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
// `UpdateCouponPage` bileşeni dışa aktarılır.
