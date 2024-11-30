import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
// Ant Design kütüphanesinden kullanılan bileşenler import edilir: Button (buton), Form (form), Input (giriş alanı),
// InputNumber (sayı girişi), Select (açılır menü), Spin (yükleme simgesi), message (bildirim mesajları)

import { useEffect, useState } from 'react';
// React kütüphanesinden `useEffect` (yan etkiler) ve `useState` (durum yönetimi) hook'ları import edilir.

import { useNavigate, useParams } from 'react-router-dom';
// React Router'dan `useNavigate` (sayfa yönlendirme) ve `useParams` (URL parametrelerini alma) fonksiyonları import edilir.

import ReactQuill from 'react-quill';
// Zengin metin düzenleyici olan `ReactQuill` import edilir.

import 'react-quill/dist/quill.snow.css';
// `ReactQuill` için stil dosyası import edilir.

const UpdateProductPage = () => {
  // `UpdateProductPage` adında bir fonksiyonel React bileşeni tanımlanır.

  const [loading, setLoading] = useState(false);
  // `loading` state'i oluşturulup, başlangıçta false olarak ayarlanır. Bu state, veri yüklenirken gösterilecek yükleme simgesini kontrol eder.

  const [categories, setCategories] = useState([]);
  // `categories` adında bir state tanımlanır, bu state ürün kategorilerini saklamak için kullanılır.

  const navigate = useNavigate();
  // `navigate` fonksiyonu, sayfa yönlendirmelerini gerçekleştirmek için tanımlanır.

  const [form] = Form.useForm();
  // `Form` bileşeninden bir form instance'ı (`form`) elde edilir.

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // Çevresel değişkenler ile API URL'si (`VITE_API_BASE_URL`) alınır.

  const params = useParams();
  // URL parametrelerini almak için `useParams` hook'u kullanılır.

  const productId = params.id;
  // URL'deki `id` parametresi `productId` değişkenine kaydedilir, bu ürünün ID'sidir.

  useEffect(() => {
    // `useEffect` hook'u, bileşen render edildikten sonra çalışacak bir fonksiyon tanımlar. Burada ürün güncelleme için veri çekme işlemi yapılır.

    const fetchData = async () => {
      // Asenkron veri çekme işlemi için `fetchData` fonksiyonu tanımlanır.

      setLoading(true);
      // Veri çekme işlemi başladığında `loading` state'i `true` yapılır, yükleme simgesi gösterilir.

      try {
        // Veri çekme işlemi için `try-catch` bloğu kullanılır, herhangi bir hata oluşursa yakalanır.

        const [categoriesResponse, singleProductResponse] = await Promise.all([
          // `Promise.all` ile iki API çağrısı paralel olarak yapılır: kategoriler ve tek bir ürün verisi.
          fetch(`${apiUrl}/api/categories`), // Kategoriler için API çağrısı
          fetch(`${apiUrl}/api/products/${productId}`), // Ürün verisi için API çağrısı
        ]);

        if (!categoriesResponse.ok || !singleProductResponse.ok) {
          // Eğer herhangi bir API çağrısı başarısız olursa (200 OK dönmezse), hata mesajı gösterilir.
          message.error('Veri getirme başarısız.');
          return;
        }

        const [categoriesData, singleProductData] = await Promise.all([
          // Kategoriler ve ürün verisi JSON formatında alınır.
          categoriesResponse.json(),
          singleProductResponse.json(),
        ]);

        setCategories(categoriesData);
        // Alınan kategoriler `categories` state'ine kaydedilir.

        if (singleProductData) {
          // Eğer ürün verisi alındıysa:
          form.setFieldsValue({
            // Form alanlarına gelen ürün verileri ile değerler set edilir.
            name: singleProductData.name, // Ürün adı
            current: singleProductData.price.current, // Mevcut fiyat
            discount: singleProductData.price.discount, // İndirim oranı
            description: singleProductData.description, // Ürün açıklaması
            img: singleProductData.img.join('\n'), // Ürün görselleri
            colors: singleProductData.colors.join('\n'), // Ürün renkleri
            sizes: singleProductData.sizes.join('\n'), // Ürün bedenleri
            category: singleProductData.category, // Ürün kategorisi
          });
        }
      } catch (error) {
        // Eğer veri çekme sırasında bir hata olursa, hata konsola yazdırılır.
        console.log('Veri hatası:', error);
      } finally {
        // Veri çekme işlemi tamamlandığında, yükleme simgesi gizlenir.
        setLoading(false);
      }
    };

    fetchData();
    // `fetchData` fonksiyonu çağrılır ve veri çekme işlemi başlatılır.
  }, [apiUrl, productId, form]);
  // `useEffect` hook'u, `apiUrl`, `productId` veya `form` değişirse tekrar çalışır. Bu, verilerin her yenilenmesinde formun doğru şekilde güncellenmesini sağlar.
  const onFinish = async (values) => {
    // Formun gönderilmesiyle tetiklenen asenkron fonksiyon başlatılır. `values` formdaki tüm alanları içerir.

    console.log(values);
    // Form verilerini konsola yazdırarak, hangi verilerin gönderildiğini kontrol ederiz.

    const imgLinks = values.img.split('\n').map((link) => link.trim());
    // Görsel linklerini alır, her satıra ayırır ve her linki başındaki/sonundaki boşluklardan temizler.

    const colors = values.colors.split('\n').map((link) => link.trim());
    // Renklerin RGB kodlarını alır, her satıra ayırır ve her kodu başındaki/sonundaki boşluklardan temizler.

    const sizes = values.sizes.split('\n').map((link) => link.trim());
    // Beden ölçülerini alır, her satıra ayırır ve her bedeni başındaki/sonundaki boşluklardan temizler.

    setLoading(true);
    // Yükleme durumu başlatılır (yükleme simgesini göstermek için).

    try {
      // Asenkron işlemleri başlatan try-catch bloğu başlatılır.

      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        // Ürün güncelleme için PUT isteği yapılır. URL, ürünün ID'sine göre dinamik olarak oluşturulur.
        method: 'PUT',
        // HTTP metodunun PUT olarak belirlendiği belirtilir (veri güncelleme).

        headers: {
          'Content-Type': 'application/json',
          // İstek başlıkları, verinin JSON formatında olduğunu belirtir.
        },

        body: JSON.stringify({
          // Formdaki verileri JSON formatında sunmak için `JSON.stringify` kullanılır.
          ...values,
          // Formdaki diğer tüm değerler (name, category, vb.) bu alana dahil edilir.

          price: {
            current: values.current,
            discount: values.discount,
            // Ürün fiyatı ve indirim oranı, iç içe bir nesne olarak düzenlenir.
          },

          colors,
          // Renkler, daha önce temizlenen ve ayrılan verileri içerir.

          sizes,
          // Bedenler, daha önce temizlenen ve ayrılan verileri içerir.

          img: imgLinks,
          // Görsel linkleri, daha önce ayrılan ve temizlenen verileri içerir.
        }),
      });

      if (response.ok) {
        // Eğer API'den dönen cevap başarılıysa (200 OK dönerse):

        message.success('Ürün başarıyla güncellendi.');
        // Kullanıcıya başarılı bir güncelleme mesajı gösterilir.

        navigate('/admin/products');
        // Yönetici paneline, ürünler sayfasına yönlendirilir.
      } else {
        message.error('Ürün güncellenirken bir hata oluştu.');
        // Eğer bir hata varsa, kullanıcıya hata mesajı gösterilir.
      }
    } catch (error) {
      // Eğer veri gönderme işlemi sırasında bir hata oluşursa:

      console.log('Ürün güncelleme hatası:', error);
      // Hata konsola yazdırılır.
    } finally {
      // Asenkron işlem tamamlandığında (başarı ya da hata fark etmeksizin):

      setLoading(false);
      // Yükleme simgesi gizlenir.
    }
  };

  return (
    // Yükleme durumuna göre gösterilecek olan `Spin` bileşeni içeride render edilir.

    <Spin spinning={loading}>
      {/* Eğer `loading` true ise, Spin bileşeni çalışır ve yükleme simgesi
      gösterilir. */}
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        {/* Form oluşturuluyor, `onFinish` fonksiyonu form gönderildiğinde
        tetiklenir. */}
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            // `name` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen Ürün adını girin!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* `name` alanı bir `Input` bileşeni ile oluşturulur, kullanıcıdan ürün
        ismi alınır. */}
        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            // `category` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen 1 kategori seçin!',
            },
          ]}
        >
          <Select>
            {/* Kategoriler, `Select` bileşeni kullanılarak açılır menüde
            sunulur. */}
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
              // `categories` state'inden alınan her kategori, bir `Select.Option` olarak render edilir.
            ))}
          </Select>
        </Form.Item>
        {/* Kategoriler seçildiğinde formun `category` alanı güncellenir. */}
        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            // `current` fiyatı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen ürün fiyatını girin!',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/* `current` fiyat, `InputNumber` bileşeni ile alınır. Yalnızca sayı
        girişi yapılabilir. */}
        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            // `discount` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen bir ürün indirim oranı girin!',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/* `discount` indirim oranı, `InputNumber` bileşeni ile alınır. */}
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            // `description` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen bir ürün açıklaması girin!',
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: 'white',
            }}
          />
        </Form.Item>
        {/* Ürün açıklaması için `ReactQuill` kullanılarak zengin metin
        düzenleyicisi sağlanır. */}
        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            // `img` görselleri için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen en az 4 ürün görsel linki girin!',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        {/* Görsel linklerini almak için `TextArea` bileşeni kullanılır. Her bir
        görselin linki yeni satıra yazılabilir. */}
        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="colors"
          rules={[
            // `colors` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen en az 1 ürün rengi girin!',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir RGB kodunu yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        {/* Renkler için de `TextArea` bileşeni kullanılır, her bir renk RGB kodu
        yeni satıra yazılır. */}
        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            // `sizes` alanı için doğrulama kuralları:
            {
              required: true,
              message: 'Lütfen en az 1 ürün beden ölçüsü girin!',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        {/* Bedenler için de `TextArea` bileşeni kullanılır, her bir beden ölçüsü
        yeni satıra yazılır. */}
        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
        {/* Formun gönderilmesini sağlayan buton eklenir, bu buton tıklandığında
        `onFinish` fonksiyonu tetiklenir. */}
      </Form>
    </Spin>
    // Form bileşeni burada tamamlanır, yükleme simgesi gösterilir veya gizlenir.
  );
};
export default UpdateProductPage;
// Bileşen sonlandırılır ve dışa aktarılır.
