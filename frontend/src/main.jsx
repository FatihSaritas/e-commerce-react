import { createRoot } from 'react-dom/client';
// React 18 ile gelen `createRoot` işlevini React DOM'dan içe aktarıyoruz.
// Bu, React uygulamasını bir DOM öğesine bağlamayı sağlar.

import { BrowserRouter } from 'react-router-dom';
// React Router'dan `BrowserRouter` bileşenini içe aktarıyoruz.
// Bu bileşen, uygulamanın rotalarını tanımlamak ve URL'yi yönetmek için kullanılır.

import { Layout } from './layouts/Layout.jsx';
// Uygulama için genel bir düzen sağlayan `Layout` bileşenini içe aktarıyoruz.
// Genellikle üst bilgi (header), alt bilgi (footer) ve genel sayfa yapısını içerir.

import CartProvider from './context/CartProvider.jsx';
// Sepet işlevselliğini sağlamak için bir React Context sağlayıcı olan `CartProvider` bileşenini içe aktarıyoruz.
// Bu bileşen, sepet verilerini tüm uygulama boyunca paylaşmak için kullanılır.

import App from './App.jsx';
// Tüm uygulamanın ana bileşeni olan `App` bileşenini içe aktarıyoruz.
// Bu bileşen, rotaları tanımlar ve uygulamanın temel yapısını sağlar.

import 'slick-carousel/slick/slick.css';
// `slick-carousel` kütüphanesine ait CSS dosyasını içe aktarıyoruz.
// Bu, slayt göstergesi (carousel) için kullanılan temel stilleri içerir.

import 'slick-carousel/slick/slick-theme.css';
// `slick-carousel` kütüphanesinin tematik CSS dosyasını içe aktarıyoruz.
// Bu, slayt göstergesinin tematik görünümünü sağlar.

import ScrollToTop from './components/ScrollToTop';

import './index.css';
// Uygulama için genel stillerimizi içeren `index.css` dosyasını içe aktarıyoruz.

createRoot(document.getElementById('root')).render(
  // React uygulamasını DOM'daki `root` adlı öğeye bağlamak için `createRoot` işlevini kullanıyoruz.
  // Bu, React bileşenlerini render etmek için temel işlemdir.

  <BrowserRouter>
    {/* Uygulamanın rotalarını yönetmek için `BrowserRouter` bileşenini kullanıyoruz. 
        Bu bileşen, URL'nin değişimlerini izler ve ilgili bileşenleri render eder. */}

    <ScrollToTop />

    <CartProvider>
      {/* Sepet verilerini ve işlevlerini tüm alt bileşenlere paylaşmak için `CartProvider` bileşenini sarıyoruz. 
          Context API sayesinde sepet işlevselliği global hale gelir. */}

      <Layout>
        {/* Uygulamanın genel düzenini (ör. header, footer) sağlayan `Layout` bileşenini sarıyoruz. 
            Bu bileşen genellikle ortak kullanılan düzen öğelerini içerir. */}

        <App />
        {/* Ana uygulama bileşenimizi render ediyoruz. 
            Bu bileşen, tüm uygulama rotalarını ve ana içeriği içerir. */}
      </Layout>
    </CartProvider>
  </BrowserRouter>,
);
